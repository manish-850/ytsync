import useRoom from "@/hooks/room/useRoom";
import UserCard from "./UserCard";

const Users = () => {
  const { roomDataRef } = useRoom();
  return (
    <div className="user-list">
      {roomDataRef.current?.users.map((user) => {
        return <UserCard user={user} key={user.id} />;
      })}
    </div>
  );
};

export default Users;
