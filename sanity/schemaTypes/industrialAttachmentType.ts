import { UserIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const GENDERS = [
    { title: "Male", value: "male" },
    { title: "Female", value: "female" },
];

const YEARS_OF_STUDY = [
    { title: "Year 1", value: "year-1" },
    { title: "Year 2", value: "year-2" },
    { title: "Year 3", value: "year-3" },
    { title: "Year 4", value: "year-4" },
    { title: "Year 5", value: "year-5" },
    { title: "Year 6", value: "year-6" },
];

export const industrialAttachmentType = defineType({
    name: "industrialAttachment",
    title: "Industrial Attachment",
    type: "document",
    icon: UserIcon,
    groups: [
        { name: "personal", title: "Personal Info", default: true },
        { name: "education", title: "Education" },
        { name: "application", title: "Application" },
        { name: "status", title: "Status" },
    ],
    fields: [
        // Personal Info
        defineField({
            name: "swahilipotId",
            title: "Swahilipot ID",
            type: "string",
            group: "personal",
            readOnly: true,
        }),
        defineField({
            name: "firstName",
            title: "First Name",
            type: "string",
            group: "personal",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "middleName",
            title: "Middle Name",
            type: "string",
            group: "personal",
        }),
        defineField({
            name: "lastName",
            title: "Last Name",
            type: "string",
            group: "personal",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "email",
            title: "Email",
            type: "string",
            group: "personal",
            validation: (rule) => rule.required().email(),
        }),
        defineField({
            name: "phoneNumber",
            title: "Phone Number",
            type: "string",
            group: "personal",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "gender",
            title: "Gender",
            type: "string",
            group: "personal",
            options: {
                list: GENDERS,
                layout: "radio",
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "dateOfBirth",
            title: "Date of Birth",
            type: "date",
            group: "personal",
        }),
        defineField({
            name: "residentialLocation",
            title: "Residential Location",
            type: "string",
            group: "personal",
        }),

        // Education
        defineField({
            name: "isStudent",
            title: "Is Currently a Student",
            type: "boolean",
            group: "education",
            initialValue: true,
        }),
        defineField({
            name: "institution",
            title: "Learning Institution",
            type: "reference",
            to: [{ type: "learningInstitution" }],
            group: "education",
        }),
        defineField({
            name: "institutionName",
            title: "Institution Name (if not listed)",
            type: "string",
            group: "education",
        }),
        defineField({
            name: "course",
            title: "Course",
            type: "reference",
            to: [{ type: "course" }],
            group: "education",
        }),
        defineField({
            name: "courseName",
            title: "Course Name (if not listed)",
            type: "string",
            group: "education",
        }),
        defineField({
            name: "yearOfStudy",
            title: "Year of Study",
            type: "string",
            group: "education",
            options: {
                list: YEARS_OF_STUDY,
            },
        }),
        defineField({
            name: "expectedGraduationYear",
            title: "Expected Graduation Year",
            type: "number",
            group: "education",
        }),

        // Application
        defineField({
            name: "whatMakesYouStandOut",
            title: "What Makes You Stand Out",
            type: "text",
            group: "application",
            rows: 4,
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "aboutYourself",
            title: "About Yourself",
            type: "text",
            group: "application",
            rows: 4,
        }),
        defineField({
            name: "communityEngagement",
            title: "Community Engagement Statement",
            type: "text",
            group: "application",
            rows: 4,
        }),
        defineField({
            name: "understandingOfSwahilipot",
            title: "Understanding of Swahilipot",
            type: "text",
            group: "application",
            rows: 4,
        }),
        defineField({
            name: "resumeUrl",
            title: "Resume URL",
            type: "url",
            group: "application",
        }),
        defineField({
            name: "schoolLetterUrl",
            title: "School Letter URL",
            type: "url",
            group: "application",
        }),
        defineField({
            name: "linkedinUrl",
            title: "LinkedIn URL",
            type: "url",
            group: "application",
        }),
        defineField({
            name: "githubUrl",
            title: "GitHub URL",
            type: "url",
            group: "application",
        }),

        // Status
        defineField({
            name: "isAccepted",
            title: "Accepted",
            type: "boolean",
            group: "status",
            initialValue: false,
        }),
        defineField({
            name: "isArchived",
            title: "Archived",
            type: "boolean",
            group: "status",
            initialValue: false,
        }),
        defineField({
            name: "emailSent",
            title: "Email Sent",
            type: "boolean",
            group: "status",
            initialValue: false,
        }),
        defineField({
            name: "departmentAssigned",
            title: "Department/Program Assigned",
            type: "string",
            group: "status",
        }),
    ],
    preview: {
        select: {
            firstName: "firstName",
            lastName: "lastName",
            email: "email",
            isAccepted: "isAccepted",
        },
        prepare({ firstName, lastName, email, isAccepted }) {
            return {
                title: `${firstName || ""} ${lastName || ""}`.trim() || "No name",
                subtitle: `${email || ""} ${isAccepted ? "✓ Accepted" : ""}`,
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
