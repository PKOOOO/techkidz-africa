import { HomeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

const KENYA_COUNTIES = [
    "Mombasa", "Kwale", "Kilifi", "Tana River", "Lamu", "Taita-Taveta",
    "Garissa", "Wajir", "Mandera", "Marsabit", "Isiolo", "Meru", "Tharaka-Nithi",
    "Embu", "Kitui", "Machakos", "Makueni", "Nyandarua", "Nyeri", "Kirinyaga",
    "Murang'a", "Kiambu", "Turkana", "West Pokot", "Samburu", "Trans-Nzoia",
    "Uasin Gishu", "Elgeyo-Marakwet", "Nandi", "Baringo", "Laikipia", "Nakuru",
    "Narok", "Kajiado", "Kericho", "Bomet", "Kakamega", "Vihiga", "Bungoma",
    "Busia", "Siaya", "Kisumu", "Homa Bay", "Migori", "Kisii", "Nyamira", "Nairobi"
];

const INSTITUTION_TYPES = [
    { title: "University", value: "university" },
    { title: "TVET", value: "tvet" },
    { title: "College", value: "college" },
    { title: "High School", value: "high-school" },
    { title: "Other", value: "other" },
];

export const learningInstitutionType = defineType({
    name: "learningInstitution",
    title: "Learning Institution",
    type: "document",
    icon: HomeIcon,
    fields: [
        defineField({
            name: "name",
            title: "Institution Name",
            type: "string",
            validation: (rule) => rule.required().error("Institution name is required"),
        }),
        defineField({
            name: "type",
            title: "Institution Type",
            type: "string",
            options: {
                list: INSTITUTION_TYPES,
                layout: "radio",
            },
        }),
        defineField({
            name: "county",
            title: "County",
            type: "string",
            options: {
                list: KENYA_COUNTIES.map((c) => ({ title: c, value: c })),
            },
            validation: (rule) => rule.required().error("County is required"),
        }),
    ],
    preview: {
        select: {
            title: "name",
            type: "type",
            county: "county",
        },
        prepare({ title, type, county }) {
            return {
                title,
                subtitle: `${type || ""} • ${county || ""}`,
            };
        },
    },
});
