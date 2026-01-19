import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const impactHeroImageType = defineType({
    name: "impactHeroImage",
    title: "Impact Page Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Background Image",
            type: "image",
            options: { hotspot: true },
            description: "Background image for the impact page hero section",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Only active image will be displayed on the impact page",
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
                title: "Impact Page Hero Image",
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
        },
    },
});
