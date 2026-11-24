import { Icon } from "../icons"
import LoadMore from "./LoadMore"
import { alt, RichTitle, serializeJson, src } from "../lib/format"
import type { Cta, Hero, Img, IntroBlock, Tour } from "../lib/types"

/** Reusable page sections. Each one is defined once and fed by WordPress fields. */

export function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <p className={light ? "eyebrow eyebrow-light" : "eyebrow"}><span />{children}</p>
}

export function Breadcrumbs({ homeLabel, items }: { homeLabel: string; items: { label: string; to?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">{homeLabel}</a>
      {items.map((item) => <span key={item.label}><i>/</i>{item.to ? <a href={item.to}>{item.label}</a> : item.label}</span>)}
    </nav>
  )
}

export function PageHero({ hero, eyebrow, title }: { hero: Pick<Hero, "eyebrow" | "title" | "description" | "image">; eyebrow?: string; title?: string }) {
  return (
    <section className="subhero">
      {hero.image ? <img src={src(hero.image)} alt="" fetchPriority="high" /> : null}
      <div className="subhero-shade" />
      <div className="container subhero-content">
        <p className="eyebrow eyebrow-light"><span />{eyebrow ?? hero.eyebrow}</p>
        <h1>{title ?? <RichTitle text={hero.title} />}</h1>
        <p>{hero.description}</p>
      </div>
    </section>
  )
}

export function ListingIntro({ intro, homeLabel }: { intro: IntroBlock; homeLabel: string }) {
  return (
    <section className="listing-intro section-light">
      <div className="container">
        <Breadcrumbs homeLabel={homeLabel} items={[{ label: intro.title }]} />
        <div className="listing-intro-grid">
          <div><p className="eyebrow"><span />{intro.eyebrow}</p><h1>{intro.title}</h1></div>
          <p>{intro.description}</p>
        </div>
      </div>
    </section>
  )
}

export function Conversion({ cta, title }: { cta: Cta; title?: string }) {
  return (
    <section className="conversion">
      <div><small>{cta.kicker}</small><h2>{title ?? cta.title}</h2></div>
      <a className="button button-primary" href={cta.buttonUrl}>{cta.buttonLabel} <Icon name="arrow" /></a>
    </section>
  )
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJson(data) }} />
}

export function TourRow({ tour }: { tour: Pick<Tour, "slug" | "title" | "duration" | "distance" | "description"> & { image: Img } }) {
  return (
    <a className="tour-row" href={`/motorcycle-tours/${tour.slug}`}>
      <img src={src(tour.image)} alt={alt(tour.image, tour.title)} loading="lazy" />
      <div><small>{tour.duration} · {tour.distance}</small><h2>{tour.title}</h2><p>{tour.description}</p></div>
      <Icon name="arrow" />
    </a>
  )
}

/** Tours grouped by category (in the order the categories first appear), each group with its own "load more". */
export function TourList({ tours, loadMoreLabel }: { tours: Tour[]; loadMoreLabel: string }) {
  const groups: { slug: string; name: string; tours: Tour[] }[] = []
  for (const tour of tours) {
    const category = tour.categories[0] ?? { slug: "", name: "" }
    let group = groups.find((g) => g.slug === category.slug)
    if (!group) groups.push((group = { ...category, tours: [] }))
    group.tours.push(tour)
  }
  const named = groups.filter((g) => g.name)
  return (
    <>
      {named.length > 1 ? (
        <nav className="tour-category-nav">
          {named.map((g) => <a key={g.slug} href={`#${g.slug}`}>{g.name}</a>)}
        </nav>
      ) : null}
      {groups.map((group) => (
        <section className="tour-category" id={group.slug || undefined} key={group.slug || "all"}>
          {group.name ? <h2 className="tour-category-title">{group.name}</h2> : null}
          <LoadMore label={loadMoreLabel}>{group.tours.map((tour) => <TourRow key={tour.slug} tour={tour} />)}</LoadMore>
        </section>
      ))}
    </>
  )
}
