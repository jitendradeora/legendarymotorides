import type { Metadata } from "next"
import { Icon } from "../icons"
import { getPolicyPage, getSettings } from "../lib/api"
import { pad } from "../lib/format"
import { buildMetadata } from "../lib/seo"
import Shell from "./Shell"
import { ListingIntro } from "./sections"

/** One template for every policy page; each page supplies only its WordPress slug. */
export async function policyMetadata(slug: string): Promise<Metadata> {
  return buildMetadata((await getPolicyPage(slug)).seo)
}

export default async function PolicyPage({ slug }: { slug: string }) {
  const [page, settings] = await Promise.all([getPolicyPage(slug), getSettings()])
  return (
    <Shell>
      <ListingIntro intro={page.intro} homeLabel={settings.labels.home} />
      <article className="policy-page section-light">
        <div className="policy-inner">
          <div className="policy-notice"><Icon name="shield" /><p>{page.notice}</p></div>
          {page.sections.map((section, index) => (
            <section key={section.heading}><span>{pad(index + 1)}</span><div><h2>{section.heading}</h2><p>{section.body}</p></div></section>
          ))}
        </div>
      </article>
    </Shell>
  )
}
