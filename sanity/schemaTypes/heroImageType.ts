import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const heroImageType = defineType({
    name: "heroImage",
    title: "Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required().error("Hero image is required"),
        }),
        defineField({
            name: "order",
            title: "Display Order",
            type: "number",
            description: "Lower numbers appear first in the carousel",
            initialValue: 0,
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Only active images will be displayed on the homepage",
            initialValue: true,
        }),
    ],
    preview: {
        select: {
            media: "image",
            order: "order",
            isActive: "isActive",
        },
        prepare({ media, order, isActive }) {
            return {
                title: `Hero Image ${order !== undefined ? `(Order: ${order})` : ""}`,
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
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
