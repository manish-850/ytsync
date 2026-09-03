import { getSocket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";

const usePlaybackControll = () => {
  const { roomDataRef } = useRoom();
  const { playerRef } = usePlayer();
  const handlePlaybackControl = useCallback((isPlaying, currentTime) => {
    const socket = getSocket();
    if (!socket) return;
    socket.emit("playback-control", {
      isPlaying,
      currentTime,
    });
  }, []);
  useEffect(() => {
    if (!playerRef.current || !playerRef.current.getCurrentTime) return;
    const { isPlaying } = roomDataRef.current;
    const currentTime = playerRef.current?.getCurrentTime();
    handlePlaybackControl(isPlaying, currentTime);
  }, []);

  return { handlePlaybackControl };
};

export default usePlaybackControll;
