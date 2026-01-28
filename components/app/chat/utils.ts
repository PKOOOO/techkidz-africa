import type { UIMessage } from "ai";
import type { ToolCallPart } from "./types";

// Extract text content from message parts
export function getMessageText(message: UIMessage): string {
  if (!message.parts || message.parts.length === 0) {
    return "";
  }
  return message.parts
    .filter((part) => part.type === "text")
    .map((part) => (part as { type: "text"; text: string }).text)
    .join("\n");
}

// Check if message has tool calls (parts starting with "tool-")
export function getToolParts(message: UIMessage): ToolCallPart[] {
  if (!message.parts || message.parts.length === 0) {
    return [];
  }
  return message.parts
    .filter((part) => part.type.startsWith("tool-"))
    .map((part) => part as unknown as ToolCallPart);
}

// Get human-readable tool name
export function getToolDisplayName(toolName: string): string {
  const toolNames: Record<string, string> = {
    // Sanity database query tools
    getPrograms: "Fetching programs",
    getProgramDetails: "Looking up program details",
    getEvents: "Checking upcoming events",
    getTeamMembers: "Finding team information",
    getCareers: "Searching job opportunities",
    getImpactStats: "Getting impact statistics",
    getProjects: "Loading projects",
    getProjectDetails: "Getting project details",
  };
  return toolNames[toolName] || toolName;
}
