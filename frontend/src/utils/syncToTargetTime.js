export const syncToTargetTime = (playerRef, roomDataRef) => {
  const player = playerRef.current;
  const room = roomDataRef.current;

  if (!player || !room) return;

  let targetTime = room.currentTime;

  if (room.isPlaying) {
    targetTime += (Date.now() - room.serverTime) / 1000;
  }

  const currentTime = player.getCurrentTime();
  const drift = targetTime - currentTime;

  if (Math.abs(drift) > 0.25) {
    player.seekTo(targetTime, true);
  }
};
