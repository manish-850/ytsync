import "./videoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";
import useRoom from "@/hooks/room/useRoom";

const VideoContainer = ({ setLoadingStage }) => {
  const { videoId } = useRoom();
  return (
    <div className="main-content">
      <Navbar />
      {videoId && <VideoPlayer setLoadingStage={setLoadingStage} />}
    </div>
  );
};

export default VideoContainer;
