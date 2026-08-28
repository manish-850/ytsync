import { getSocket } from "@/services/socket";
import { useEffect } from "react";
import useRoom from "./useRoom";
const useClockSync = () => {
  const { offsetRef } = useRoom();
  const { rttRef } = useRoom();

  useEffect(() => {
    const socket = getSocket();

    if (!socket) return;

    const handlePong = ({ t1, t2, t3 }) => {
      const t4 = Date.now();

      const rtt = t4 - t1 - (t3 - t2);

      const offset = (t2 - t1 + (t3 - t4)) / 2;

      rttRef.current = rtt;
      offsetRef.current = offset;

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

    syncClock();

    return () => {
      socket.off("pong", handlePong);
    };
  }, []);
};

export default useClockSync;
