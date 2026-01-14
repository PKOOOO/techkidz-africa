import { StarIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const PARTNER_TIERS = [
    { title: "Platinum", value: "platinum" },
    { title: "Gold", value: "gold" },
    { title: "Silver", value: "silver" },
    { title: "Bronze", value: "bronze" },
    { title: "Community", value: "community" },
];

export const partnerType = defineType({
    name: "partner",
    title: "Partner",
    type: "document",
    icon: StarIcon,
    fields: [
        defineField({
            name: "name",
            title: "Partner Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "logo",
            title: "Logo",
            type: "image",
            options: { hotspot: true },
        }),
        defineField({
            name: "website",
            title: "Website",
            type: "url",
        }),
        defineField({
            name: "tier",
            title: "Partner Tier",
            type: "string",
            options: {
                list: PARTNER_TIERS,
                layout: "radio",
            },
        }),
        defineField({
            name: "description",
            title: "Description",
            type: "text",
            rows: 2,
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
            tier: "tier",
            media: "logo",
        },
        prepare({ title, tier, media }) {
            return {
                title,
                subtitle: tier ? tier.charAt(0).toUpperCase() + tier.slice(1) : "",
                media,
            };
        },
    },
});
