import { DocumentTextIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const careerApplicationType = defineType({
    name: "careerApplication",
    title: "Career Application",
    type: "document",
    icon: DocumentTextIcon,
    fields: [
        defineField({
            name: "career",
            title: "Career",
            type: "reference",
            to: [{ type: "career" }],
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "fullName",
            title: "Full Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "resume",
            title: "Resume",
            type: "file",
        }),
        defineField({
            name: "linkedinUrl",
            title: "LinkedIn URL",
            type: "url",
        }),
        defineField({
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
        }),
        defineField({
            name: "note",
            title: "Short Note",
            type: "text",
            rows: 4,
        }),
        defineField({
            name: "isReviewed",
            title: "Reviewed",
            type: "boolean",
            initialValue: false,
        }),
        defineField({
            name: "isArchived",
            title: "Archived",
            type: "boolean",
            initialValue: false,
        }),
    ],
    preview: {
        select: {
            title: "fullName",
            email: "email",
            careerTitle: "career.title",
        },
        prepare({ title, email, careerTitle }) {
            return {
                title: title || "No name",
                subtitle: [email, careerTitle].filter(Boolean).join(" • "),
            };
        },
    },
    orderings: [
        {
            title: "Created At, Newest",
            name: "createdAtDesc",
            by: [{ field: "_createdAt", direction: "desc" }],
        },
    ],
});
