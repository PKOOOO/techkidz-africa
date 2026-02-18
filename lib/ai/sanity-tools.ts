import { tool } from "ai";
import { z } from "zod";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

// Create a Sanity client for server-side queries
const sanityClient = createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: true,
});

/**
 * Tool to fetch all programs from Sanity
 */
export const getPrograms = tool({
    description: "Get all available programs at Tech Kidz Africa. Use this when users ask about programs, courses, training, or what they can learn.",
    inputSchema: z.object({
        query: z.string().optional().describe("Optional search query"),
    }),
    execute: async () => {
        const programs = await sanityClient.fetch(`
            *[_type == "programsPage" && isActive == true] | order(order asc) {
                _id,
                title,
                description,
                href,
                iconName
            }
        `);
        return { programs };
    },
});

/**
 * Tool to fetch a specific program by title or slug
 */
export const getProgramDetails = tool({
    description: "Get detailed information about a specific program. Use this when users ask about a particular program like 'Web Development', 'Cyber Security', 'AI & Machine Learning', etc.",
    inputSchema: z.object({
        programName: z.string().describe("The name or partial name of the program to search for"),
    }),
    execute: async ({ programName }) => {
        const program = await sanityClient.fetch(`
            *[_type == "programsPage" && isActive == true && (
                title match $search || 
                href match $search
            )][0] {
                _id,
                title,
                description,
                href,
                iconName,
                "contentText": pt::text(content)
            }
        `, { search: `*${programName}*` });

        if (!program) {
            return { error: `Program "${programName}" not found` };
        }
        return { program };
    },
});

/**
 * Tool to fetch upcoming events
 */
export const getEvents = tool({
    description: "Get upcoming events at Tech Kidz Africa. Use this when users ask about events, workshops, meetups, or activities.",
    inputSchema: z.object({
        limit: z.number().optional().describe("Number of events to fetch"),
    }),
    execute: async ({ limit = 5 }) => {
        const now = new Date().toISOString();
        const events = await sanityClient.fetch(`
            *[_type == "event" && date >= $now] | order(date asc)[0...$limit] {
                _id,
                title,
                "slug": slug.current,
                date,
                endDate,
                location,
                isVirtual,
                registrationLink,
                isFeatured
            }
        `, { now, limit });
        return { events, totalCount: events.length };
    },
});

/**
 * Tool to fetch team members
 */
export const getTeamMembers = tool({
    description: "Get information about the Tech Kidz Africa team. Use this when users ask about the team, staff, leadership, or who runs the organization.",
    inputSchema: z.object({
        query: z.string().optional().describe("Optional search query"),
    }),
    execute: async () => {
        const members = await sanityClient.fetch(`
            *[_type == "teamMember" && isActive == true] | order(order asc) {
                _id,
                name,
                role,
                bio,
                linkedin,
                twitter
            }
        `);
        return { members };
    },
});

/**
 * Tool to fetch career opportunities
 */
export const getCareers = tool({
    description: "Get current job opportunities and career openings at Tech Kidz Africa. Use this when users ask about jobs, careers, employment, internships, or working with us.",
    inputSchema: z.object({
        query: z.string().optional().describe("Optional search query"),
    }),
    execute: async () => {
        const careers = await sanityClient.fetch(`
            *[_type == "career" && isActive == true] {
                _id,
                title,
                "slug": slug.current,
                location,
                type,
                deadline,
                requirements,
                responsibilities
            }
        `);
        return { careers, totalCount: careers.length };
    },
});

/**
 * Tool to fetch impact statistics
 */
export const getImpactStats = tool({
    description: "Get the impact statistics and achievements of Tech Kidz Africa. Use this when users ask about impact, achievements, numbers, reach, or statistics.",
    inputSchema: z.object({
        query: z.string().optional().describe("Optional search query"),
    }),
    execute: async () => {
        const stats = await sanityClient.fetch(`
            *[_type == "impactStat" && isActive == true] | order(order asc) {
                _id,
                value,
                label,
                description,
                iconName
            }
        `);
        return { stats };
    },
});

/**
 * Tool to fetch projects
 */
export const getProjects = tool({
    description: "Get projects and initiatives at Tech Kidz Africa. Use this when users ask about projects, what we've built, initiatives, or portfolio.",
    inputSchema: z.object({
        query: z.string().optional().describe("Optional search query"),
    }),
    execute: async () => {
        const projects = await sanityClient.fetch(`
            *[_type == "project" && isActive == true] | order(order asc) {
                _id,
                title,
                "slug": slug.current,
                description
            }
        `);
        return { projects };
    },
});

/**
 * Tool to get project details
 */
export const getProjectDetails = tool({
    description: "Get detailed information about a specific project.",
    inputSchema: z.object({
        projectName: z.string().describe("The name or partial name of the project to search for"),
    }),
    execute: async ({ projectName }) => {
        const project = await sanityClient.fetch(`
            *[_type == "project" && isActive == true && (
                title match $search || 
                slug.current match $search
            )][0] {
                _id,
                title,
                "slug": slug.current,
                description,
                sections[] {
                    badge,
                    title,
                    "contentText": pt::text(content)
                }
            }
        `, { search: `*${projectName}*` });

        if (!project) {
            return { error: `Project "${projectName}" not found` };
        }
        return { project };
    },
});

/**
 * All Sanity tools for the AI agent
 */
export const sanityTools = {
    getPrograms,
    getProgramDetails,
    getEvents,
    getTeamMembers,
    getCareers,
    getImpactStats,
    getProjects,
    getProjectDetails,
};
