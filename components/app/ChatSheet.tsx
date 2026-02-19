"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { useAuth } from "@clerk/nextjs";
import { Sparkles, Send, Loader2, X, Bot } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useIsChatOpen,
  useChatActions,
  usePendingMessage,
} from "@/lib/store/chat-store-provider";

import {
  getMessageText,
  getToolParts,
  WelcomeScreen,
  MessageBubble,
  ToolCallUI,
} from "./chat";

export function ChatSheet() {
  const isOpen = useIsChatOpen();
  const { closeChat, clearPendingMessage } = useChatActions();
  const pendingMessage = usePendingMessage();
  const { isSignedIn } = useAuth();
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat();
  const isLoading = status === "streaming" || status === "submitted";
  const lastTrackedCount = useRef(0);
  const chatIdRef = useRef<string | null>(null);

  // Generate a stable chat ID per conversation
  useEffect(() => {
    if (messages.length > 0 && !chatIdRef.current) {
      chatIdRef.current = `chat-${crypto.randomUUID()}`;
    }
    if (messages.length === 0) {
      chatIdRef.current = null;
      lastTrackedCount.current = 0;
    }
  }, [messages.length]);

  // Track chat sessions when AI finishes responding
  // biome-ignore lint/correctness/useExhaustiveDependencies: track only when loading ends
  useEffect(() => {
    if (isLoading || messages.length === 0 || !chatIdRef.current) return;
    if (messages.length <= lastTrackedCount.current) return;
    lastTrackedCount.current = messages.length;

    const firstUserMsg = messages.find((m) => m.role === "user");
    const firstMessage = firstUserMsg ? getMessageText(firstUserMsg) : "";

    const toolsUsed = new Set<string>();
    for (const m of messages) {
      for (const part of getToolParts(m)) {
        if (part.toolName) toolsUsed.add(part.toolName);
      }
    }

    let sessionId = "";
    try {
      sessionId = sessionStorage.getItem("analytics_session_id") || crypto.randomUUID();
    } catch { sessionId = crypto.randomUUID(); }

    fetch("/api/analytics/chat-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chatId: chatIdRef.current,
        sessionId,
        messageCount: messages.length,
        toolsUsed: Array.from(toolsUsed),
        firstMessage,
        messages: messages.map((m) => ({
          role: m.role,
          content: getMessageText(m),
        })),
      }),
    }).catch(() => { });
  }, [isLoading, messages]);

  // Auto-scroll to bottom when new messages arrive or streaming updates
  // biome-ignore lint/correctness/useExhaustiveDependencies: trigger scroll on message/loading changes
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  // Handle pending message - send it when chat opens
  useEffect(() => {
    if (isOpen && pendingMessage && !isLoading) {
      sendMessage({ text: pendingMessage });
      clearPendingMessage();
    }
  }, [isOpen, pendingMessage, isLoading, sendMessage, clearPendingMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    sendMessage({ text: input });
    setInput("");
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop - only visible on mobile/tablet (< xl) */}
      <div
        className="fixed inset-0 z-40 bg-black/50 xl:hidden"
        onClick={closeChat}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div className="fixed top-0 right-0 z-50 flex h-full w-full flex-col border-l border-zinc-200 bg-white shadow-xl overscroll-contain dark:border-zinc-800 dark:bg-zinc-950 xl:w-[380px] animate-in slide-in-from-right duration-300">
        {/* Header */}
        <header className="shrink-0 ">
          <div className="flex h-16 items-center gap-3 px-4">
            <Button variant="ghost" size="icon" onClick={closeChat}>
              <X className="size-6" />
            </Button>
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              Chat with Tech Kidz Africa
            </span>
          </div>
        </header>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-4 py-4">
          {messages.length === 0 ? (
            <WelcomeScreen
              onSuggestionClick={sendMessage}
              isSignedIn={isSignedIn ?? false}
            />
          ) : (
            <div className="space-y-4">
              {messages.map((message) => {
                const content = getMessageText(message);
                const toolParts = getToolParts(message);
                const hasContent = content.length > 0;
                const hasTools = toolParts.length > 0;

                if (!hasContent && !hasTools) return null;

                return (
                  <div key={message.id} className="space-y-3">
                    {/* Tool call indicators */}
                    {hasTools &&
                      toolParts.map((toolPart) => (
                        <ToolCallUI
                          key={`tool-${message.id}-${toolPart.toolCallId}`}
                          toolPart={toolPart}
                          closeChat={closeChat}
                        />
                      ))}

                    {/* Message content */}
                    {hasContent && (
                      <MessageBubble
                        role={message.role}
                        content={content}
                        closeChat={closeChat}
                      />
                    )}
                  </div>
                );
              })}

              {/* Loading indicator */}
              {isLoading && messages[messages.length - 1]?.role === "user" && (
                <div className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div className="flex items-center gap-2 rounded-2xl bg-zinc-100 px-4 py-2 dark:bg-zinc-800">
                    <div className="flex gap-1">
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.3s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400 [animation-delay:-0.15s]" />
                      <span className="h-2 w-2 animate-bounce rounded-full bg-blue-400" />
                    </div>
                  </div>
                </div>
              )}

              {/* Scroll anchor */}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Input */}
        <div className="border-t border-zinc-200 px-4 py-4 dark:border-zinc-800">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about Tech Kidz Africa.."
              disabled={isLoading}
              className="flex-1"
            />
            <Button
              type="submit"
              size="icon"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
