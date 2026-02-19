import { defineField, defineType } from "sanity";

export const chatSessionType = defineType({
    name: "chatSession",
    title: "Chat Session",
    type: "document",
    fields: [
        defineField({
            name: "sessionId",
            title: "Session ID",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "messageCount",
            title: "Message Count",
            type: "number",
            validation: (rule) => rule.required().min(1),
        }),
        defineField({
            name: "toolsUsed",
            title: "Tools Used",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "firstMessage",
            title: "First Message",
            type: "string",
        }),
        defineField({
            name: "messages",
            title: "Messages",
            type: "array",
            of: [
                {
                    type: "object",
                    fields: [
                        defineField({ name: "role", title: "Role", type: "string" }),
                        defineField({ name: "content", title: "Content", type: "text" }),
                    ],
                },
            ],
        }),
        defineField({
            name: "timestamp",
            title: "Timestamp",
            type: "datetime",
            validation: (rule) => rule.required(),
        }),
    ],
    preview: {
        select: { title: "firstMessage", subtitle: "timestamp" },
    },
});
