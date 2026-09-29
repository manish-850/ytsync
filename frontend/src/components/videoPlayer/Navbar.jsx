import { Copy, LogOut } from "lucide-react";
import SearchInput from "./SearchInput";
import { Button } from "@/components/ui/button";
import useRoom from "@/hooks/room/useRoom";
import useLeaveRoom from "@/hooks/room/useLeaveRoom";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const { leaveRoom } = useLeaveRoom();
  const { roomId, isAdmin, playbackControl } = useRoom();
  const copyRoomLink = async () => {
    await navigator.clipboard.writeText(
      `${window.location.origin}/room/${roomId}`,
    );
  };

  return (
    <div
      className={`flex items-center ${isAdmin || playbackControl === "everyone" ? "justify-between" : "justify-end"} gap-5 h-8 bg-red-400`}
    >
      {(isAdmin || playbackControl === "everyone") && <SearchInput />}
      <div className="flex gap-3 w-fit">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" onClick={copyRoomLink}>
              <Copy />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Copy link</p>
          </TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={leaveRoom} variant="destructive" size="icon">
              <LogOut size={18} />
            </Button>
          </TooltipTrigger>

          <TooltipContent>
            <p>Leave room</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
};

export default Navbar;
