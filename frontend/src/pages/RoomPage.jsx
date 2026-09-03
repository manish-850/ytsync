import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useState, useMemo } from "react";
import Loading from "../components/Loading/Loading";
import useSocket from "@/hooks/socket/useSocket";
import useUpdateRoom from "@/hooks/room/useUpdateRoom";
import useJoinRoom from "@/hooks/room/useJoinRoom";
import useUpdateMessage from "@/hooks/room/useUpdateMessage";
import useInitUsername from "@/hooks/room/useInitUsername";
import useLeaveRoom from "@/hooks/room/useLeaveRoom";
import useClockSync from "@/hooks/room/useClockSync";
import useReconnection from "@/hooks/room/useReconnection";

const RoomPage = () => {
  const [loadingStage, setLoadingStage] = useState("connecting");

  const clientId = useMemo(() => {
    let id = localStorage.getItem("clientId");
    if (!id) {
      id = crypto.randomUUID();
      localStorage.setItem("clientId", id);
    }
    return id;
  }, []);

  useSocket();
  useClockSync({ loadingStage, setLoadingStage });
  useInitUsername();
  const { joinRoom } = useJoinRoom({ clientId, setLoadingStage });
  const { updateRoom } = useUpdateRoom({ clientId, setLoadingStage });
  const { leaveRoom } = useLeaveRoom();
  useUpdateMessage();
  useReconnection({ joinRoom, updateRoom, leaveRoom, setLoadingStage });

  return (
    <div className="flex flex-col lg:flex-row gap-5 h-screen w-full justify-between">
      <VideoContainer setLoadingStage={setLoadingStage} />
      <Sidebar />
      {loadingStage !== "ready" && <Loading stage={loadingStage} />}
    </div>
  );
};

export default RoomPage;
