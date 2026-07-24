import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
import { useParams } from "react-router-dom";
const useUpdateRoom = (clientId, setLoadingStage) => {
  const {
    roomDataRef,
    setUsername,
    setRoomId,
    setIsAdmin,
    setIsJoined,
    setVideoId,
  } = useRoom();
  const { roomId } = useParams();
  useEffect(() => {
    const handleRoomUpdate = (data) => {
      const currentUser = data.users.find((user) => user.clientId === clientId);
      if (currentUser) {
        console.log("Room data : ", data);
        roomDataRef.current = data;
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
    const s = getSocket();
    s.on("room-update", handleRoomUpdate);
    return () => {
      s.off("room-update", handleRoomUpdate);
    };
  }, [roomId]);
};

export default useUpdateRoom;
