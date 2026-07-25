import { useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";
import { getSocket } from "@/services/socket";

const useReportStatus = () => {
  const { videoId } = useRoom();
  const { playerRef } = usePlayer();

  useEffect(() => {
    const socket = getSocket();

    if (!socket || !socket.connected) return;

    const interval = setInterval(() => {
      const player = playerRef.current;

      if (
        !player ||
        typeof player.getCurrentTime !== "function" ||
        typeof player.getPlayerState !== "function"
      ) {
        return;
      }

      socket.emit("report-status", {
        videoId,
        isPlaying: player.getPlayerState() === 1,
        currentTime: player.getCurrentTime(),
        clientTime: Date.now(),
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [videoId]);
};

export default useReportStatus;
