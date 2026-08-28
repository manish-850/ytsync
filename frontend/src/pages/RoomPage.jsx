import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useState, useMemo, useEffect, useRef } from "react";
import Loading from "../components/Loading/Loading";
import useSocket from "@/hooks/socket/useSocket";
import useUpdateRoom from "@/hooks/room/useUpdateRoom";
import useJoinRoom from "@/hooks/room/useJoinRoom";
import useUpdateMessage from "@/hooks/room/useUpdateMessage";
import useInitUsername from "@/hooks/room/useInitUsername";
import { getSocket } from "@/services/socket";
import { toast } from "sonner";
import useLeaveRoom from "@/hooks/room/useLeaveRoom";
import useClockSync from "@/hooks/room/useClockSync";

const RoomPage = () => {
  const [loadingStage, setLoadingStage] = useState("connecting");
  const [isOnline, setIsOnline] = useState(true);
  const hasConnectedRef = useRef(false);

  const clientId = useMemo(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("clientId", id);
    }
    return id;
  }, []);

  useSocket();
  useClockSync(setLoadingStage);
  useInitUsername();
  const { joinRoom } = useJoinRoom(clientId, setLoadingStage);
  const { updateRoom } = useUpdateRoom(clientId, setLoadingStage);
  const { leaveRoom } = useLeaveRoom();
  useUpdateMessage();

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
      setIsOnline(false);
      toast.error("You are offline. You will be disconnected in 40 seconds.");
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

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-screen w-full justify-between">
      <VideoContainer setLoadingStage={setLoadingStage} />
      <Sidebar />
      {loadingStage !== "ready" && <Loading stage={loadingStage} />}
    </div>
  );
};

export default RoomPage;
