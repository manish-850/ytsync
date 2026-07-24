import "./videoPlayer.css";
import usePlaybackSync from "@/hooks/youtube/usePlaybackSync";
import useReportStatus from "@/hooks/youtube/useReportStatus";
import useVideoLoader from "@/hooks/youtube/useVideoLoader";
import useYoutubePlayer from "@/hooks/youtube/useYoutubePlayer";
import useRoom from "@/hooks/room/useRoom";

export default function VideoPlayer() {
  const { isAdmin } = useRoom();
  const iframeId = "yt-player";

  useYoutubePlayer();
  useVideoLoader();
  useReportStatus();
  usePlaybackSync();

  return (
    <div className="player-container">
      <div id={iframeId}></div>
      {!isAdmin && <div className="player-overlay"></div>}
    </div>
  );
}
