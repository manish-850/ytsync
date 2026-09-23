import { socket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import usePlayer from "../player/usePlayer";
import useRoom from "../room/useRoom";

const usePlaybackSync = () => {
  const { playerRef } = usePlayer();
  const { roomDataRef, offsetRef } = useRoom();

  const syncToTargetTime = useCallback(({ action }) => {
    const player = playerRef.current;
    const room = roomDataRef.current;
    const offset = offsetRef.current;
    const currentServerTime = Date.now() + offset;

    if (!player || !room) return;

    let targetTime = room.currentTime;

    if (room.isPlaying) {
      targetTime += (currentServerTime - room.serverTime) / 1000;
    }

    const currentTime = player.getCurrentTime();
    const drift = targetTime - currentTime;

    if (Math.abs(drift) > 0.1 && action === "automatic") {
      console.log("[Handle sync] action : ", action);
      player.seekTo(targetTime, true);
    } else if (Math.abs(drift) > 0.05 && action === "manual") {
      console.log("[Handle sync] action : ", action);
      player.seekTo(targetTime, true);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSync = ({ isPlaying }) => {
      const player = playerRef.current;
      if (!player || !player.getPlayerState) return;
      const playerState = player.getPlayerState();
      syncToTargetTime({ action: "automatic" });
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
  return { syncToTargetTime };
};

export default usePlaybackSync;
