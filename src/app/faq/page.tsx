import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, JsonLd, PageHero } from "@/components/sections"
import { getFaqPage, getFaqs, getSettings } from "@/lib/api"
import { getFaqSchema } from "@/lib/schema"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getFaqPage()).seo)
}

export default async function Page() {
  const [page, faqs, settings] = await Promise.all([getFaqPage(), getFaqs(), getSettings()])
  const { more } = page
  return (
    <Shell>
      <JsonLd data={getFaqSchema(faqs)} />
      <PageHero hero={page.hero} />
      <section className="page-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question} name="rider-questions">
                <summary>{faq.question}<span>+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
          <p className="faq-more">
            {more.beforeEmail} <a href={`mailto:${settings.contact.email}`}>{settings.contact.email}</a> {more.between} <a href={more.linkUrl}>{more.linkLabel}</a>.
          </p>
        </div>
      </section>
    </Shell>
  )
}
