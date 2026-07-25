import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { useEffect, useRef } from "react";
import { syncToTargetTime } from "@/utils/syncToTargetTime";
import { handlePlaybackControl } from "@/utils/handlePlaybackControl";
import { toast } from "sonner";

const useYoutubePlayer = (setLoadingStage) => {
  const { playerRef, isMuted } = usePlayer();
  const { roomDataRef, isAdmin, videoId, roomId } = useRoom();
  const lastTimeRef = useRef(0);
  const iframeId = "yt-player";

  useEffect(() => {
    if (!videoId || !isAdmin) return;
    const interval = setInterval(() => {
      const player = playerRef?.current;
      if (!player) return () => clearInterval(interval);
      const now = player?.getCurrentTime();
      const diff = now - lastTimeRef.current;
      if (Math.abs(diff) > 2)
        handlePlaybackControl(player.getPlayerState() === 1, now); // user jumped

      lastTimeRef.current = now;
    }, 300);
    return () => clearInterval(interval);
  }, [isAdmin, videoId]);

  const handlePlayerReady = () => {
    const player = playerRef.current;
    const roomData = roomDataRef.current;
    if (isMuted) player.mute();
    else player.unmute();
    if (roomData) {
      player.seekTo(roomData.currentTime, true);
      setLoadingStage("ready");
      if (roomData.isPlaying) player.playVideo();
      else player.pauseVideo();
    }
  };
  const initPlayer = () => {
    console.log("Creating player");
    playerRef.current = new window.YT.Player(iframeId, {
      videoId,
      playerVars: {
        controls: isAdmin ? 1 : 0,
        disablekb: isAdmin ? 0 : 1,
        rel: 0,
        modestbranding: 1,
        autoplay: 1,
        enablejsapi: 1,
        origin: window.location.origin,
      },
      events: {
        onReady: (event) => {
          console.log("YT READY : ", event.data);
          playerRef.current = event.target;
          setLoadingStage("syncing");
          toast.success("YT player ready");
          if (handlePlayerReady) handlePlayerReady();
          if (!isAdmin) syncToTargetTime(playerRef, roomDataRef);
        },
        onStateChange: (event) => {
          console.log("state change", playerRef.current.getCurrentTime());
          if (isAdmin) {
            if (handlePlaybackControl) {
              if (event.data === 1) {
                handlePlaybackControl(true, event.target.getCurrentTime());
              } else if (event.data === 2) {
                handlePlaybackControl(false, event.target.getCurrentTime());
              }
            }
          } else if (event.data === 1) syncToTargetTime(playerRef, roomDataRef);
        },
      },
    });
  };

  useEffect(() => {
    let checkInterval;

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      checkInterval = setInterval(() => {
        if (window.YT && window.YT.Player) {
          clearInterval(checkInterval);
          initPlayer();
        }
      }, 100);
      let scriptTag = document.querySelector(
        'script[src="https://www.youtube.com/iframe_api"]',
      );
      if (!scriptTag) {
        scriptTag = document.createElement("script");
        scriptTag.src = "https://www.youtube.com/iframe_api";
        const firstScriptTag = document.getElementsByTagName("script")[0];
        firstScriptTag.parentNode.insertBefore(scriptTag, firstScriptTag);
      }
    }

    return () => {
      if (checkInterval) clearInterval(checkInterval);
      if (
        playerRef.current &&
        typeof playerRef.current.destroy === "function"
      ) {
        console.log("Destroying player");
        playerRef.current.destroy();
      }
    };
  }, [roomId]);
};

export default useYoutubePlayer;
