import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import usePlaybackSync from "@/hooks/youtube/usePlaybackSync";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useRoom from "@/hooks/room/useRoom";
import { useEffect, useState } from "react";
import { getSocket } from "@/services/socket";

const Controls = () => {
  const { syncToTargetTime } = usePlaybackSync();
  const { playbackControl, isAdmin } = useRoom();
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    const socket = getSocket();
    if (!isClicked || !socket) return;
    socket.emit("change-playback-author");
  }, [isClicked]);

  const handleClick = (target) => {
    if (target === playbackControl) return;
    setIsClicked(true);
    console.log(target);
  };

  return (
    <div style={{ paddingTop: "1rem" }} className="flex flex-col gap-4 w-full">
      <div className="flex flex-col gap-2 p-2">
        <p className="uppercase opacity-50 tracking-widest">Manual sync</p>
        <Button onClick={syncToTargetTime}>Sync</Button>
      </div>
      <Separator className="my-2" />
      <div className="flex flex-col gap-2 p-2 w-full">
        <p className="uppercase opacity-50 tracking-widest">Playback Control</p>
        <div className="w-full">
          <Tabs className="w-full" defaultValue={playbackControl}>
            <TabsList className={`w-full flex gap-2 ${isAdmin ? "pointer-events-auto cursor-pointer" : "pointer-events-none opacity-50 cursor-not-allowed"}`}>
              <TabsTrigger onClick={() => handleClick("admin")} value="admin">
                Admin
              </TabsTrigger>
              <TabsTrigger
                onClick={() => handleClick("everyone")}
                value="everyone"
              >
                Everyone
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Controls;
