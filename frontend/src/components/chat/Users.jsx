import { Badge } from "@/components/ui/badge";
import useRoom from "@/hooks/room/useRoom";

const Users = () => {
  const { roomDataRef } = useRoom();
  const clientId = localStorage.getItem("clientId");

  return (
    <div className="user-list">
      {roomDataRef.current?.users.map((user) => {
        const drift = Math.abs(user.status?.drift ?? 0);
        let bgColor = "bg-green-500";
        if (drift > 0.5) bgColor = "bg-yellow-500";
        if (drift > 1.5) bgColor = "bg-orange-500";
        if (drift > 3) bgColor = "bg-red-500";
        return (
          <div
            className={`user-card flex justify-between h-12 w-full border  overflow-y-auto rounded-lg items-center px-2`}
            key={user.id}
            style={{ padding: "0 0.5rem" }}
          >
            <div className="user-info flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full border bg-zinc-800">
                {user.username[0].toUpperCase()}
              </div>
              <h3>{user.username}</h3>
            </div>
            <div className="badge flex gap-2">
              <Badge className={bgColor} style={{ padding: "0.2rem 0.5rem" }}>
                {drift.toFixed(2) + " s"}
              </Badge>
              {user.isAdmin && (
                <Badge
                  style={{ padding: "0.2rem 0.5rem" }}
                  className={"bg-pink-400"}
                >
                  Admin
                </Badge>
              )}
              {user.clientId === clientId && (
                <Badge
                  style={{ padding: "0.2rem 0.5rem" }}
                  className={"bg-blue-400"}
                >
                  You
                </Badge>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Users;
