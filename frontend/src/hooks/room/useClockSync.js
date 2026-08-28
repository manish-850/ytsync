import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
const useClockSync = (setLoadingStage) => {
  const { offsetRef, rttRef } = useRoom();

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handlePong = ({ t1, t2, t3 }) => {
      const t4 = Date.now();

      const rtt = t4 - t1 - (t3 - t2);

      const offset = (t2 - t1 + (t3 - t4)) / 2;

      if (rtt < rttRef.current) {
        rttRef.current = rtt;
        offsetRef.current = offset;
      }

      console.log({
        rtt,
        offset,
      });
    };

    const syncClock = () => {
      socket.emit("ping", {
        t1: Date.now(),
      });
    };

    socket.on("pong", handlePong);

    // Send 5 samples
    const timeouts = [];
    for (let i = 0; i < 5; i++) {
      setLoadingStage("clockSyncing");
      const timeout = setTimeout(() => {
        syncClock();
      }, i * 200);

      timeouts.push(timeout);
    }

    return () => {
      socket.off("pong", handlePong);
      timeouts.forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, []);
};

export default useClockSync;
