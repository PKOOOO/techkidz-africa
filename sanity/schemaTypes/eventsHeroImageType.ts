import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const eventsHeroImageType = defineType({
    name: "eventsHeroImage",
    title: "Events Page Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Background Image",
            type: "image",
            options: { hotspot: true },
            description: "Background image for the events page hero section",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Only active image will be displayed on the events page",
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
                title: "Events Page Hero Image",
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
        },
    },
});
