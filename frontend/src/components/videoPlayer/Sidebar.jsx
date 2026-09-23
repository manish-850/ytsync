import { MessageCircle, Users, Cog } from "lucide-react";
import Chat from "../chat/Chat";
import Viewers from "../chat/Viewers";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Controls from "../sidebar/Controls";

export default function Sidebar() {
  return (
    <>
      <div className="w-full lg:w-[28%] h-[60%] lg:h-full bg-sidebar px-4 pt-6">
        <Tabs defaultValue="chat" className="h-full flex flex-col">
          <TabsList className="w-full">
            <TabsTrigger className="cursor-pointer" value="chat">
              <MessageCircle />
              Chat
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="viewers">
              <Users />
              Viewers
            </TabsTrigger>
            <TabsTrigger className="cursor-pointer" value="controls">
              <Cog />
              Controls
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="flex-1 min-h-0">
            <Chat />
          </TabsContent>
          <TabsContent value="viewers">
            <Viewers />
          </TabsContent>
          <TabsContent value="controls" className="flex-1 min-h-0">
            <Controls />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
