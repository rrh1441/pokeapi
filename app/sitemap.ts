import { MetadataRoute } from 'next'
import { getAllSets, getAllCardIds } from '@/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://pokecardapi.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/docs`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]

  // Set pages
  const sets = await getAllSets()
  const setPages: MetadataRoute.Sitemap = sets.map((setName) => ({
    url: `${baseUrl}/sets/${setName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  // Card pages (limit to avoid huge sitemap)
  const cardIds = await getAllCardIds()
  const cardPages: MetadataRoute.Sitemap = cardIds.slice(0, 5000).map((id) => ({
    url: `${baseUrl}/cards/${id}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  return [...staticPages, ...setPages, ...cardPages]
}
