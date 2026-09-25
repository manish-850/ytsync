import { useEffect } from "react";
import useRoom from "./useRoom";
import { getSocket } from "@/services/socket";

const useUpdateUsers = () => {
  const { setUsers } = useRoom();
  useEffect(() => {
    const handleStatus = (status) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.clientId === status.clientId ? { ...user, status } : user,
        ),
      );
    };
    const socket = getSocket();
    if (!socket) return;
    socket.on("user-status-update", handleStatus);

    return () => {
      socket.off("user-status-update", handleStatus);
    };
  }, []);
};

export default useUpdateUsers;
