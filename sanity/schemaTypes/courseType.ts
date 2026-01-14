import { BookIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const CERTIFICATIONS = [
    { title: "Certificate", value: "certificate" },
    { title: "Diploma", value: "diploma" },
    { title: "Degree", value: "degree" },
    { title: "Postgraduate", value: "postgraduate" },
    { title: "Short Course", value: "short-course" },
    { title: "Other", value: "other" },
];

export const courseType = defineType({
    name: "course",
    title: "Course",
    type: "document",
    icon: BookIcon,
    fields: [
        defineField({
            name: "name",
            title: "Course Name",
            type: "string",
            validation: (rule) => rule.required().error("Course name is required"),
        }),
        defineField({
            name: "certification",
            title: "Certification Type",
            type: "string",
            options: {
                list: CERTIFICATIONS,
                layout: "radio",
            },
            validation: (rule) => rule.required().error("Certification type is required"),
        }),
        defineField({
            name: "institution",
            title: "Institution",
            type: "reference",
            to: [{ type: "learningInstitution" }],
        }),
    ],
    preview: {
        select: {
            title: "name",
            certification: "certification",
            institution: "institution.name",
        },
        prepare({ title, certification, institution }) {
            return {
                title,
                subtitle: `${certification || ""} • ${institution || ""}`,
            };
        },
    },
});
