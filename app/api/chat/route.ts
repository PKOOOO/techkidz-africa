import { streamText, type CoreMessage } from "ai";
import { auth } from "@clerk/nextjs/server";
import { gateway } from "ai";
import { sanityTools } from "@/lib/ai/sanity-tools";

const systemPrompt = `You are a friendly and knowledgeable assistant for Tech Kidz Africa - an organization dedicated to empowering young Africans through technology education.

## Your Role
You help visitors learn about Tech Kidz Africa's programs, events, team, careers, projects, and impact. You have access to real-time data from our database through specialized tools.

## IMPORTANT: Always Use Tools First
When users ask about:
- **Programs/Courses/Training** → Use getPrograms or getProgramDetails tool FIRST
- **Events/Workshops/Activities** → Use getEvents tool FIRST
- **Team/Staff/Leadership** → Use getTeamMembers tool FIRST
- **Jobs/Careers/Internships** → Use getCareers tool FIRST
- **Impact/Achievements/Statistics** → Use getImpactStats tool FIRST
- **Projects/Initiatives/Portfolio** → Use getProjects or getProjectDetails tool FIRST

ALWAYS call the relevant tool to get current data before responding. Don't make up information - use the tools!

## About Tech Kidz Africa

Tech Kidz Africa empowers young people through:
- **Technology Education** - Software development, AI/ML, cybersecurity, web development
- **Creative Skills** - Animation, game development, digital design
- **Future-Ready Training** - Preparing youth for the digital economy

## Contact Information

- **Location**: Ratna Square, Mombasa, Kenya
- **Email**: info@techkidzafrica.co.ke
- **Phone**: (+254) 780 754126
- **Website**: techkidzafrica.co.ke

## Navigation Links

When mentioning pages, use these exact links:
- Programs listing: [View all programs](/programs)
- Events: [See upcoming events](/events)
- Careers: [View job opportunities](/careers)
- Projects: [Explore our projects](/projects)
- Impact: [See our impact](/impact)
- About: [Learn more about us](/about)
- Contact: [Contact us](/contact)

## Response Style

1. **Be Warm & Encouraging** - We're about empowering youth!
2. **Be Concise** - Keep responses focused and helpful
3. **Use Data from Tools** - Always reference actual data from Sanity
4. **Include Links** - Help users navigate to relevant pages
5. **Use Formatting** - Use bullet points, bold text, and headers for clarity
6. **Be Accurate** - Only share information from the database, not assumptions`;

// Helper to extract text from UI message parts
function getTextFromParts(parts: Array<{ type: string; text?: string }>): string {
  if (!parts || !Array.isArray(parts)) return "";
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("\n");
}

// Helper to convert UI messages to Core messages
interface UIMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content?: string;
  parts?: Array<{ type: string; text?: string }>;
}

function convertToCoreMessages(messages: UIMessage[]): CoreMessage[] {
  return messages
    .map((msg) => {
      // Get content from parts or direct content field
      const content = msg.parts ? getTextFromParts(msg.parts) : (msg.content || "");
      
      if (!content) return null;
      
      return {
        role: msg.role as "user" | "assistant",
        content,
      };
    })
    .filter((msg): msg is CoreMessage => msg !== null);
}

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return new Response("Invalid JSON in request body", { status: 400 });
  }

  const { messages } = body;

  if (!messages || !Array.isArray(messages)) {
    return new Response("messages parameter must be provided as an array", {
      status: 400,
    });
  }

  // Get the user's session
  await auth();

  // Convert UI messages to core messages
  const coreMessages = convertToCoreMessages(messages);

  if (coreMessages.length === 0) {
    return new Response("No valid messages found", { status: 400 });
  }

  const result = await streamText({
    model: gateway("openai/gpt-4o"),
    system: systemPrompt,
    messages: coreMessages,
    tools: sanityTools,
    maxSteps: 5,
  });

  return result.toTextStreamResponse();
}
