import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import usePlaybackSync from "@/hooks/youtube/usePlaybackSync";
import useRoom from "@/hooks/room/useRoom";
import useUpdatePlaybackControl from "@/hooks/control/useUpdatePlaybackControl";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserShield, Users, Globe, GlobeLock } from "lucide-react";
import useupdatevisibility from "@/hooks/control/useupdateVisibility";

const Controls = () => {
  const { syncToTargetTime } = usePlaybackSync();
  const { playbackControl, isAdmin, visibility } = useRoom();
  const { handlePlayback } = useUpdatePlaybackControl();
  const { handleVisibility } = useupdatevisibility();
  const adminOnlyClass = isAdmin
    ? "cursor-pointer"
    : "pointer-events-none opacity-50 cursor-not-allowed";

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex flex-col gap-2">
        <p className="uppercase opacity-50 tracking-widest">Manual Sync</p>
        <Button onClick={() => syncToTargetTime({ action: "manual" })}>
          Sync
        </Button>
      </div>
      <Separator className="my-1" />
      <div className="flex flex-col gap-2 w-full">
        <p className="uppercase opacity-50 tracking-widest">
          Playback Permission
        </p>
        <Tabs
          className="w-full"
          value={playbackControl}
          onValueChange={handlePlayback}
        >
          <TabsList className={`w-full flex gap-2 ${adminOnlyClass}`}>
            <TabsTrigger value="admin">
              <UserShield />
              Admin
            </TabsTrigger>
            <TabsTrigger value="everyone">
              <Users />
              Everyone
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
      <Separator className="my-1" />
      <div className="flex flex-col gap-2 w-full">
        <p className="uppercase opacity-50 tracking-widest">Visibility</p>
        <Tabs
          className="w-full"
          value={visibility}
          onValueChange={handleVisibility}
        >
          <TabsList className={`w-full flex gap-2 ${adminOnlyClass}`}>
            <TabsTrigger value="public">
              <Globe />
              Public
            </TabsTrigger>
            <TabsTrigger value="private">
              <GlobeLock />
              Private
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};

export default Controls;
