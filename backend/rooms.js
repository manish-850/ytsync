const rooms = new Map();

export function getOrCreateRoom(roomId) {
  if (!rooms.has(roomId)) {
    rooms.set(roomId, {
      id: roomId,
      users: new Map(),
      currentVideoId: "dQw4w9WgXcQ",
      videoTitle:
        "Rick Astley - Never Gonna Give You Up (Official Video) (4K Remaster)",
      videoThumbnail:
        "https://i.ytimg.com/vi/dQw4w9WgXcQ/hq720.jpg?sqp=-oaymwEcCOgCEMoBSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAfut6ib46TKYWnNm5PxBrcX8HLWg",
      currentTime: 0,
      playbackControl: "admin",
      visibility: "public",
      isPlaying: false,
      serverTime: Date.now(),
    });
  }
  return rooms.get(roomId);
}

export function deleteRoomIfEmpty(roomId) {
  const room = rooms.get(roomId);
  if (room && room.users.size === 0) {
    rooms.delete(roomId);
  }
}

export function addUserToRoom(roomId, socketId, username, clientId) {
  const room = getOrCreateRoom(roomId);
  const isAdmin = room.users.size === 0;
  let user = room.users.get(clientId);
  if (user) {
    user.id = socketId;
    user.username = username;
  } else {
    user = {
      id: socketId,
      username,
      isAdmin,
      clientId,
    };
    room.users.set(clientId, user);
  }
  return { room, user };
}

export function removeUserFromRoom(roomId, clientId) {
  const room = rooms.get(roomId);
  if (!room) return null;
  const user = room.users.get(clientId);
  room.users.delete(clientId);

  if (user && room.users.size > 0 && user.isAdmin) {
    const nextUserId = room.users.keys().next().value;
    const nextUser = room.users.get(nextUserId);
    nextUser.isAdmin = true;
  }

  deleteRoomIfEmpty(roomId);
  return { room, user };
}

export function getRoomData(room) {
  if (!room) return null;
  return {
    id: room.id,
    users: Array.from(room.users.values()).map((user) => ({
      id: user.id,
      username: user.username,
      isAdmin: user.isAdmin,
      clientId: user.clientId,
      status: user.status || {
        isSynced: true,
        currentTime: room.currentTime,
      },
    })),
    currentVideoId: room.currentVideoId,
    currentTime: room.currentTime,
    isPlaying: room.isPlaying,
    playbackControl: room.playbackControl,
    visibility: room.visibility,
    serverTime: room.serverTime,
  };
}

export function updateRoomVideo(roomId, videoId, videoThumbnail, videoTitle) {
  const room = rooms.get(roomId);
  if (!room) return null;
  room.currentVideoId = videoId;
  room.currentTime = 0;
  room.isPlaying = false;
  room.videoTitle = videoTitle;
  room.videoThumbnail = videoThumbnail;
  room.serverTime = Date.now();
  return room;
}

export function updateRoomPlayback(roomId, isPlaying, currentTime) {
  const room = rooms.get(roomId);
  if (!room) return null;
  room.isPlaying = isPlaying;
  room.currentTime = currentTime;
  room.serverTime = Date.now();
  return room;
}

export function getExpectedRoomTime(room) {
  if (!room.isPlaying) return room.currentTime;

  return room.currentTime + (Date.now() - room.serverTime) / 1000;
}

export function getPublicRoomsData() {
  return Array.from(rooms.values()).map((room) => {
    if (room.visibility === "public")
      return {
        id: room.id,
        users: room.users.size,
        thumbnail: room.videoThumbnail,
        title: room.videoTitle,
        isPlaying: room.isPlaying,
      };
  });
}
