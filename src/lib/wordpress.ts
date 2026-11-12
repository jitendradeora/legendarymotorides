export type WpRendered = { rendered: string }

export type WpPost = {
  id: number
  slug: string
  date: string
  link: string
  title: WpRendered
  excerpt: WpRendered
  content: WpRendered
  featured_media: number
}

export type WpPage = WpPost

function wordpressApiUrl() {
  const apiUrl = process.env.WORDPRESS_API_URL?.replace(/\/$/, "") ?? ""
  if (!apiUrl.startsWith("http") || apiUrl.includes("example.com")) return ""
  return apiUrl
}

export function wordpressRoot() {
  return wordpressApiUrl().replace(/\/wp\/v2$/, "")
}

export function isWordPressConfigured() {
  return wordpressApiUrl().length > 0
}

export async function wpFetch<T>(path: string, init?: RequestInit): Promise<T | null> {
  const apiUrl = wordpressApiUrl()
  if (!apiUrl) return null

  try {
    const response = await fetch(`${apiUrl}${path}`, {
      ...init,
      headers: { Accept: "application/json", ...init?.headers },
      next: { revalidate: 300, tags: ["wordpress"] },
    })
    if (!response.ok) return null
    return (await response.json()) as T
  } catch {
    return null
  }
}

export function getWpPosts(perPage = 10) {
  return wpFetch<WpPost[]>(`/posts?per_page=${perPage}&_embed=1`)
}

export function getWpPageBySlug(slug: string) {
  return wpFetch<WpPage[]>(`/pages?slug=${encodeURIComponent(slug)}`)
}

export async function postToWordPress(route: string, payload: unknown) {
  const root = wordpressRoot()
  if (!root) return false

  try {
    const response = await fetch(`${root}${route}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    })
    return response.ok
  } catch {
    return false
  }
}
