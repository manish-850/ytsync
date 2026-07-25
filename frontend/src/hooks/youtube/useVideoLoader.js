import { useEffect } from "react";
import useRoom from "../room/useRoom";
import usePlayer from "../player/usePlayer";

const useVideoLoader = (setLoadingStage) => {
  const { roomDataRef, videoId } = useRoom();
  const { playerRef } = usePlayer();
  useEffect(() => {
    if (!roomDataRef.current) return;
    if (playerRef.current && typeof playerRef.current.loadVideoById === "function") {
      console.log("Loading video:", videoId);
      playerRef.current.loadVideoById({ videoId });
      setLoadingStage("ready")
    }
  }, [videoId]);
};

export default useVideoLoader;
