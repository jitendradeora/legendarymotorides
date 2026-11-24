import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, Conversion, JsonLd, PageHero, TourRow } from "@/components/sections"
import { getAllSlugs, getDestination, getDestinationsPage, getSettings, getTours } from "@/lib/api"
import { fill } from "@/lib/format"
import { getBreadcrumbSchema } from "@/lib/schema"
import { buildMetadata, siteUrl } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllSlugs()).destinations.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const destination = await getDestination((await params).slug)
  return buildMetadata(destination.seo, { title: destination.title, description: destination.description, image: destination.image })
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const [destination, page, settings, tours] = await Promise.all([getDestination(slug), getDestinationsPage(), getSettings(), getTours()])
  const { detail } = page
  const related = tours.filter((tour) => destination.relatedTours.some((item) => item.slug === tour.slug))
  const path = `/destinations/${destination.slug}`
  const cta = { kicker: detail.ctaKicker, title: fill(detail.ctaTitle, { name: destination.title }), buttonLabel: detail.ctaButtonLabel, buttonUrl: detail.ctaButtonUrl }
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "WebPage", name: destination.title, description: destination.description, url: `${siteUrl()}${path}`, about: { "@id": `${siteUrl()}/#organization` } },
      getBreadcrumbSchema([{ name: settings.labels.home, path: "/" }, { name: page.breadcrumbLabel, path: "/destinations" }, { name: destination.title, path }]),
    ],
  }
  return (
    <Shell>
      <JsonLd data={schema} />
      <PageHero
        hero={{ eyebrow: destination.region, title: "", description: destination.description, image: destination.image }}
        title={`${detail.heroTitlePrefix} ${destination.title}`}
      />
      <section className="detail-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel, to: "/destinations" }, { label: destination.title }]} />
          <div className="detail-grid">
            <div>
              <p className="eyebrow"><span />{detail.sectionEyebrow}</p>
              <h2>{detail.sectionTitle}</h2>
              <p className="detail-lead">{destination.description}</p>
            </div>
            <aside className="fact-panel">
              {destination.season ? <div><small>{detail.seasonLabel}</small><strong>{destination.season}</strong></div> : null}
              <div><small>{detail.terrainLabel}</small><strong>{destination.terrain}</strong></div>
              <div><small>{detail.planningLabel}</small><strong>{detail.planningText}</strong></div>
            </aside>
          </div>
          {related.length > 0 ? (
            <div className="related-block">
              <p className="eyebrow"><span />{detail.relatedLabel}</p>
              {related.map((tour) => <TourRow key={tour.slug} tour={tour} />)}
            </div>
          ) : null}
          <Conversion cta={cta} />
        </div>
      </section>
    </Shell>
  )
}
