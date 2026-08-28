import { getSocket } from "@/services/socket";

export const handlePlaybackControl = (isPlaying, currentTime) => {
  const s = getSocket();
  if (!s) return;
  s.emit("playback-control", {
    isPlaying,
    currentTime,
  });
};
