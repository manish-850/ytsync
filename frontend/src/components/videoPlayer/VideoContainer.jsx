import "./videoPlayer.css";
import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";
import useRoom from "@/hooks/room/useRoom";

const VideoContainer = ({ setLoadingStage }) => {
  const { videoId } = useRoom();
  return (
    <div
      style={{ padding: "1.5rem 1rem", paddingTop: "1.5rem" }}
      className="flex flex-col gap-6 lg:gap-10 lg:w-[72%] h-[60%] lg:h-full rounded "
    >
      <Navbar />
      {videoId && <VideoPlayer setLoadingStage={setLoadingStage} />}
    </div>
  );
};

export default VideoContainer;
