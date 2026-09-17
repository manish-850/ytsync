import { useCallback, useEffect } from "react";
import useRoom from "../room/useRoom";
import { getSocket } from "@/services/socket";

const useupdatevisibility = () => {
  const { visibility, setVisibility, isAdmin, roomDataRef } = useRoom();
  const handleVisibility = useCallback(
    (target) => {
      const socket = getSocket();
      if (!isAdmin || target === visibility || !socket) return;
      socket.emit("change-visibility", {
        visibility: target,
      });
    },
    [isAdmin, visibility],
  );

  useEffect(() => {
    const socket = getSocket();
    if (!socket) return;
    socket.on("visibility-changed", ({ visibility }) => {
      roomDataRef.current.visibility = visibility;
      setVisibility(visibility);
    });
    return () => {
      socket.off("visibility-changed");
    };
  }, []);
  return { handleVisibility };
};

export default useupdatevisibility;
