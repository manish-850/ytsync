import { getSocket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";

const useJoinRoom = ({clientId, setLoadingStage}) => {
  const { roomId } = useParams();

  const joinRoom = useCallback(() => {
    const socket = getSocket();

    if (!socket) return;

    socket.emit("join-room", {
      roomId,
      username: localStorage.getItem("username"),
      clientId,
    });

    setLoadingStage("connecting");
  }, [roomId, clientId, setLoadingStage]);

  useEffect(() => {
    joinRoom();
  }, [joinRoom]);

  return { joinRoom };
};

export default useJoinRoom;
