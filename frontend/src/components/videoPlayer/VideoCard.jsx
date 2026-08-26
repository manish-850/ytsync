import useRoom from "@/hooks/room/useRoom";
import { getSocket } from "@/services/socket";

const VideoCard = ({ video, setIsOpen }) => {
  const { setVideoId } = useRoom();
  const socket = getSocket();
  const handleChangeVideo = (videoId) => {
    if (socket) {
      console.log(videoId);
      socket.emit("change-video", { videoId });
    }
  };
  const handleClick = () => {
    if (!video.id) return;
    setVideoId(video.id);
    handleChangeVideo(video.id);
    setIsOpen(false);
  };
  return (
    <div
      onClick={handleClick}
      className="w-full h-20 hover:bg-zinc-800 shrink-0 flex gap-4 justify-between rounded cursor-pointer"
      style={{ padding: "5px" }}
    >
      <div className="thumbnail-container w-[30%] lg:w-[40%] h-full rounded overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover"
          src={video.thumbnail}
          alt=""
        />
      </div>
      <div className="text-container flex-1 min-w-0 flex flex-col h-full gap-2 overflow-hidden">
        <h5 className="text-[10px] line-clamp-3">{video.title}</h5>
        <p className="text-[10px] text-muted-foreground truncate">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
