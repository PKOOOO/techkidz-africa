import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const contactHeroImageType = defineType({
    name: "contactHeroImage",
    title: "Contact Page Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Background Image",
            type: "image",
            options: { hotspot: true },
            description: "Background image for the contact page hero section",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Only active image will be displayed on the contact page",
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
                title: "Contact Page Hero Image",
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
        },
    },
});
