import { socket } from "@/services/socket";
import { useEffect } from "react";
import usePlayer from "../player/usePlayer";
import { syncToTargetTime } from "@/utils/syncToTargetTime";
import useRoom from "../room/useRoom";

const usePlaybackSync = () => {
  const { playerRef } = usePlayer();
  const { roomDataRef, offsetRef } = useRoom();
  useEffect(() => {
    if (!socket) return;

    const handleSync = ({ isPlaying }) => {
      console.log("handle sync fired");
      const player = playerRef.current;
      if (!player || typeof player.getPlayerState !== "function") return;
      const playerState = player.getPlayerState();
      syncToTargetTime(playerRef, roomDataRef, offsetRef);
      if (isPlaying) {
        if (playerState !== window.YT.PlayerState.PLAYING) {
          player.playVideo();
        }
      } else {
        if (playerState === window.YT.PlayerState.PLAYING) {
          player.pauseVideo();
        }
      }
    };

    socket.on("playback-sync", handleSync);
    return () => {
      if (socket) socket.off("playback-sync", handleSync);
    };
  }, []);
};

export default usePlaybackSync;
