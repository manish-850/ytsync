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
      style={{ padding: "0 0.5rem" }}
    >
      <div className="user-info flex items-center gap-1.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-lime-900">
          {user.username[0].toUpperCase()}
        </div>
        <p>{user.username}</p>
      </div>
      <div className="badge flex gap-2">
        <Badge
          className={`${bgColor} ${textColor}`}
          style={{ padding: "0.2rem 0.5rem" }}
        >
          {driftMs + " ms"}
        </Badge>
        {user.isAdmin && (
          <Badge
            style={{ padding: "0.2rem 0.5rem" }}
            className={"bg-pink-400/20 text-pink-400"}
          >
            Admin
          </Badge>
        )}
        {user.clientId === clientId && (
          <Badge
            style={{ padding: "0.2rem 0.5rem" }}
            className={"bg-blue-400/20 text-blue-400"}
          >
            You
          </Badge>
        )}
      </div>
    </div>
  );
};

export default UserCard;
