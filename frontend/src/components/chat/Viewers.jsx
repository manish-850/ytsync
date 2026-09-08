import useRoom from "@/hooks/room/useRoom";
import ViewerCard from "./ViewerCard";
import { useEffect } from "react";
import { socket } from "@/services/socket";
const Users = () => {
  const { users, setUsers } = useRoom();
  useEffect(() => {
    const handleStatus = (status) => {
      setUsers((prev) =>
        prev.map((user) =>
          user.clientId === status.clientId ? { ...user, status } : user,
        ),
      );
    };

    socket.on("user-status-update", handleStatus);

    return () => {
      socket.off("user-status-update", handleStatus);
    };
  }, []);
  return (
    <div className="user-list flex-1">
      {users.map((user) => (
        <ViewerCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Users;
