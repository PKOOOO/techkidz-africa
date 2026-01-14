import { CaseIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const JOB_TYPES = [
    { title: "Full-time", value: "full-time" },
    { title: "Part-time", value: "part-time" },
    { title: "Contract", value: "contract" },
    { title: "Internship", value: "internship" },
    { title: "Volunteer", value: "volunteer" },
];

export const careerType = defineType({
    name: "career",
    title: "Career",
    type: "document",
    icon: CaseIcon,
    fields: [
        defineField({
            name: "title",
            title: "Job Title",
            type: "string",
            validation: (rule) => rule.required().error("Job title is required"),
        }),
        defineField({
            name: "slug",
            type: "slug",
            options: {
                source: "title",
                maxLength: 96,
            },
            validation: (rule) => rule.required().error("Slug is required"),
        }),
        defineField({
            name: "department",
            title: "Department",
            type: "reference",
            to: [{ type: "department" }],
        }),
        defineField({
            name: "description",
            title: "Job Description",
            type: "array",
            of: [{ type: "block" }],
        }),
        defineField({
            name: "requirements",
            title: "Requirements",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "responsibilities",
            title: "Responsibilities",
            type: "array",
            of: [{ type: "string" }],
        }),
        defineField({
            name: "location",
            title: "Location",
            type: "string",
            initialValue: "Mombasa, Kenya",
        }),
        defineField({
            name: "type",
            title: "Job Type",
            type: "string",
            options: {
                list: JOB_TYPES,
                layout: "radio",
            },
        }),
        defineField({
            name: "deadline",
            title: "Application Deadline",
            type: "date",
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
            title: "title",
            department: "department.name",
            type: "type",
        },
        prepare({ title, department, type }) {
            return {
                title,
                subtitle: `${department || "No dept"} • ${type || ""}`,
            };
        },
    },
});
