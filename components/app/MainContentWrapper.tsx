"use client";

import { useIsChatOpen } from "@/lib/store/chat-store-provider";

export function MainContentWrapper({ children }: { children: React.ReactNode }) {
    const isOpen = useIsChatOpen();

    return (
        <div
            className={`flex flex-col min-h-screen transition-all duration-300 ${isOpen ? "xl:mr-[448px]" : ""
                }`}
        >
            {children}
        </div>
    );
}
