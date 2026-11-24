import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, PageHero } from "@/components/sections"
import { Icon } from "@/icons"
import { getInsights, getInsightsPage, getSettings } from "@/lib/api"
import { pad, src } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getInsightsPage()).seo)
}

export default async function Page() {
  const [page, insights, settings] = await Promise.all([getInsightsPage(), getInsights(), getSettings()])
  return (
    <Shell>
      <PageHero hero={page.hero} />
      <section className="insights-page page-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
          <div className="insight-grid">
            {insights.map((article, index) => (
              <a className="insight-card" href={`/insights/${article.slug}`} key={article.slug}>
                <img src={src(article.image)} alt="" />
                <div>
                  <small>{page.cardLabel} {pad(index + 1)}</small>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <strong>{page.readLabel} <Icon name="arrow" /></strong>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}
