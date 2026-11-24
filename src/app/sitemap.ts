import type { MetadataRoute } from "next"
import { getAllSlugs } from "@/lib/api"
import { siteUrl } from "@/lib/seo"

const STATIC_ROUTES: [string, number][] = [
  ["/", 1], ["/destinations", 0.9], ["/motorcycle-tours", 0.9], ["/tour-calendar", 0.8], ["/fixed-departures", 0.7],
  ["/join-tour", 0.7], ["/custom-tours", 0.8], ["/insights", 0.7], ["/gallery", 0.5], ["/faq", 0.6], ["/about", 0.6], ["/contact", 0.6],
  ["/terms-and-conditions", 0.3], ["/payment-policy", 0.3], ["/cancellation-and-refund", 0.3], ["/privacy-policy", 0.3],
]

/** Sitemap built from WordPress content so new destinations, tours and insights appear automatically. */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getAllSlugs()
  const base = siteUrl()
  return [
    ...STATIC_ROUTES.map(([path, priority]) => ({ url: path === "/" ? `${base}/` : `${base}${path}`, priority })),
    ...slugs.destinations.map((d) => ({ url: `${base}/destinations/${d.slug}`, priority: 0.8 })),
    ...slugs.tours.map((t) => ({ url: `${base}/motorcycle-tours/${t.slug}`, priority: 0.9 })),
    ...slugs.insights.map((a) => ({ url: `${base}/insights/${a.slug}`, priority: 0.6 })),
  ]
}
