import useRoom from "@/hooks/room/useRoom";
import ViewerCard from "./ViewerCard";
const Users = () => {
  const { users } = useRoom();
  return (
    <div className="user-list flex-1 flex flex-col gap-[0.8rem] py-1">
      {users.map((user) => (
        <ViewerCard user={user} key={user.id} />
      ))}
    </div>
  );
};

export default Users;
