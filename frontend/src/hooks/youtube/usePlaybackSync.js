import { socket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import usePlayer from "../player/usePlayer";
import useRoom from "../room/useRoom";

const usePlaybackSync = () => {
  const { playerRef } = usePlayer();
  const { roomDataRef, offsetRef } = useRoom();

  const syncToTargetTime = useCallback(() => {
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

    if (Math.abs(drift) > 0.1) {
      player.seekTo(targetTime, true);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleSync = ({ isPlaying }) => {
      console.log("handle sync fired");
      const player = playerRef.current;
      if (!player || !player.getPlayerState) return;
      const playerState = player.getPlayerState();
      syncToTargetTime();
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
