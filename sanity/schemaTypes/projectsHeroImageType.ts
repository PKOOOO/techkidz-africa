import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const projectsHeroImageType = defineType({
    name: "projectsHeroImage",
    title: "Projects Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Image",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required().error("Image is required"),
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
            media: "image",
            isActive: "isActive",
        },
        prepare({ media, isActive }) {
            return {
                title: "Projects Hero Image",
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
        },
    },
});
