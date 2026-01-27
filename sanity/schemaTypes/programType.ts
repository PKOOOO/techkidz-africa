import { RocketIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const programType = defineType({
    name: "program",
    title: "Program",
    type: "document",
    icon: RocketIcon,
    fields: [
        defineField({
            name: "name",
            title: "Program Name",
            type: "string",
            validation: (rule) => rule.required().error("Program name is required"),
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
            name: "shortDescription",
            title: "Short Description",
            type: "string",
            description: "Brief tagline for cards and navigation",
        }),
        defineField({
            name: "description",
            title: "Full Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "image",
            title: "Cover Image",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "features",
            title: "Key Features",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            initialValue: true,
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
            subtitle: "shortDescription",
            media: "image",
        },
    },
});
