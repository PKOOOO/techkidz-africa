import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const teamMemberType = defineType({
    name: "teamMember",
    title: "Team Member",
    type: "document",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "name",
            title: "Full Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "role",
            title: "Role / Title",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "bio",
            title: "Short Bio",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "image",
            title: "Photo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "linkedin",
            title: "LinkedIn URL",
            type: "url",
        }),
        defineField({
            name: "twitter",
            title: "Twitter/X URL",
            type: "url",
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "role",
            media: "image",
        },
    },
    orderings: [
        {
            title: "Display Order",
            name: "orderAsc",
            by: [{ field: "order", direction: "asc" }],
        },
    ],
});
