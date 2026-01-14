"use client";

import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useChatActions } from "@/lib/store/chat-store-provider";

export function ChatTrigger() {
  const { openChat } = useChatActions();

  return (
    <Button 
      onClick={openChat}
      className="gap-2 bg-red-600 hover:bg-red-700 text-white shadow-lg"
      size="lg"
    >
      <MessageCircle className="h-5 w-5" />
      Open AI Chat
    </Button>
  );
}
