import { createContext, useState, useRef } from "react";

export const RoomDataContext = createContext();

const RoomContext = ({ children }) => {
  const [isJoined, setIsJoined] = useState(false);
  const [roomId, setRoomId] = useState("");
  const roomDataRef = useRef(null);
  const offsetRef = useRef(0);
  const rttRef = useRef(Infinity);
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [videoId, setVideoId] = useState("");
  const [users, setUsers] = useState([]);
  const [playbackControl, setPlaybackControl] = useState("");
  return (
    <RoomDataContext.Provider
      value={{
        isJoined,
        setIsJoined,
        roomId,
        setRoomId,
        roomDataRef,
        offsetRef,
        rttRef,
        users,
        setUsers,
        messages,
        setMessages,
        username,
        setUsername,
        isLoading,
        setIsLoading,
        isAdmin,
        setIsAdmin,
        videoId,
        setVideoId,
        playbackControl,
        setPlaybackControl,
      }}
    >
      {children}
    </RoomDataContext.Provider>
  );
};

export default RoomContext;
