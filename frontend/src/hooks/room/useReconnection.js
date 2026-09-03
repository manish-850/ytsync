import { getSocket } from "@/services/socket";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

const useReconnection = ({
  joinRoom,
  updateRoom,
  leaveRoom,
  setLoadingStage,
}) => {
  const [isOnline, setIsOnline] = useState(true);
  const hasConnectedRef = useRef(false);
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
        joinRoom();
        updateRoom();
        setLoadingStage("ready");
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
    const handleOffline = () => {
      //   setIsOnline(false);
      toast.error("You are offline. You will be disconnected after sometime.");
    };

    const handleOnline = () => {
      setIsOnline(true);
      if (hasConnectedRef.current) {
        toast.success("You are back online. Reconnecting...");
        joinRoom();
        updateRoom();
        setLoadingStage("ready");
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
      leaveRoom();
    }, 40000);

    return () => {
      clearTimeout(timeout);
    };
  }, [isOnline, leaveRoom]);
};

export default useReconnection;
