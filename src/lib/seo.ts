import type { Metadata } from "next"
import { getSettings } from "./api"
import { plain } from "./format"
import type { Img, Seo } from "./types"

export function siteUrl() {
  return (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:8443").replace(/\/$/, "")
}

/** Page metadata from a WordPress SEO group, falling back to the defaults in Site Settings. */
export async function buildMetadata(seo: Seo, fallback?: { title?: string; description?: string; image?: Img }): Promise<Metadata> {
  const settings = await getSettings()
  const title = plain(seo?.title) || fallback?.title || settings.seoDefaults.title
  const description = seo?.description || fallback?.description || settings.seoDefaults.description
  const image = seo?.image ?? fallback?.image ?? settings.seoDefaults.shareImage
  return {
    title,
    description,
    openGraph: { title, description, ...(image ? { images: [{ url: image.sourceUrl, alt: image.altText ?? "" }] } : {}) },
    twitter: { title, description, ...(image ? { images: [image.sourceUrl] } : {}) },
  }
}
