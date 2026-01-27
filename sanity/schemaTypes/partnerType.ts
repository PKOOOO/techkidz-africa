import { ImageIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const partnerType = defineType({
    name: "partner",
    title: "Partner",
    type: "document",
    icon: ImageIcon,
    fields: [
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
            validation: (rule) => rule.required().error("Logo image is required"),
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
            media: "logo",
        },
        prepare({ media }) {
            return {
                title: "Partner Logo",
                media,
            };
        },
    },
});
