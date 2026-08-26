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
      className="w-full h-20 bg-zinc-700 shrink-0 flex gap-4 justify-between rounded cursor-pointer"
      style={{ padding: "2px 5px" }}
    >
      <div className="thumbnail-container w-[40%] h-full rounded overflow-hidden shrink-0">
        <img
          className="w-full h-full object-cover"
          src={video.thumbnail}
          alt=""
        />
      </div>
      <div className="text-container flex-1 flex flex-col h-full gap-2">
        <h5 className="text-[10px] text-balance">{video.title}</h5>
        <p className="text-[10px] text-muted-foreground">{video.channel}</p>
      </div>
    </div>
  );
};

export default VideoCard;
