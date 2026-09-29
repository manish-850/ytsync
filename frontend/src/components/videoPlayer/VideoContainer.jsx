import VideoPlayer from "./VideoPlayer";
import Navbar from "./Navbar";
import useRoom from "@/hooks/room/useRoom";

const VideoContainer = ({ setLoadingStage }) => {
  const { videoId } = useRoom();
  return (
    <div className="flex flex-col gap-4 lg:w-[72%] w-full h-[60%] lg:h-full p-4">
      <Navbar />
      {videoId && <VideoPlayer setLoadingStage={setLoadingStage} />}
    </div>
  );
};

export default VideoContainer;
