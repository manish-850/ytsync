import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { disconnectSocket } from "@/services/socket";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";

const useLeaveRoom = () => {
  const navigate = useNavigate();

  const { playerRef, setIsMuted } = usePlayer();

  const {
    roomDataRef,
    setMessages,
    setIsJoined,
    setIsLoading,
    setUsername,
    setRoomId,
    setVideoId,
  } = useRoom();

  const leaveRoom = useCallback(() => {
    disconnectSocket();

    roomDataRef.current = null;
    playerRef.current = null;

    setMessages([]);
    setIsMuted(true);
    setIsJoined(false);
    setIsLoading(false);
    setUsername("");
    setRoomId("");
    setVideoId("");

    localStorage.removeItem("clientId");
    localStorage.removeItem("username");

    navigate("/");
  }, [
    navigate,
    playerRef,
    roomDataRef,
    setMessages,
    setIsMuted,
    setIsJoined,
    setIsLoading,
    setUsername,
    setRoomId,
    setVideoId,
  ]);

  return { leaveRoom };
};

export default useLeaveRoom;
