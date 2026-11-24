import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, PageHero } from "@/components/sections"
import { Icon } from "@/icons"
import { getDestinations, getDestinationsPage, getSettings } from "@/lib/api"
import { alt, pad, RichTitle, src } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getDestinationsPage()).seo)
}

export default async function Page() {
  const [page, destinations, settings] = await Promise.all([getDestinationsPage(), getDestinations(), getSettings()])
  return (
    <Shell>
      <PageHero hero={page.hero} />
      <section className="destination-editorial page-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
          <div className="destination-grid-heading">
            <p className="eyebrow"><span />{page.grid.eyebrow}</p>
            <h2><RichTitle text={page.grid.title} /></h2>
            <p>{page.grid.description}</p>
          </div>
          <div className="destination-page-grid">
            {destinations.map((destination, index) => (
              <a className={`destination-page-card destination-page-card-${index + 1}`} href={`/destinations/${destination.slug}`} key={destination.slug}>
                <img src={src(destination.image)} alt={alt(destination.image, destination.title)} loading={index > 2 ? "lazy" : undefined} />
                <div className="destination-feature-shade" />
                <span className="destination-card-index">{pad(index + 1)}</span>
                <div className="destination-page-copy">
                  <small>{destination.region}</small>
                  <h3>{destination.title}</h3>
                  <p>{destination.description}</p>
                  <strong>{settings.labels.exploreDestination} <Icon name="arrow" /></strong>
                </div>
              </a>
            ))}
          </div>
          <div className="permission-callout">
            <Icon name="shield" />
            <div><strong>{page.callout.title}</strong><p>{page.callout.text}</p></div>
          </div>
        </div>
      </section>
    </Shell>
  )
}
