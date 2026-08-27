import { Volume2, VolumeX, LogOut } from "lucide-react";
import RoomControls from "./RoomControls";
import { disconnectSocket, getSocket } from "../../services/socket";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import usePlayer from "@/hooks/player/usePlayer";
import useRoom from "@/hooks/room/useRoom";
import { toast } from "sonner";

const Navbar = () => {
  const navigate = useNavigate();
  const { playerRef, isMuted, setIsMuted } = usePlayer();
  const {
    roomId,
    roomDataRef,
    setMessages,
    setIsJoined,
    setIsLoading,
    setUsername,
    setRoomId,
    isAdmin,
    setVideoId,
  } = useRoom();
  const [isOnline, setIsOnline] = useState(true);
  const hasConnectedRef = useState(false);
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

  const handleLeave = useCallback(() => {
    disconnectSocket();
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
    navigate("/");
  }, [
    navigate,
    playerRef,
    roomDataRef,
    setIsJoined,
    setIsLoading,
    setIsMuted,
    setMessages,
    setRoomId,
    setUsername,
    setVideoId,
  ]);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handleDisconnect = (reason) => {
      setIsOnline(false);

      console.log("Socket disconnected:", reason);
    };

    const handleConnect = () => {
      setIsOnline(true);
      if (hasConnectedRef.current) {
        socket.emit("join-room", {
          roomId,
          username: localStorage.getItem("username"),
          clientId: localStorage.getItem("clientId"),
        });
      }
      hasConnectedRef.current = true;
      console.log("Socket connected");
    };

    socket.on("disconnect", handleDisconnect);
    socket.on("connect", handleConnect);

    return () => {
      socket.off("disconnect", handleDisconnect);
      socket.off("connect", handleConnect);
    };
  }, []);

  useEffect(() => {
    const socket = getSocket();
    const handleOffline = () => {
      setIsOnline(false);
      toast.error("You are offline. You will be disconnected in 40 seconds.");
    };

    const handleOnline = () => {
      setIsOnline(true);
      if (hasConnectedRef.current) {
        toast.success("You are back online. Reconnecting...");
        socket.emit("join-room", {
          roomId,
          username: localStorage.getItem("username"),
          clientId: localStorage.getItem("clientId"),
        });
      }
      hasConnectedRef.current = true;
    };

    window.addEventListener("offline", handleOffline);
    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  useEffect(() => {
    if (isOnline) return;
    const timeout = setTimeout(() => {
      handleLeave();
    }, 40000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOnline, handleLeave]);

  return (
    <div className="flex items-center justify-between gap-5 lg:gap-50 h-8">
      <h3 className="text-sm w-fit">Room: {roomId}</h3>

      {isAdmin && <RoomControls />}

      <div className="flex gap-3 w-fit">
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
