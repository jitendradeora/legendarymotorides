import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, Conversion, JsonLd, PageHero } from "@/components/sections"
import { Icon, RouteMap } from "@/icons"
import { getAllSlugs, getSettings, getTour, getToursPage } from "@/lib/api"
import { fill, pad, texts } from "@/lib/format"
import { getTourSchema } from "@/lib/schema"
import { buildMetadata } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllSlugs()).tours.map((t) => ({ slug: t.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const tour = await getTour((await params).slug)
  return buildMetadata(tour.seo, { title: tour.title, description: tour.description, image: tour.image })
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const [tour, page, settings] = await Promise.all([getTour(slug), getToursPage(), getSettings()])
  const d = page.detail
  const highlights = texts(tour.highlights)
  const departures = texts(tour.departures)
  const priceNotes = texts(tour.priceNotes)
  const areaName = tour.destination?.title ?? ""
  const path = `/motorcycle-tours/${tour.slug}`
  const cta = { kicker: d.ctaKicker, title: fill(d.ctaTitle, { name: tour.title }), buttonLabel: d.ctaButtonLabel, buttonUrl: d.ctaButtonUrl }

  return (
    <Shell>
      <JsonLd data={getTourSchema({ name: tour.title, description: tour.description, image: tour.image, path, areaServed: areaName })} />
      <PageHero
        hero={{ eyebrow: "", title: "", description: tour.description, image: tour.image }}
        eyebrow={[areaName, d.heroEyebrowSuffix].filter(Boolean).join(" · ")}
        title={tour.title}
      />
      <section className="detail-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: d.breadcrumbLabel, to: "/motorcycle-tours" }, { label: tour.title }]} />
          <div className="tour-facts">
            <div><small>{d.durationLabel}</small><strong>{tour.duration}</strong></div>
            <div><small>{d.distanceLabel}</small><strong>{tour.distance}</strong></div>
            {tour.ridingDays ? <div><small>{d.ridingDaysLabel}</small><strong>{tour.ridingDays}</strong></div> : null}
            {tour.season ? <div><small>{d.seasonLabel}</small><strong>{tour.season}</strong></div> : null}
            <div><small>{d.priceLabel}</small><strong>{tour.price}</strong></div>
          </div>
          <section className="journey-overview">
            <div className="journey-overview-copy">
              <p className="eyebrow"><span />{d.overviewEyebrow}</p>
              <h2>{d.overviewTitle}</h2>
              <p className="detail-lead">{tour.description}</p>
            </div>
            <aside className="journey-overview-panel">
              <div className="journey-panel-header"><small>{d.highlightsLabel}</small><span>{highlights.length} {d.highlightsCountSuffix}</span></div>
              <ol className="journey-highlights">
                {highlights.map((highlight, index) => <li key={highlight}><span>{pad(index + 1)}</span><strong>{highlight}</strong></li>)}
              </ol>
              <div className="journey-meta">
                {tour.terrain ? <div><small>{d.terrainLabel}</small><strong>{tour.terrain}</strong></div> : null}
                {tour.dailyRide ? <div><small>{d.dailyLabel}</small><strong>{tour.dailyRide}</strong></div> : null}
                {tour.accommodation ? <div><small>{d.staysLabel}</small><strong>{tour.accommodation}</strong></div> : null}
                {tour.groupSize ? <div><small>{d.groupLabel}</small><strong>{tour.groupSize}</strong></div> : null}
              </div>
            </aside>
          </section>
          {departures.length > 0 ? (
            <section className="departure-section">
              <div className="departure-heading">
                <div>
                  <span className="section-index section-index-light">{d.departuresIndex}</span>
                  <p className="eyebrow eyebrow-light"><span />{d.departuresEyebrow}</p>
                  <h2>{d.departuresTitle}</h2>
                </div>
                <div className="departure-price"><small>{d.packageLabel}</small><strong>{tour.price}</strong><span>{d.availabilityLabel}</span></div>
              </div>
              <p className="departure-intro">{d.departuresIntro}</p>
              <div className="departure-grid">
                {departures.map((departure, index) => (
                  <article className="departure-card" key={departure}>
                    <span className="departure-number">{pad(index + 1)}</span>
                    <div><small>{d.departureCardLabel}</small><strong>{departure}</strong></div>
                    <a href={d.departureUrl} aria-label={fill(d.departureEnquireLabel, { dates: departure })}><Icon name="arrow" /></a>
                  </article>
                ))}
              </div>
              {priceNotes.length > 0 ? <div className="tour-price-notes">{priceNotes.map((note) => <small key={note}>{note}</small>)}</div> : null}
            </section>
          ) : null}
          <section className="itinerary-section">
            <div className="itinerary-heading">
              <p className="eyebrow"><span />{d.itineraryEyebrow}</p>
              <h2>{d.itineraryTitle}</h2>
              <p>{d.itineraryText}</p>
              <div className="itinerary-summary"><strong>{tour.duration}</strong><span>{tour.ridingDays || d.itineraryFallback}</span></div>
            </div>
            <ol className="itinerary-list">
              {tour.itinerary.map((stage, index) => (
                <li key={`${index}-${stage.title}`}>
                  <span className="itinerary-day">{pad(index + 1)}</span>
                  <article><small>{stage.phase}</small><h3>{stage.title}</h3><p>{stage.description}</p></article>
                </li>
              ))}
            </ol>
          </section>
          <section className="tour-map-section">
            <div><p className="eyebrow eyebrow-light"><span />{d.mapEyebrow}</p><h2>{d.mapTitle}</h2><p>{d.mapText}</p></div>
            <RouteMap stops={texts(tour.mapStops)} />
          </section>
          <section className="included-section">
            <div className="included-column"><span className="included-mark">+</span><h2>{d.includedTitle}</h2><ul>{texts(tour.includes).map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="included-column excluded"><span className="included-mark">{"−"}</span><h2>{d.excludedTitle}</h2><ul>{texts(tour.excludes).map((item) => <li key={item}>{item}</li>)}</ul></div>
          </section>
          <nav className="policy-links" aria-label={d.policyLabel}>
            <span>{d.policyLabel}</span>
            {d.policyLinks.map((link) => <a key={link.url} href={link.url}>{link.label} <Icon name="arrow" /></a>)}
          </nav>
          <Conversion cta={cta} />
        </div>
      </section>
    </Shell>
  )
}
