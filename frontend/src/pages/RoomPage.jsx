import VideoContainer from "../components/videoPlayer/VideoContainer";
import Sidebar from "../components/videoPlayer/Sidebar";
import { useState, useMemo } from "react";
import Loading from "../components/Loading/Loading";
import useSocket from "@/hooks/socket/useSocket";
import useUpdateRoom from "@/hooks/room/useUpdateRoom";
import useJoinRoom from "@/hooks/room/useJoinRoom";
import useUpdateMessage from "@/hooks/room/useUpdateMessage";
import useInitUsername from "@/hooks/room/useInitUsername";

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
  useInitUsername();
  useJoinRoom(clientId, setLoadingStage);
  useUpdateRoom(clientId, setLoadingStage);
  useUpdateMessage();

  return (
    <div className="app-container">
      <VideoContainer setLoadingStage={setLoadingStage} />
      <Sidebar />
      {loadingStage !== "ready" && <Loading stage={loadingStage} />}
    </div>
  );
};

export default RoomPage;
