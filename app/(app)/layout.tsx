import { ClerkProvider } from "@clerk/nextjs";
import { SanityLive } from "@/sanity/lib/live";

import { Toaster } from "@/components/ui/sonner";

import { ChatStoreProvider } from "@/lib/store/chat-store-provider";

import { ChatSheet } from "@/components/app/ChatSheet";
import { FloatingChatTrigger } from "@/components/app/FloatingChatTrigger";
import { MainContentWrapper } from "@/components/app/MainContentWrapper";
import { NavbarWrapper, Footer } from "@/components/swahilipot";

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <ChatStoreProvider>
        <MainContentWrapper>
          <NavbarWrapper />
          <main className="flex-grow">{children}</main>
          <Footer />
        </MainContentWrapper>

        <ChatSheet />
        <FloatingChatTrigger />
        <Toaster position="bottom-center" />

        <SanityLive />
      </ChatStoreProvider>
    </ClerkProvider>
  );
}

export default AppLayout;
