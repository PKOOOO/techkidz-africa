#!/usr/bin/env node

import { createClient } from '@sanity/client'
import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env') })

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN || process.env.SANITY_API_WRITE_TOKEN

if (!projectId || !dataset || !token) {
    console.error('Missing required environment variables:')
    console.error('NEXT_PUBLIC_SANITY_PROJECT_ID:', projectId ? '✓' : '✗ MISSING')
    console.error('NEXT_PUBLIC_SANITY_DATASET:', dataset ? '✓' : '✗ MISSING')
    console.error('SANITY_API_TOKEN or SANITY_API_WRITE_TOKEN:', token ? '✓' : '✗ MISSING')
    process.exit(1)
}

const client = createClient({
    projectId,
    dataset,
    token,
    useCdn: false,
    apiVersion: '2025-01-04',
})

const initialPrograms = [
    {
        title: "Web Development & Software Engineering",
        description: "Inspire young innovators to create the future of the web. Our comprehensive web development program teaches kids to design, build, and launch their own websites using industry-standard tools and practices—all in an engaging, hands-on environment.",
        href: "/programs/web-development",
        iconName: "Code",
        isAnimationTraining: false,
        order: 0,
    },
    {
        title: "Online Safety & Cybersecurity",
        description: "Empower the next generation with essential digital defense skills. Through interactive cybersecurity lessons, kids learn to navigate the online world safely, protecting themselves and others while building responsible digital citizenship.",
        href: "/programs/cybersecurity",
        iconName: "Shield",
        isAnimationTraining: false,
        order: 1,
    },
    {
        title: "Robotics Training",
        description: "Ignite curiosity and engineering thinking through hands-on robotics. Kids explore the exciting intersection of mechanics and programming as they design, build, and bring robots to life—discovering real-world problem-solving along the way.",
        href: "/programs/robotics",
        iconName: "Bot",
        isAnimationTraining: false,
        order: 2,
    },
    {
        title: "Animation Training",
        description: "Unleash creativity and storytelling through the art of animation. Our program introduces kids to professional animation techniques, teaching them to transform ideas into captivating visual narratives that come alive on screen.",
        href: "/programs/animation",
        iconName: "Film",
        isAnimationTraining: true,
        order: 3,
    },
    {
        title: "Gamified Learning",
        description: "Transform education into an adventure. Our gamification approach turns lessons into interactive challenges and rewards, keeping kids motivated and engaged while they master new skills.",
        href: "/programs/gamified-learning",
        iconName: "Gamepad2",
        isAnimationTraining: false,
        order: 4,
    },
    {
        title: "Computer & Digital Literacy",
        description: "Build essential digital foundations for lifelong success. Our computer literacy program equips young learners with core technology skills—from file management to online collaboration—preparing them to thrive in an increasingly digital world.",
        href: "/programs/digital-literacy",
        iconName: "Monitor",
        isAnimationTraining: false,
        order: 5,
    },
]

async function seedPrograms() {
    try {
        console.log(`\n🌱 Seeding programs to Sanity...`)
        console.log(`Project: ${projectId}`)
        console.log(`Dataset: ${dataset}`)
        console.log(`\nAdding ${initialPrograms.length} programs...\n`)

        // Check if programs already exist
        const existingPrograms = await client.fetch('*[_type == "programsPage"]')
        
        if (existingPrograms.length > 0) {
            console.log(`⚠️  Found ${existingPrograms.length} existing program(s) in Sanity.`)
            console.log(`   This script will create new programs.`)
            console.log(`   You may want to delete existing ones first if you're re-seeding.\n`)
        }

        const results = []

        for (const program of initialPrograms) {
            const doc = {
                _type: 'programsPage',
                title: program.title,
                description: program.description,
                href: program.href,
                iconName: program.iconName,
                isAnimationTraining: program.isAnimationTraining,
                order: program.order,
                isActive: true,
            }

            const result = await client.create(doc)
            results.push(result)
            console.log(`✓ Created program: "${program.title}"`)
            if (program.isAnimationTraining) {
                console.log(`  → Animation Training (you can upload SVG images in Sanity Studio)`)
            }
        }

        console.log(`\n✅ Successfully created ${results.length} programs!`)
        console.log(`\n📝 Next steps:`)
        console.log(`   1. Go to Sanity Studio to view and edit these programs`)
        console.log(`   2. For "Animation Training", upload SVG images in the SVG Images field`)
        console.log(`   3. Adjust display order if needed`)

    } catch (error) {
        console.error('\n❌ Error creating programs:', error)
        if (error.response) {
            console.error('Response:', JSON.stringify(error.response.body, null, 2))
        }
        process.exit(1)
    }
}

seedPrograms()
