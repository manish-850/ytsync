import { Badge } from "@/components/ui/badge";

const UserCard = ({ user }) => {
  const clientId = localStorage.getItem("clientId");
  return (
    <div
      className={`user-card flex justify-between bg-zinc-800 h-12 w-full border  overflow-y-auto rounded-lg items-center px-2`}
    >
      <div className="user-info flex items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-lime-900">
          {user.username[0].toUpperCase()}
        </div>
        <p>{user.username}</p>
      </div>
      <div className="badge flex gap-2">
        {user.isAdmin && (
          <Badge className={"bg-pink-400/20 text-pink-400 py-[0.2rem] px-2"}>
            Admin
          </Badge>
        )}
        {user.clientId === clientId && (
          <Badge className={"bg-blue-400/20 text-blue-400 py-[0.2rem] px-2"}>
            You
          </Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
