import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const programsHeroImageType = defineType({
    name: "programsHeroImage",
    title: "Programs Page Hero Image",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "image",
            title: "Hero Background Image",
            type: "image",
            options: { hotspot: true },
            description: "Background image for the programs page hero section",
        }),
        defineField({
            name: "isActive",
            title: "Is Active",
            type: "boolean",
            description: "Only active image will be displayed on the programs page",
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
                title: "Programs Page Hero Image",
                subtitle: isActive ? "Active" : "Inactive",
                media,
            };
        },
    },
});
