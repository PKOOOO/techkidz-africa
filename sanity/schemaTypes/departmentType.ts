import { UsersIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const departmentType = defineType({
    name: "department",
    title: "Department",
    type: "document",
    icon: UsersIcon,
    fields: [
        defineField({
            name: "name",
            title: "Department Name",
            type: "string",
            validation: (rule) => rule.required().error("Department name is required"),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "name",
                maxLength: 96,
            },
            validation: (rule) => rule.required().error("Slug is required"),
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 3,
        }),
        defineField({
            name: "icon",
            title: "Icon Name",
            type: "string",
            description: "Lucide icon name (e.g., 'Palette', 'Code', 'Megaphone')",
        }),
        defineField({
            name: "image",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            initialValue: 0,
        }),
    ],
    preview: {
        select: {
            title: "name",
            subtitle: "description",
            media: "image",
        },
    },
});
