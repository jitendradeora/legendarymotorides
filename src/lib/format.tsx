import { Fragment } from "react"
import type { Img } from "./types"

/** Renders a WordPress title: new lines become <br />, *words* become <em>. */
export function RichTitle({ text }: { text: string }) {
  return (
    <>
      {text.split(/\r?\n/).map((line, index) => (
        <Fragment key={index}>
          {index > 0 ? <br /> : null}
          {line.split(/\*(.+?)\*/g).map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
        </Fragment>
      ))}
    </>
  )
}

/** Same title as plain text, for metadata and attributes. */
export function plain(text: string | null | undefined) {
  return (text ?? "").replace(/\*(.+?)\*/g, "$1").replace(/\s*\r?\n\s*/g, " ").trim()
}

/** Replaces {name}-style placeholders in an editor-supplied template. */
export function fill(template: string, values: Record<string, string>) {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => values[key] ?? "")
}

export const src = (image: Img | undefined) => image?.sourceUrl ?? ""
export const alt = (image: Img | undefined, fallback = "") => image?.altText || fallback
export const pad = (n: number) => String(n).padStart(2, "0")
export const texts = (items: { text: string }[] | null | undefined) => (items ?? []).map((item) => item.text)

export function serializeJson(data: unknown) {
  return JSON.stringify(data).replace(/</g, String.fromCharCode(92) + "u003c")
}

const NAMED: Record<string, string> = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " ", ndash: "–", mdash: "—", rsquo: "’", lsquo: "‘", rdquo: "”", ldquo: "“", hellip: "…" }

/** WordPress returns rendered titles with HTML entities (e.g. &#8217;). Decode them for plain-text use. */
export function decode(text: string | null | undefined) {
  return (text ?? "").replace(/&(#x?[0-9a-f]+|[a-z]+);/gi, (match, entity: string) => {
    if (entity[0] === "#") {
      const code = entity[1].toLowerCase() === "x" ? parseInt(entity.slice(2), 16) : parseInt(entity.slice(1), 10)
      return Number.isFinite(code) ? String.fromCodePoint(code) : match
    }
    return NAMED[entity.toLowerCase()] ?? match
  })
}
