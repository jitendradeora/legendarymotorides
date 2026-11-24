import type { Metadata } from "next"
import { Fragment } from "react"
import Shell from "@/components/Shell"
import { Eyebrow } from "@/components/sections"
import VideoTestimonials from "@/components/VideoTestimonials"
import { Icon } from "@/icons"
import { getDestinations, getFaqs, getHomePage, getReviews, getSettings, getVideos } from "@/lib/api"
import { alt, decode, pad, RichTitle, src } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  const page = await getHomePage()
  return buildMetadata(page.seo)
}

export default async function HomePage() {
  const [page, settings, allDestinations, reviews, videos, faqs] = await Promise.all([
    getHomePage(), getSettings(), getDestinations(), getReviews(), getVideos(), getFaqs(),
  ])
  const { hero, philosophy, story, journal } = page
  const featuredDestinations = page.destinations.featured.flatMap((row) => (row.destination[0] ? [{ ...row.destination[0], title: decode(row.destination[0].title), subtitle: row.subtitle }] : []))
  const featuredSlugs = new Set(featuredDestinations.map((d) => d.slug))
  const otherDestinations = allDestinations.filter((d) => !featuredSlugs.has(d.slug))
  const featuredTours = page.tours.featured.flatMap((row) => (row.tour[0] ? [{ ...row.tour[0], title: decode(row.tour[0].title) }] : []))
  const featuredArticle = journal.featuredArticle[0] ? { ...journal.featuredArticle[0], title: decode(journal.featuredArticle[0].title) } : undefined
  const [mainReview, ...otherReviews] = reviews
  const youtube = settings.socialLinks.find((link) => link.icon === "youtube")
  const videoLink = page.videos.sourceUrl || youtube?.url || "#"

  return (
    <Shell variant="home">
      <section className="hero" aria-labelledby="hero-title">
        {hero.image ? <img className="hero-image" src={src(hero.image)} alt={alt(hero.image)} fetchPriority="high" /> : null}
        <div className="hero-overlay" />
        <div className="hero-content container">
          <Eyebrow light>{hero.eyebrow}</Eyebrow>
          <h1 id="hero-title"><RichTitle text={hero.title} /></h1>
          <div className="hero-bottom">
            <p>{hero.description}</p>
            <div className="hero-actions">
              <a className="button button-primary" href={hero.primaryUrl}>{hero.primaryLabel} <Icon name="arrow" size={19} /></a>
              <a className="text-link light-link" href={hero.secondaryUrl}>{hero.secondaryLabel} <Icon name="arrow" size={18} /></a>
            </div>
          </div>
        </div>
      </section>

      <section className="intro section-light">
        <div className="container">
          <div className="rider-manifesto">
            <div className="manifesto-topline"><span>{philosophy.toplineLeft}</span><span>{philosophy.toplineRight}</span></div>
            <div className="manifesto-grid">
              <div className="manifesto-title">
                <Eyebrow light>{philosophy.eyebrow}</Eyebrow>
                <h2 className="manifesto-title"><RichTitle text={philosophy.title} /></h2>
              </div>
              <div className="manifesto-copy">
                <p className="lead">{philosophy.lead}</p>
                <a className="text-link light-link" href={philosophy.linkUrl}>{philosophy.linkLabel} <Icon name="arrow" size={18} /></a>
              </div>
            </div>
            <div className="manifesto-proof">
              {philosophy.proof.map((item) => <div key={item.value}><strong>{item.value}</strong><span>{item.label}</span></div>)}
            </div>
          </div>
        </div>
      </section>

      <section className="destinations section-light" id="destinations">
        <div className="container">
          <div className="section-heading">
            <div>
              <Eyebrow>{page.destinations.heading.eyebrow}</Eyebrow>
              <h2><RichTitle text={page.destinations.heading.title} /></h2>
            </div>
            <p>{page.destinations.heading.description}</p>
          </div>
          <div className="destination-grid">
            {featuredDestinations.map((destination, index) => (
              <a className={`destination-card destination-${index + 1}`} href={`/destinations/${destination.slug}`} key={destination.slug}>
                <img src={src(destination.destinationFields.image)} alt={alt(destination.destinationFields.image, destination.title)} loading="lazy" />
                <div className="image-shade" />
                <span className="card-number">{pad(index + 1)}</span>
                <div className="destination-copy">
                  <small>{destination.subtitle || destination.destinationFields.region}</small>
                  <h3>{destination.title}</h3>
                  <span className="card-action">{settings.labels.exploreDestination} <Icon name="arrow" size={18} /></span>
                </div>
              </a>
            ))}
          </div>
          {otherDestinations.length > 0 ? (
            <div className="more-destinations">
              <span>{page.destinations.alsoRidingLabel}</span>
              <p>
                {otherDestinations.map((destination, index) => (
                  <Fragment key={destination.slug}>{index > 0 ? <i /> : null}{destination.title}{" "}</Fragment>
                ))}
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="tours section-dark" id="tours">
        <div className="container">
          <div className="section-heading heading-dark">
            <div>
              <Eyebrow light>{page.tours.heading.eyebrow}</Eyebrow>
              <h2><RichTitle text={page.tours.heading.title} /></h2>
            </div>
            <a className="text-link light-link" href={page.tours.heading.linkUrl}>{page.tours.heading.linkLabel} <Icon name="arrow" size={18} /></a>
          </div>
          <div className="tour-grid">
            {featuredTours.map((tour, index) => (
              <article className="tour-card" key={tour.slug}>
                <a className="tour-image" href={`/motorcycle-tours/${tour.slug}`}>
                  <img src={src(tour.tourFields.image)} alt={alt(tour.tourFields.image, tour.title)} loading="lazy" />
                  <span>{pad(index + 1)}</span>
                </a>
                <div className="tour-copy">
                  <small>{tour.tourFields.place}</small>
                  <h3><a href={`/motorcycle-tours/${tour.slug}`}>{tour.title}</a></h3>
                  <div className="tour-meta">
                    <span>{tour.tourFields.duration}</span><i /><span>{tour.tourFields.distance}</span><i /><span>{page.tours.guidedLabel}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <p className="availability-note">{page.tours.availabilityNote}</p>
        </div>
      </section>

      <section className="story section-sand" id="story">
        <div className="container story-grid">
          <div className="story-image-wrap">
            {story.image ? <img src={src(story.image)} alt={alt(story.image)} loading="lazy" /> : null}
            <div className="story-caption"><span>{story.captionTop}</span><strong>{story.captionMain}</strong><small>{story.captionBottom}</small></div>
          </div>
          <div className="story-copy">
            <Eyebrow>{story.eyebrow}</Eyebrow>
            <h2><RichTitle text={story.title} /></h2>
            <p>{story.body}</p>
            <div className="feature-list">
              {story.features.map((feature) => (
                <div key={feature.title}>
                  <Icon name={feature.icon} />
                  <span><strong>{feature.title}</strong><small>{feature.text}</small></span>
                </div>
              ))}
            </div>
            <a className="button button-dark" href={story.buttonUrl}>{story.buttonLabel} <Icon name="arrow" size={19} /></a>
          </div>
        </div>
      </section>

      <section className="testimonials-section">
        <div className="container">
          <div className="testimonial-heading">
            <div><Eyebrow light>{page.testimonials.heading.eyebrow}</Eyebrow><h2><RichTitle text={page.testimonials.heading.title} /></h2></div>
            <p>{page.testimonials.heading.description}</p>
          </div>
          {mainReview ? (
            <div className="testimonial-grid">
              <article className="testimonial-feature">
                <span>{pad(1)}</span>
                <blockquote>“{mainReview.quote}”</blockquote>
                <div className="quote-credit"><strong>{mainReview.author}</strong><span>{mainReview.origin}</span></div>
              </article>
              <div className="testimonial-stack">
                {otherReviews.map((review, index) => (
                  <article key={review.author}>
                    <span>{pad(index + 2)}</span>
                    <p>“{review.quote}”</p>
                    <div className="quote-credit"><strong>{review.author}</strong><span>{review.origin}</span></div>
                  </article>
                ))}
              </div>
            </div>
          ) : null}
          <div className="review-row">
            <span>{page.testimonials.reviewLabel}</span>
            {settings.reviewLinks.map((review) => (
              <a key={review.name} href={review.url} target="_blank" rel="noopener noreferrer" aria-label={review.name}><Icon name={review.icon} size={18} /></a>
            ))}
          </div>
          <div className="video-testimonials" id="video-testimonials">
            <div className="testimonial-heading">
              <div><Eyebrow light>{page.videos.heading.eyebrow}</Eyebrow><h2><RichTitle text={page.videos.heading.title} /></h2></div>
              <p>{page.videos.heading.description}</p>
            </div>
            <VideoTestimonials videos={videos} playLabel={settings.labels.playVideo} closeLabel={settings.labels.closeVideo} />
            <a className="testimonial-source" href={videoLink} target="_blank" rel="noreferrer">{page.videos.sourceLabel} <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section className="journal section-light" id="journal">
        <div className="container">
          <div className="section-heading">
            <div><Eyebrow>{journal.heading.eyebrow}</Eyebrow><h2><RichTitle text={journal.heading.title} /></h2></div>
            <p>{journal.heading.description}</p>
          </div>
          <div className="journal-grid">
            {featuredArticle ? (
              <article className="journal-feature">
                <img src={src(featuredArticle.insightFields.image)} alt={alt(featuredArticle.insightFields.image, featuredArticle.title)} loading="lazy" />
                <div>
                  <small>{journal.featuredKicker}</small>
                  <h3>{featuredArticle.title}</h3>
                  <a className="text-link" href={`/insights/${featuredArticle.slug}`}>{journal.featuredLinkLabel} <Icon name="arrow" size={18} /></a>
                </div>
              </article>
            ) : null}
            <div className="journal-list">
              {journal.list.map((item) => (
                <a href={item.url} key={item.title}><span>{item.label}</span><strong>{item.title}</strong><Icon name="arrow" /></a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="faq section-light" id="faq">
        <div className="container faq-grid">
          <div>
            <Eyebrow>{page.faq.eyebrow}</Eyebrow>
            <h2><RichTitle text={page.faq.title} /></h2>
            <p>{page.faq.intro}</p>
            <a className="text-link" href={page.faq.linkUrl}>{page.faq.linkLabel} <Icon name="arrow" size={18} /></a>
          </div>
          <div className="faq-list">
            {faqs.slice(0, page.faq.count || 4).map((faq) => (
              <details key={faq.question} name="rider-questions">
                <summary>{faq.question}<span>+</span></summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}
