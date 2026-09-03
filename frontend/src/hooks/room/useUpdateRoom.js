import { getSocket } from "@/services/socket";
import { useCallback, useEffect } from "react";
import useRoom from "./useRoom";
import { useParams } from "react-router-dom";

const useUpdateRoom = ({clientId, setLoadingStage}) => {
  const {
    roomDataRef,
    setUsername,
    setRoomId,
    setIsAdmin,
    setIsJoined,
    setVideoId,
    setUsers,
  } = useRoom();
  const { roomId } = useParams();

  const updateRoom = useCallback(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find((user) => user.clientId === clientId);
      if (currentUser) {
        console.log("Room data : ", data);
        roomDataRef.current = data;
        setUsers(data.users);
        setIsAdmin(currentUser?.isAdmin);
        setUsername(currentUser?.username);
        setIsJoined(true);
        setRoomId(data?.id);
        setVideoId(data?.currentVideoId);
        setLoadingStage((prev) => {
          if (prev === "ready") return prev;
          return "player";
        });
      }
    };

    const socket = getSocket();
    if (!socket) return;
    socket.on("room-update", handleRoomUpdate);
  }, [roomId, setLoadingStage]);

  useEffect(() => {
    updateRoom();
  }, [updateRoom]);

  return { updateRoom };
};

export default useUpdateRoom;
