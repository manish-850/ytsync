import { MessageCircle, User2Icon } from "lucide-react";
import Chat from "../chat/Chat";
import Users from "../chat/Users";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar w-full lg:w-[28%] h-[60%] lg:h-full rounded border-2">
        <Tabs defaultValue="chat" className="h-full">
          <TabsList className="w-full sidebar-tabslist">
            <TabsTrigger
              className="cursor-pointer sidebar-tabstrigger"
              value="chat"
            >
              <MessageCircle />
              Chat
            </TabsTrigger>
            <TabsTrigger
              className="cursor-pointer sidebar-tabstrigger"
              value="viewers"
            >
              <User2Icon />
              Viewers
            </TabsTrigger>
          </TabsList>
          <TabsContent value="chat" className="px-2">
            <Chat />
          </TabsContent>
          <TabsContent value="viewers">
            <Users />
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
