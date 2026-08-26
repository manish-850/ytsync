import { io } from "socket.io-client";

export let socket = null;

export function getSocket() {
  if(socket) return socket;
  socket = io(import.meta.env.VITE_BACKEND_URL);
  return socket;
}

export const initSocket = () => {
  if (!socket) getSocket();
  socket.connect();
  return () => {
    socket.disconnect();
    socket = null;
  };
};

export const handleSendMessage = (text) => {
  if (!socket || !socket.connected) return;
  socket.emit("send-message", { text });
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
