import "./videoPlayer.css";
import usePlaybackSync from "@/hooks/youtube/usePlaybackSync";
import useReportStatus from "@/hooks/youtube/useReportStatus";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
import useRoom from "@/hooks/room/useRoom";
import usePlaybackControll from "@/hooks/youtube/usePlaybackControll";

export default function VideoPlayer({ setLoadingStage }) {
  const { isAdmin } = useRoom();
  const iframeId = "yt-player";

  const { handlePlaybackControl } = usePlaybackControll();
  const { syncToTargetTime } = usePlaybackSync();
  useYoutubePlayer({
    setLoadingStage,
    handlePlaybackControl,
    syncToTargetTime,
  });
  useVideoLoader(setLoadingStage);
  useReportStatus();

  return (
    <div className="min-h-[40%] shrink-0 w-full rounded border-2 relative flex-1 overflow-hidden">
      <div id={iframeId}></div>
      {!isAdmin && (
        <div className="absolute inset-0 cursor-not-allowed z-20"></div>
      )}
    </div>
  );
}
