import { Badge } from "@/components/ui/badge";

const UserCard = ({ user }) => {
  const clientId = localStorage.getItem("clientId");
  const driftAbs = Math.abs(user.status?.drift ?? 0);
  const drift = user.status?.drift ?? 0;
  const driftMs = Math.round(drift * 1000);

  let bgColor = "bg-green-500/20";
  let textColor = "text-green-500";
  if (driftAbs > 0.5) {
    bgColor = "bg-yellow-500/20";
    textColor = "text-yellow-500";
  }
  if (driftAbs > 1.5) {
    bgColor = "bg-orange-500/20";
    textColor = "text-orange-500";
  }
  if (driftAbs > 3) {
    bgColor = "bg-red-500/20";
    textColor = "text-red-500";
  }
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
        <Badge
          className={`${bgColor} ${textColor} py-[0.2rem] px-2 lg:text-[10px] text-xs`}
        >
          {driftMs + " ms"}
        </Badge>
        {user.isAdmin && (
          <Badge
            className={
              "bg-pink-400/20 text-pink-400 py-[0.2rem] px-2 lg:text-[10px] text-xs"
            }
          >
            Admin
          </Badge>
        )}
        {user.clientId === clientId && (
          <Badge
            className={
              "bg-blue-400/20 text-blue-400 py-[0.2rem] px-2 lg:text-[10px] text-xs"
            }
          >
            You
          </Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
