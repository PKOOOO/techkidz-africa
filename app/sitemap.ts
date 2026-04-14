import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'

const BASE_URL = 'https://techkidzafrica.co.ke'

const SLUG_QUERY = (type: string) =>
    `*[_type == "${type}" && defined(slug.current)]{ "slug": slug.current }`

async function fetchSlugs(type: string): Promise<string[]> {
    const results = await client.fetch<{ slug: string }[]>(SLUG_QUERY(type))
    return results.map((r) => r.slug)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: `${BASE_URL}/`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${BASE_URL}/about`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/programs`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/projects`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/events`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/impact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${BASE_URL}/careers`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
    ]

    // Dynamic routes from Sanity
    const [programSlugs, projectSlugs, careerSlugs] = await Promise.all([
        fetchSlugs('program'),
        fetchSlugs('project'),
        fetchSlugs('career'),
    ])

    const programRoutes: MetadataRoute.Sitemap = programSlugs.map((slug) => ({
        url: `${BASE_URL}/programs/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }))

    const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
        url: `${BASE_URL}/projects/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }))

    const careerRoutes: MetadataRoute.Sitemap = careerSlugs.map((slug) => ({
        url: `${BASE_URL}/careers/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.6,
    }))

    return [...staticRoutes, ...programRoutes, ...projectRoutes, ...careerRoutes]
}
