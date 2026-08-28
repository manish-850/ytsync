export const syncToTargetTime = (playerRef, roomDataRef, offsetRef) => {
  const player = playerRef.current;
  const room = roomDataRef.current;
  const offset = offsetRef.current;
  const CurrentServerTime = Date.now() + offset;

  if (!player || !room) return;

  let targetTime = room.currentTime;

  if (room.isPlaying) {
    targetTime += (CurrentServerTime - room.serverTime) / 1000;
  }

  const currentTime = player.getCurrentTime();
  const drift = targetTime - currentTime;

  if (Math.abs(drift) > 0.25) {
    player.seekTo(targetTime, true);
  }
};
