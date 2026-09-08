import { useState, useEffect, useRef } from "react";
import { Send } from "lucide-react";
import "./chat.css";
import { handleSendMessage } from "../../services/socket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useRoom from "@/hooks/room/useRoom";
import { Separator } from "../ui/separator";

export default function Chat() {
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const { messages } = useRoom();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    handleSendMessage(text);
    setText("");
  };

  return (
    <div className="h-full flex flex-col min-h-0">
      <div className="chat-messages flex-1 min-h-0 overflow-y-auto flex flex-col gap-2">
        {messages &&
          messages.map((msg, index) => {
            const isSystem = msg.sender === "System";
            const isSender = msg.sender === localStorage.getItem("username");
            return (
              <div
                key={index}
                className={`flex flex-col gap-1 ${isSystem ? "system" : isSender ? "sender" : "receiver"}`}
              >
                {!isSystem && !isSender && (
                  <span className="text-[0.75rem] font-medium text-muted-foreground">
                    {msg.sender}
                  </span>
                )}
                <span className="message-text bg-foreground text-background rounded-full border text-[0.875rem] leading-5">
                  {msg.text}
                </span>
              </div>
            );
          })}
        <div ref={messagesEndRef} />
      </div>
      <Separator />
      <form onSubmit={handleSubmit} className="chat-input-form">
        <Input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button type="submit" variant="default" size="icon">
          <Send size={18} />
        </Button>
      </form>
    </div>
  );
}
