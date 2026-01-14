"use client";

import { MessageSquare, Sparkles } from "lucide-react";
import { useChatActions, useIsChatOpen } from "@/lib/store/chat-store-provider";

export function FloatingChatTrigger() {
    const { toggleChat } = useChatActions();
    const isOpen = useIsChatOpen();

    if (isOpen) return null;

    // Using brand colors: #6A1383 (dark purple), #80569E (light purple), #38B6FF (accent blue)
    const buttonStyles = `relative w-16 h-16 rounded-full 
    bg-gradient-to-br from-[#80569E] via-[#6A1383] to-[#38B6FF] 
    dark:from-[#80569E] dark:via-[#6A1383] dark:to-[#38B6FF] 
    shadow-[0_0_40px_rgba(106,19,131,0.4)] 
    hover:shadow-[0_0_60px_rgba(106,19,131,0.6)] 
    transition-all duration-500 
    hover:scale-110 hover:rotate-12 
    flex items-center justify-center`;

    return (
        <div className="fixed bottom-6 right-6 z-50 group">
            {/* Animated rings */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#80569E] to-[#38B6FF] opacity-20 blur-2xl animate-ping [animation-duration:2s]" />
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#6A1383] to-[#38B6FF] opacity-30 blur-xl animate-pulse [animation-duration:3s]" />

            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 z-10">
                <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#38B6FF] to-[#6A1383] shadow-lg flex items-center justify-center animate-bounce [animation-duration:2s]">
                    <Sparkles className="h-3 w-3 text-white" />
                </div>
            </div>

            {/* Tooltip */}
            <div className="absolute bottom-full right-0 mb-2 px-3 py-1.5 rounded-lg bg-white/90 dark:bg-black/90 backdrop-blur-xl border border-white/40 dark:border-white/20 text-sm font-medium text-neutral-800 dark:text-neutral-200 whitespace-nowrap opacity-0 scale-90 group-hover:opacity-100 group-hover:scale-100 group-hover:-translate-y-1 transition-all duration-300 pointer-events-none shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]">
                Talk to Us
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 right-6 w-2 h-2 rotate-45 bg-white/90 dark:bg-black/90 border-r border-b border-white/40 dark:border-white/20" />
            </div>

            <button
                type="button"
                onClick={toggleChat}
                className={buttonStyles}
                aria-label="Chat with AI"
            >
                <MessageSquare className="h-7 w-7 text-white transition-transform group-hover:scale-110" />
            </button>
        </div>
    );
}
