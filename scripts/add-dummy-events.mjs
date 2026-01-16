import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

// Load environment variables from .env
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables:')
    console.error('NEXT_PUBLIC_SANITY_PROJECT_ID:', projectId)
    console.error('NEXT_PUBLIC_SANITY_DATASET:', dataset)
    console.error('SANITY_API_TOKEN or SANITY_API_WRITE_TOKEN:', token ? '***' : 'MISSING')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2025-01-04',
})

// Helper function to create slug from title
function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '')
        .substring(0, 96)
}

// Helper function to create portable text blocks
function createPortableText(text) {
    return [
        {
            _type: 'block',
            _key: 'block1',
            style: 'normal',
            children: [
                {
                    _type: 'span',
                    _key: 'span1',
                    text: text,
                    marks: []
                }
            ],
            markDefs: []
        }
    ]
}

// Dummy events data
const dummyEvents = [
    {
        title: "Tech Career Fair 2026",
        date: "2026-02-15T10:00:00Z",
        endDate: "2026-02-15T17:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "Connect with leading employers and explore career opportunities in tech. This event brings together top tech companies, startups, and job seekers for networking and career development.",
        isVirtual: false,
        isFeatured: true,
        registrationLink: "https://example.com/register/tech-career-fair-2026",
    },
    {
        title: "Women in Tech Workshop",
        date: "2026-02-22T14:00:00Z",
        endDate: "2026-02-22T18:00:00Z",
        location: "Virtual Event",
        description: "A hands-on workshop for women looking to start their journey in technology. Learn coding basics, network with industry professionals, and discover career paths in tech.",
        isVirtual: true,
        isFeatured: false,
        registrationLink: "https://example.com/register/women-in-tech",
    },
    {
        title: "Startup Pitch Night",
        date: "2026-03-05T18:00:00Z",
        endDate: "2026-03-05T21:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "Young entrepreneurs pitch their ideas to investors and mentors. This is your chance to showcase your startup and get valuable feedback from experienced investors.",
        isVirtual: false,
        isFeatured: true,
        registrationLink: "https://example.com/register/startup-pitch-night",
    },
    {
        title: "AI & Machine Learning Bootcamp",
        date: "2025-11-10T09:00:00Z",
        endDate: "2025-11-12T17:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "A comprehensive 3-day bootcamp covering the fundamentals of AI and machine learning. Perfect for developers looking to expand their skills in this rapidly growing field.",
        isVirtual: false,
        isFeatured: true,
        registrationLink: "https://example.com/register/ai-ml-bootcamp",
    },
    {
        title: "Digital Marketing Masterclass",
        date: "2025-10-20T10:00:00Z",
        endDate: "2025-10-20T16:00:00Z",
        location: "Virtual Event",
        description: "Learn the latest digital marketing strategies and tools. This masterclass covers social media marketing, SEO, content marketing, and analytics.",
        isVirtual: true,
        isFeatured: false,
        registrationLink: "https://example.com/register/digital-marketing",
    },
    {
        title: "Youth Innovation Summit",
        date: "2025-09-15T08:00:00Z",
        endDate: "2025-09-15T18:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "A full-day summit celebrating youth innovation and entrepreneurship. Featuring keynote speakers, panel discussions, and networking opportunities.",
        isVirtual: false,
        isFeatured: true,
        registrationLink: "https://example.com/register/youth-innovation-summit",
    },
    {
        title: "Web Development Workshop",
        date: "2025-08-25T14:00:00Z",
        endDate: "2025-08-25T17:00:00Z",
        location: "Virtual Event",
        description: "Learn modern web development techniques including React, Next.js, and TypeScript. Perfect for beginners and intermediate developers.",
        isVirtual: true,
        isFeatured: false,
        registrationLink: "https://example.com/register/web-dev-workshop",
    },
    {
        title: "Community Tech Meetup",
        date: "2024-12-10T18:00:00Z",
        endDate: "2024-12-10T20:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "Monthly community meetup for tech enthusiasts. Share knowledge, network, and discuss the latest trends in technology.",
        isVirtual: false,
        isFeatured: false,
        registrationLink: "https://example.com/register/tech-meetup",
    },
    {
        title: "Hackathon 2024",
        date: "2024-11-20T09:00:00Z",
        endDate: "2024-11-22T18:00:00Z",
        location: "Swahilipot Hub, Mombasa",
        description: "48-hour hackathon bringing together developers, designers, and entrepreneurs to build innovative solutions. Prizes and mentorship opportunities available.",
        isVirtual: false,
        isFeatured: true,
        registrationLink: "https://example.com/register/hackathon-2024",
    },
    {
        title: "Data Science Workshop",
        date: "2024-10-05T10:00:00Z",
        endDate: "2024-10-05T15:00:00Z",
        location: "Virtual Event",
        description: "Introduction to data science using Python and popular libraries. Learn data analysis, visualization, and basic machine learning concepts.",
        isVirtual: true,
        isFeatured: false,
        registrationLink: "https://example.com/register/data-science",
    },
]

async function addDummyEvents() {
    try {
        console.log(`Connecting to Sanity project: ${projectId}, dataset: ${dataset}`)
        console.log(`Adding ${dummyEvents.length} dummy events...\n`)

        const results = []

        for (const event of dummyEvents) {
            const doc = {
                _type: 'event',
                title: event.title,
                slug: {
                    _type: 'slug',
                    current: createSlug(event.title),
                },
                description: createPortableText(event.description),
                date: event.date,
                endDate: event.endDate,
                location: event.location,
                isVirtual: event.isVirtual,
                isFeatured: event.isFeatured,
                registrationLink: event.registrationLink,
            }

            const result = await client.create(doc)
            results.push(result)
            console.log(`✓ Created event: "${event.title}"`)
        }

        console.log(`\n✅ Successfully created ${results.length} events!`)
        console.log('\nYou can now view and edit these events in Sanity Studio.')
        console.log('Remember to upload images for the events if needed.')

    } catch (error) {
        console.error('Error creating events:', error)
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response.body, null, 2))
        }
        process.exit(1)
    }
}

addDummyEvents()
