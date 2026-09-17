import { getSocket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import useRoom from "../room/useRoom";

const useUpdatePlaybackControl = () => {
  const { playbackControl, setPlaybackControl, isAdmin, roomDataRef } =
    useRoom();
  const handlePlayback = useCallback(
    (target) => {
      if (!isAdmin) return;
      if (target === playbackControl) return;
      const socket = getSocket();
      if (!socket) return;
      socket.emit("change-playback-author", {
        playbackControl: target,
      });
    },
    [isAdmin, playbackControl],
  );

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("playback-control-change", ({ playbackControl }) => {
      roomDataRef.current.playbackControl = playbackControl;
      setPlaybackControl(playbackControl);
    });
    return () => {
      socket.off("playback-control-change");
    };
  }, []);

  return {
    handlePlayback,
  };
};

export default useUpdatePlaybackControl;
