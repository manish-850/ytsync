import { Volume2, VolumeX, LogOut } from "lucide-react";
import RoomControls from "./RoomControls";
import { Button } from "@/components/ui/button";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";
import useLeaveRoom from "@/hooks/room/useLeaveRoom";

const Navbar = () => {
  const { leaveRoom } = useLeaveRoom();
  const { playerRef, isMuted, setIsMuted } = usePlayer();
  const { roomId, isAdmin } = useRoom();
  const toggleMute = () => {
    const player = playerRef.current;
    if (!player || typeof player.mute !== "function") return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  return (
    <div className="flex items-center justify-between gap-5 lg:gap-50 h-8">
      <h3 className="text-sm w-fit">Room: {roomId}</h3>
      {isAdmin && <RoomControls />}
      <div className="flex gap-3 w-fit">
        <Button variant="secondary" size="icon" onClick={toggleMute}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        <Button onClick={leaveRoom} variant="destructive" size="icon">
          <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
