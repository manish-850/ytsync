import { Volume2, VolumeX, LogOut } from "lucide-react";
import RoomControls from "./RoomControls";
import { disconnectSocket } from "../../services/socket";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";

const Navbar = () => {
  const navigate = useNavigate();
  const { playerRef, isMuted, setIsMuted } = usePlayer();
  const player = playerRef.current;
  const {
    roomId,
    roomDataRef,
    setMessages,
    setIsJoined,
    setIsLoading,
    setUsername,
    setRoomId,
    isAdmin,
    setVideoId
  } = useRoom();
  const [isLeaved, setIsLeaved] = useState(false);
  const toggleMute = () => {
    if (player && typeof player.mute === "function") {
      if (isMuted) {
        player.unMute();
        setIsMuted(false);
      } else {
        player.mute();
        setIsMuted(true);
      }
    }
  };

  const handleLeave = () => {
    disconnectSocket();
    setIsLeaved(true);
    roomDataRef.current = null;
    setMessages([]);
    playerRef.current = null;
    setIsMuted(true);
    setIsJoined(false);
    setIsLoading(false);
    setUsername("");
    setRoomId("");
    setVideoId("");
    localStorage.removeItem("clientId");
    localStorage.removeItem("username");
  };

  useEffect(() => {
    if (isLeaved) return navigate("/");
  }, [isLeaved]);

  return (
    <div className="flex items-center justify-between">
      <h3>Room : {roomId}</h3>
      {isAdmin && 
      <RoomControls />
      }
      <div className="flex gap-3">
        <Button variant="secondary" size="icon" onClick={toggleMute}>
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
        <Button onClick={handleLeave} variant="destructive" size="icon">
          <LogOut size={18} />
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
