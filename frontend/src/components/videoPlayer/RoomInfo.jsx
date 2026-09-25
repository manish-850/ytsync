import { Link } from "react-router-dom";
import { Separator } from "../ui/separator";
import Github from "../svg/Github";
import useRoom from "@/hooks/room/useRoom";
import { useMemo } from "react";

const RoomInfo = () => {
  const { roomId, rtt, offset, users } = useRoom();
  const clientId = localStorage.getItem("clientId");
  const user = useMemo(
    () => users.find((u) => u.clientId === clientId),
    [users, clientId],
  );
  const drift = Math.round((user?.status?.drift ?? 0) * 1000);
  return (
    <div className="w-full h-[4%] flex items-center text-xs text-neutral-400 px-4 py-1">
      <div className="h-full flex items-center gap-4">
        <p>ytsync</p>
        <p>RoomId : {roomId}</p>
        <p>{users.length} Viewers</p>
        <Separator orientation="vertical" />
        <p>Offset : {offset}ms</p>
        <p>RTT : {rtt}ms</p>
        <p>Drift : {drift}ms</p>
      </div>
      <div className="h-full flex-1 flex items-center justify-end gap-4">
        <Link to="">
          <Github className="h-4 w-4 fill-neutral-400" />
        </Link>
      </div>
    </div>
  );
};

export default RoomInfo;
