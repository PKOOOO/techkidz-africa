import { createAgentUIStreamResponse, type UIMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { createHubAgent } from "@/lib/ai/shopping-agent";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch (error) {
    return new Response("Invalid JSON in request body", { status: 400 });
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("messages parameter must be provided as an array", {
      status: 400,
    });
  }

  // Get the user's session
  const { userId } = await auth();

  // Create Swahilipot Hub assistant
  const agent = createHubAgent({ userId });

  return createAgentUIStreamResponse({
    agent,
    uiMessages: messages as UIMessage[],
  });
}
