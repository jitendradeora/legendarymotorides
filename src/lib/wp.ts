/** WordPress GraphQL client. All site content comes from WordPress; nothing is hard-coded in the frontend. */

/** Default WordPress site. Override with WORDPRESS_URL in the environment (e.g. .env.local). */
export const DEFAULT_WORDPRESS_URL = "http://213.210.36.12:8081"

export function wordpressUrl() {
  return (process.env.WORDPRESS_URL || DEFAULT_WORDPRESS_URL).replace(/\/$/, "")
}

export function graphqlUrl() {
  const url = process.env.WORDPRESS_GRAPHQL_URL || (wordpressUrl() ? `${wordpressUrl()}/graphql` : "")
  if (!url) throw new Error("WORDPRESS_URL is not set. Add WORDPRESS_URL=https://your-wordpress-site to the frontend environment.")
  return url
}

type GraphQLResponse<T> = { data?: T; errors?: { message: string }[] }

/** Wrapper objects like { node } / { nodes } are flattened so components get plain values. */
function unwrap(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(unwrap)
  if (value && typeof value === "object") {
    const entries = Object.entries(value as Record<string, unknown>).filter(([key]) => key !== "__typename")
    if (entries.length === 1 && (entries[0][0] === "node" || entries[0][0] === "nodes")) return unwrap(entries[0][1])
    return Object.fromEntries(entries.map(([key, v]) => [key, unwrap(v)]))
  }
  return value
}

export async function gql<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const response = await fetch(graphqlUrl(), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60, tags: ["wordpress"] },
  })
  if (!response.ok) throw new Error(`WordPress GraphQL request failed (${response.status}) at ${graphqlUrl()}`)
  const json = (await response.json()) as GraphQLResponse<unknown>
  if (json.errors?.length) throw new Error(`WordPress GraphQL error: ${json.errors.map((e) => e.message).join("; ")}`)
  return unwrap(json.data) as T
}

/** Post an enquiry to a Contact Form 7 form through its REST endpoint. */
export async function submitContactForm(formId: string, fields: Record<string, string>) {
  const root = wordpressUrl()
  if (!root || !formId) return { ok: false as const, message: "The form is not configured yet." }
  const body = new FormData()
  body.append("_wpcf7_unit_tag", `wpcf7-f${formId}-p0-o1`)
  for (const [key, value] of Object.entries(fields)) body.append(key, value)
  try {
    const response = await fetch(`${root}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`, { method: "POST", body })
    const result = (await response.json()) as { status?: string; message?: string }
    return { ok: result.status === "mail_sent", message: result.message ?? "" }
  } catch {
    return { ok: false as const, message: "" }
  }
}
