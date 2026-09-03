import { getSocket } from "@/services/socket";
import { useEffect, useCallback } from "react";
import useRoom from "./useRoom";
const useClockSync = ({loadingStage, setLoadingStage}) => {
  const { offsetRef, rttRef } = useRoom();
  const previousRtt = rttRef.current;
  const syncClock = useCallback(() => {
    const socket = getSocket();
    socket.emit("ping", {
      t1: Date.now(),
    });
  }, []);

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handlePong = ({ t1, t2, t3 }) => {
      const t4 = Date.now();

      const rtt = t4 - t1 - (t3 - t2);

      const offset = (t2 - t1 + (t3 - t4)) / 2;

      if (rtt <= 200 && (previousRtt === 0 || rtt <= previousRtt * 3)) {
        rttRef.current = rtt;
        offsetRef.current = offset;
      }

      console.log({
        rtt,
        offset,
      });
    };

    socket.on("pong", handlePong);

    // Send 10 samples
    const timeouts = [];
    for (let i = 0; i < 10; i++) {
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

  useEffect(() => {
    if (loadingStage !== "ready") return;
    const interval = setInterval(() => {
      syncClock();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, [loadingStage, syncClock]);
};

export default useClockSync;
