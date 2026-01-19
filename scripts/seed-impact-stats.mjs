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
    apiVersion: '2024-01-01',
})

const impactStats = [
    {
        _type: "impactStat",
        value: "200",
        label: "Projects done",
        iconName: "Projects",
        description: "Our state of the art collab tool of the century with max benefits.",
        order: 0,
        isActive: true,
    },
    {
        _type: "impactStat",
        value: "153000",
        label: "Learners mentored",
        iconName: "Learners",
        description: "Transforming ideas into reality with cutting-edge technology and expert guidance.",
        order: 1,
        isActive: true,
    },
    {
        _type: "impactStat",
        value: "5000",
        label: "Teachers mentored",
        iconName: "Mentors",
        description: "Eco-friendly solutions designed for a better tomorrow and reduced environmental impact.",
        order: 2,
        isActive: true,
    },
    {
        _type: "impactStat",
        value: "27",
        label: "Counties",
        iconName: "KenyaCounty",
        description: "Making a difference in the lives of young people across East Africa.",
        order: 3,
        isActive: true,
    },
];

async function seedImpactStats() {
    console.log('🌱 Seeding impact stats...')

    try {
        // Check if stats already exist
        const existingStats = await client.fetch(`*[_type == "impactStat"]`)

        if (existingStats.length > 0) {
            console.log(`⚠️  Found ${existingStats.length} existing impact stats. Skipping seed.`)
            console.log('   To re-seed, delete existing stats in Sanity Studio first.')
            return
        }

        // Create all stats
        const result = await client
            .transaction()
            .create(impactStats[0])
            .create(impactStats[1])
            .create(impactStats[2])
            .create(impactStats[3])
            .commit()

        console.log('✅ Successfully seeded impact stats!')
        console.log(`   Created ${impactStats.length} impact stats`)
    } catch (error) {
        console.error('❌ Error seeding impact stats:', error)
        process.exit(1)
    }
}

seedImpactStats()
