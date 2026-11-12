"use client"

import { FormEvent, Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import Footer from "./Footer"
import Header from "./Header"
import MoveToTop from "./MoveToTop"
import { Icon, RouteMap } from "../icons"
import { calendarMonths, teamMembers } from "../lib/company-content"
import { articles, destinations, galleryImages, tours } from "../lib/content"
import { getArticleSchema, getBreadcrumbSchema, getTourSchema, serializeSchema } from "../lib/schema"
import { siteConfig } from "../lib/site-config"

function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <a href="/">Home</a>
      {items.map((item) => <span key={item.label}><i>/</i>{item.to ? <a href={item.to}>{item.label}</a> : item.label}</span>)}
    </nav>
  )
}

function PageHero({ eyebrow, title, description, image }: { eyebrow: string; title: string; description: string; image: string }) {
  return (
    <section className="subhero">
      <img src={image} alt="" fetchPriority="high" />
      <div className="subhero-shade" />
      <div className="container subhero-content">
        <p className="eyebrow eyebrow-light"><span />{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

function Shell({ children }: { children: React.ReactNode }) {
  return <><Header /><main>{children}</main><Footer /><MoveToTop /></>
}

function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(data) }} />
}

function ListingIntro({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <section className="listing-intro section-light">
      <div className="container">
        <Breadcrumbs items={[{ label: title }]} />
        <div className="listing-intro-grid">
          <div><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1></div>
          <p>{description}</p>
        </div>
      </div>
    </section>
  )
}

export function DestinationsPage() {
  const description = "Explore guided motorcycle destinations across India and selected Himalayan regions, from Ladakh and Spiti to Rajasthan and South India."
  return (
    <Shell>
      <PageHero eyebrow="Choose your horizon" title="Motorcycle destinations" description={description} image="/images/ladakh.webp" />
      <section className="destination-editorial page-section section-light">
        <div className="container">
          <Breadcrumbs items={[{ label: "Destinations" }]} />
          <div className="destination-grid-heading"><p className="eyebrow"><span />Every direction</p><h2>Ten landscapes.<br />One riding spirit.</h2><p>From high-altitude desert to tropical coast, choose the landscape that sets the rhythm for your next ride.</p></div>
          <div className="destination-page-grid">
            {destinations.map((destination, index) => (
              <a className={`destination-page-card destination-page-card-${index + 1}`} href={`/destinations/${destination.slug}`} key={destination.slug}>
                <img src={destination.image} alt={`${destination.name} motorcycle touring landscape`} loading={index > 2 ? "lazy" : undefined} />
                <div className="destination-feature-shade" />
                <span className="destination-card-index">{String(index + 1).padStart(2, "0")}</span>
                <div className="destination-page-copy"><small>{destination.region}</small><h3>{destination.name}</h3><p>{destination.description}</p><strong>Explore destination <Icon name="arrow" /></strong></div>
              </a>
            ))}
          </div>
          <div className="permission-callout"><Icon name="shield" /><div><strong>Every route is checked before departure.</strong><p>Mountain access, international borders, permits, and operating conditions can change. Availability is reconfirmed before your booking is accepted.</p></div></div>
        </div>
      </section>
    </Shell>
  )
}

export function DestinationDetailPage({ slug }: { slug: string }) {
  const destination = destinations.find((item) => item.slug === slug)
  if (!destination) return <NotFoundPage />
  const related = tours.filter((tour) => destination.relatedTours.includes(tour.slug))
  const path = `/destinations/${destination.slug}`
  const title = `${destination.name} Motorcycle Tours | Legendary Moto Rides`
  const crumbs = getBreadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Destinations", path: "/destinations" },
    { name: destination.name, path },
  ])
  return (
    <Shell>
      <JsonLd data={{ "@context": "https://schema.org", "@graph": [{ "@type": "WebPage", name: title, description: destination.description, url: `${siteConfig.url}${path}`, about: { "@id": `${siteConfig.url}/#organization` } }, crumbs] }} />
      <PageHero eyebrow={destination.region} title={`Ride ${destination.name}`} description={destination.description} image={destination.image} />
      <section className="detail-section section-light">
        <div className="container">
          <Breadcrumbs items={[{ label: "Destinations", to: "/destinations" }, { label: destination.name }]} />
          <div className="detail-grid">
            <div><p className="eyebrow"><span />The road ahead</p><h2>A journey shaped by the landscape.</h2><p className="detail-lead">{destination.description}</p></div>
            <aside className="fact-panel">
              {destination.season && <div><small>Verified riding season</small><strong>{destination.season}</strong></div>}
              <div><small>Road character</small><strong>{destination.terrain}</strong></div>
              <div><small>Planning note</small><strong>Route access and permissions are reconfirmed before booking.</strong></div>
            </aside>
          </div>
          {related.length > 0 && <div className="related-block"><p className="eyebrow"><span />Related journey</p>{related.map((tour) => <TourRow key={tour.slug} tour={tour} />)}</div>}
          <Conversion title={`Ready to ride ${destination.name}?`} />
        </div>
      </section>
    </Shell>
  )
}

function TourRow({ tour }: { tour: (typeof tours)[number] }) {
  return (
    <a className="tour-row" href={`/motorcycle-tours/${tour.slug}`}>
      <img src={tour.image} alt={`${tour.name} motorcycle journey`} loading="lazy" />
      <div><small>{tour.duration} · {tour.distance}</small><h2>{tour.name}</h2><p>{tour.description}</p></div>
      <Icon name="arrow" />
    </a>
  )
}

export function ToursPage() {
  const description = "Compare verified guided motorcycle journeys across Ladakh, Rajasthan, and South India."
  return (
    <Shell>
      <ListingIntro eyebrow="Guided journeys" title="Motorcycle tours" description={description} />
      <section className="tour-list section-light"><div className="container">{tours.map((tour) => <TourRow key={tour.slug} tour={tour} />)}<Conversion title="Need a route built around you?" /></div></section>
    </Shell>
  )
}

export function TourDetailPage({ slug }: { slug: string }) {
  const tour = tours.find((item) => item.slug === slug)
  if (!tour) return <NotFoundPage />
  const destination = destinations.find((item) => item.slug === tour.destination)!
  const path = `/motorcycle-tours/${tour.slug}`
  const title = `${tour.name} | Guided Motorcycle Tour`
  return (
    <Shell>
      <JsonLd data={getTourSchema({ name: tour.name, description: tour.description, image: tour.image, path, areaServed: destination.name })} />
      <PageHero eyebrow={`${destination.name} · Guided motorcycle tour`} title={tour.name} description={tour.description} image={tour.image} />
      <section className="detail-section section-light">
        <div className="container">
          <Breadcrumbs items={[{ label: "Motorcycle tours", to: "/motorcycle-tours" }, { label: tour.name }]} />
          <div className="tour-facts"><div><small>Duration</small><strong>{tour.duration}</strong></div><div><small>Distance</small><strong>{tour.distance}</strong></div>{tour.ridingDays && <div><small>Riding days</small><strong>{tour.ridingDays}</strong></div>}{tour.season && <div><small>Best time</small><strong>{tour.season}</strong></div>}<div><small>Price</small><strong>{tour.price}</strong></div>{tour.ridingLevel && <div><small>Riding level</small><strong>{tour.ridingLevel}</strong></div>}<div><small>Format</small><strong>Guided journey</strong></div></div>
          <section className="journey-overview">
            <div className="journey-overview-copy">              
              <p className="eyebrow"><span />Journey overview</p>
              <h2>Designed for the quality of the ride.</h2>
              <p className="detail-lead">{tour.description}</p>
            </div>
            <aside className="journey-overview-panel">
              <div className="journey-panel-header"><small>Route highlights</small><span>{tour.highlights.length} defining moments</span></div>
              <ol className="journey-highlights">
                {tour.highlights.map((highlight, index) => <li key={highlight}><span>{String(index + 1).padStart(2, "0")}</span><strong>{highlight}</strong></li>)}
              </ol>
              <div className="journey-meta">
                {tour.terrain && <div><small>Terrain</small><strong>{tour.terrain}</strong></div>}
                {tour.dailyRide && <div><small>Daily rhythm</small><strong>{tour.dailyRide}</strong></div>}
                {tour.accommodation && <div><small>Stays</small><strong>{tour.accommodation}</strong></div>}
                {tour.groupSize && <div><small>Group</small><strong>{tour.groupSize}</strong></div>}
              </div>
            </aside>
          </section>
          {tour.departures && <section className="departure-section">
            <div className="departure-heading">
              <div><span className="section-index section-index-light">02 / Departures</span><p className="eyebrow eyebrow-light"><span />Fixed departures</p><h2>Choose your 2027 window.</h2></div>
              <div className="departure-price"><small>Package from</small><strong>{tour.price}</strong><span>Subject to availability</span></div>
            </div>
            <p className="departure-intro">Six small-group windows across the Himalayan riding season. Select a date to start an availability enquiry with the team.</p>
            <div className="departure-grid">
              {tour.departures.map((departure, index) => <article className="departure-card" key={departure}><span className="departure-number">{String(index + 1).padStart(2, "0")}</span><div><small>2027 departure</small><strong>{departure}</strong></div><a href="/custom-tours" aria-label={`Enquire about the ${departure} departure`}><Icon name="arrow" /></a></article>)}
            </div>
            {tour.priceNotes && <div className="tour-price-notes">{tour.priceNotes.map((note) => <small key={note}>{note}</small>)}</div>}
          </section>}
          <section className="itinerary-section">
            <div className="itinerary-heading"> <p className="eyebrow"><span />Tour itinerary</p><h2>The rhythm of the journey.</h2><p>This published itinerary is a planning guide. The final route remains subject to permits, weather, road access, and current operating conditions.</p><div className="itinerary-summary"><strong>{tour.duration}</strong><span>{tour.ridingDays || "Guided journey"}</span></div></div>
            <ol className="itinerary-list">
              {tour.itinerary.map((stage, index) => (
                <li key={stage.title}><span className="itinerary-day">{String(index + 1).padStart(2, "0")}</span><article><small>{stage.phase}</small><h3>{stage.title}</h3><p>{stage.description}</p></article></li>
              ))}
            </ol>
          </section>
          <section className="tour-map-section">
            <div><p className="eyebrow eyebrow-light"><span />Route picture</p><h2>A schematic view of the ride.</h2><p>The route illustration communicates the journey’s progression, not turn-by-turn navigation. Your confirmed itinerary governs the actual route.</p></div>
            <RouteMap stops={tour.mapStops} />
          </section>
          <section className="included-section">
            <div className="included-column"><span className="included-mark">+</span><h2>Included</h2><ul>{tour.includes.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <div className="included-column excluded"><span className="included-mark">−</span><h2>Not included</h2><ul>{tour.excludes.map((item) => <li key={item}>{item}</li>)}</ul></div>
          </section>
          <nav className="policy-links" aria-label="Booking policies">
            <span>Before booking</span>
            <a href="/terms-and-conditions">Terms & Conditions <Icon name="arrow" /></a>
            <a href="/payment-policy">Payment Policy <Icon name="arrow" /></a>
            <a href="/cancellation-and-refund">Cancellation & Refund <Icon name="arrow" /></a>
          </nav>
          <Conversion title={`Enquire about ${tour.name}`} />
        </div>
      </section>
    </Shell>
  )
}

export function FixedDeparturesPage() {
  return (
    <Shell>
      <ListingIntro eyebrow="Scheduled adventures" title="Fixed departures" description="Departure dates and operating conditions change. Choose a journey below and request the currently confirmed schedule directly from the team." />
      <section className="tour-list section-light"><div className="container">{tours.map((tour) => <TourRow key={tour.slug} tour={tour} />)}<Conversion title="Request current departure dates" /></div></section>
    </Shell>
  )
}

function EnquiryForm({ compact = false }: { compact?: boolean }) {
  const [submitted, setSubmitted] = useState(false)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = new FormData(event.currentTarget)
    const body = [...values.entries()].map(([key, value]) => `${key}: ${value}`).join("\n")
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Motorcycle tour proposal request")}&body=${encodeURIComponent(body)}`
    setSubmitted(true)
  }
  return (
    <form className={`enquiry-form ${compact ? "enquiry-form-light" : ""}`} onSubmit={submit}>
      <div className="form-row"><label>Your name<input required name="Name" autoComplete="name" /></label><label>Email address<input required type="email" name="Email" autoComplete="email" /></label></div>
      <div className="form-row"><label>Preferred destination<select required name="Destination" defaultValue=""><option value="" disabled>Choose a destination</option>{destinations.map((item) => <option key={item.slug}>{item.name}</option>)}<option>Not sure yet</option></select></label><label>Number of riders<input required min="1" type="number" name="Riders" /></label></div>
      <div className="form-row"><label>Travel dates<input name="Dates" placeholder="Month or date range" /></label><label>Tour duration<input name="Duration" placeholder="e.g. 10–14 days" /></label></div>
      <div className="form-row"><label>Riding experience<select name="Experience" defaultValue=""><option value="" disabled>Select experience</option><option>1–3 years</option><option>4–8 years</option><option>8+ years</option></select></label><label>Accommodation preference<select name="Accommodation" defaultValue=""><option value="" disabled>Select preference</option><option>Comfortable</option><option>Premium</option><option>Flexible</option></select></label></div>
      <label>Budget, requirements, or questions<textarea name="Message" rows={4} /></label>
      <button className="button button-primary form-submit" type="submit">Create email enquiry <Icon name="arrow" /></button>
      <p className="form-note">{submitted ? "Your email application should now be open. Review the message and press send." : "This opens a prepared email in your email application. No information is stored by this website."}</p>
    </form>
  )
}

function Conversion({ title }: { title: string }) {
  return <section className="conversion"><div><small>Start a conversation</small><h2>{title}</h2></div><a className="button button-primary" href="/custom-tours">Plan your ride <Icon name="arrow" /></a></section>
}

export function CustomToursPage() {
  return (
    <Shell>
      <PageHero eyebrow="Private journeys" title="Your road. Your pace." description="Tell us what you want from the ride. The team will review your request and respond with a proposal—not an automated booking confirmation." image="/images/desert-ride.webp" />
      <section className="form-page section-sand"><div className="container form-page-grid"><div><Breadcrumbs items={[{ label: "Custom tours" }]} /><p className="eyebrow"><span />Shape the journey</p><h2>Built around your group.</h2><p>Share your dates, riding experience, destination ideas, accommodation preferences, and optional budget. Exact routes remain subject to current access and permissions.</p></div><EnquiryForm compact /></div></section>
    </Shell>
  )
}

export function ContactPage() {
  return (
    <Shell>
      <ListingIntro eyebrow="Talk to a rider" title="Contact us" description="Ask about a tour, current departure dates, riding requirements, or a private itinerary." />
      <section className="contact-page section-light"><div className="container contact-grid">
        <div className="contact-details">
          <div><small>Company</small><strong>{siteConfig.legalName}</strong></div>
          <div><small>Telephone</small><a href={siteConfig.phoneLinks[0]}>{siteConfig.phones[0]}</a><a href={siteConfig.phoneLinks[1]}>{siteConfig.phones[1]}</a></div>
          <div><small>Email</small><a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a><a href={`mailto:${siteConfig.alternateEmail}`}>{siteConfig.alternateEmail}</a></div>
          <div><small>Office</small><address>{siteConfig.address.streetAddress}, {siteConfig.address.addressLocality}, {siteConfig.address.postalCode}, India.</address></div>
        </div>
        <EnquiryForm compact />
      </div></section>
    </Shell>
  )
}

export function AboutPage() {
  return (
    <Shell>
      <PageHero eyebrow="By the motorcyclist, for the motorcyclist" title="The road is personal." description="We believe a memorable motorcycle journey is built on local knowledge, practical support, and genuine camaraderie." image="/images/rider-road.webp" />
      <section className="detail-section section-light"><div className="container"><Breadcrumbs items={[{ label: "About" }]} /><div className="detail-grid"><div><p className="eyebrow"><span />Our philosophy</p><h2>India, experienced from the saddle.</h2></div><div className="prose"><p>Legendary Moto Rides creates guided Royal Enfield adventures, fixed departures, private tours, and customized motorcycle holidays across India and selected Himalayan destinations.</p><p>Every proposal is shaped around the road, the season, the group, and current local conditions. The aim is not simply to cover distance, but to create the time and support needed to experience the landscapes and communities along the way.</p></div></div>
        <section className="team-section">
          <div className="team-heading"><div><p className="eyebrow"><span />Meet the team</p><h2>Riders, planners,<br />and problem-solvers.</h2></div><p>The people behind every route—from the first conversation in Delhi to the road captain and mechanic beside you in the mountains.</p></div>
          <div className="team-grid">{teamMembers.map((member, index) => <article className={`team-card ${index < 3 ? "team-card-featured" : ""}`} key={member.name}><div className="team-portrait">{member.image ? <img src={member.image} alt={member.name} loading="lazy" /> : <span>{member.name.split(" ").map((part) => part[0]).join("")}</span>}<small>{String(index + 1).padStart(2, "0")}</small></div><div className="team-copy"><span>{member.role}</span><h3>{member.name}</h3><p>{member.bio}</p></div></article>)}</div>
        </section>
        <Conversion title="Ride with Legendary Moto Rides" /></div></section>
    </Shell>
  )
}

function joinTourHref(tour: { name: string; dates: string }) {
  const params = new URLSearchParams({ tour: tour.name, dates: tour.dates })
  return `/join-tour?${params.toString()}`
}

export function TourCalendarPage() {
  const totalDepartures = calendarMonths.reduce((total, month) => total + month.tours.length, 0)
  const description = "Explore the 2027 fixed-departure motorcycle tour calendar for India and the Himalayas."
  return (
    <Shell>
      <ListingIntro eyebrow="2027 departures" title="Tour calendar" description={description} />
      <section className="calendar-section section-light">
        <div className="container">
          <div className="calendar-overview"><div><span>2027</span><strong>{totalDepartures} departures</strong></div><p>Open a month, compare the departures, and join the ride that fits.</p></div>
          <div className="calendar-months">
            {calendarMonths.map((month, monthIndex) => (
              <details className="calendar-month" key={month.month} open={monthIndex === 0}>
                <summary><span>{String(monthIndex + 1).padStart(2, "0")}</span><strong>{month.month}</strong><small>{month.tours.length} departures</small><i>+</i></summary>
                <div className="calendar-tours">
                  {month.tours.map((tour) => (
                    <article className="calendar-tour" key={`${tour.dates}-${tour.name}`}>
                      <div className="calendar-date"><small>Departure</small><strong>{tour.dates}</strong></div>
                      <div className="calendar-name"><small>{tour.duration}</small><h3>{tour.name}</h3><p>{tour.description}</p></div>
                      <div className="calendar-price"><span><small>Rider</small><strong>{tour.rider}</strong></span><span><small>Pillion</small><strong>{tour.pillion}</strong></span></div>
                      <a className="calendar-join" href={joinTourHref(tour)}>Join tour <Icon name="arrow" size={16} /></a>
                    </article>
                  ))}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}

function JoinTourForm() {
  const params = useSearchParams()
  const tour = params.get("tour") ?? ""
  const dates = params.get("dates") ?? ""
  const [message, setMessage] = useState("")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const values = Object.fromEntries(new FormData(event.currentTarget).entries())
    const response = await fetch("/api/join-tour", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    })
    const result = (await response.json().catch(() => null)) as { forwarded?: boolean; message?: string } | null
    if (!response.ok) {
      setMessage(result?.message || "Check the form and try again.")
      return
    }
    if (result?.forwarded) {
      setMessage("The team has your request and will confirm the departure.")
      return
    }
    const body = Object.entries(values).map(([key, value]) => `${key}: ${value || "Not provided"}`).join("\n")
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(`Join Tour: ${values.tour || "Departure"}`)}&body=${encodeURIComponent(body)}`
    setMessage("Your email app should open with the Join Tour request. Review it and press send.")
  }

  return (
    <form className="enquiry-form enquiry-form-light" key={`${tour}-${dates}`} onSubmit={submit}>
      <div className="form-row"><label>Your name<input required name="name" autoComplete="name" /></label><label>Email address<input required type="email" name="email" autoComplete="email" /></label></div>
      <div className="form-row"><label>Phone<input name="phone" autoComplete="tel" /></label><label>Number of riders<input required min="1" type="number" name="riders" defaultValue="1" /></label></div>
      <div className="form-row"><label>Tour<input required name="tour" defaultValue={tour} /></label><label>Departure<input required name="dates" defaultValue={dates} /></label></div>
      <label>Anything the team should know?<textarea name="message" rows={4} /></label>
      <button className="button button-primary form-submit" type="submit">Join tour <Icon name="arrow" /></button>
      <p className="form-note">{message || "Request a place on this departure. The team confirms availability before anything is booked."}</p>
    </form>
  )
}

export function JoinTourPage() {
  return (
    <Shell>
      <ListingIntro eyebrow="Fixed departures" title="Join Tour" description="Choose a published departure and send a place request. The team confirms availability, the motorcycle, and the written proposal." />
      <section className="form-page section-sand">
        <div className="container form-page-grid">
          <div>
            <p className="eyebrow"><span />Reserve a place</p>
            <h2>Tell us which ride.</h2>
            <p>Share who is coming and which departure you want. This request is not a confirmed booking.</p>
          </div>
          <Suspense fallback={<p className="form-note">Loading the form.</p>}>
            <JoinTourForm />
          </Suspense>
        </div>
      </section>
    </Shell>
  )
}

export function GuidesPage() {
  const description = "Useful preparation, honest observations, and rider-focused thinking for the altitude, climate, motorcycles, and rhythm of India."
  return (
    <Shell>
      <PageHero eyebrow="Insights" title="Stories for the road" description={description} image="/images/rider-road.webp" />
      <section className="insights-page page-section section-light">
        <div className="container">
          <Breadcrumbs items={[{ label: "Insights" }]} />
          <div className="insight-grid">
            {articles.map((article, index) => (
              <a className="insight-card" href={`/insights/${article.slug}`} key={article.slug}>
                <img src={article.image} alt="" />
                <div>
                  <small>Insight 0{index + 1}</small>
                  <h3>{article.title}</h3>
                  <p>{article.description}</p>
                  <strong>Read article <Icon name="arrow" /></strong>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}

export function GalleryPage() {
  const description = "A look at the roads, deserts, and high valleys ridden with Legendary Moto Rides."
  return (
    <Shell>
      <PageHero eyebrow="From the road" title="Gallery" description={description} image="/images/desert-ride.webp" />
      <section className="gallery-page page-section section-light">
        <div className="container">
          <Breadcrumbs items={[{ label: "Gallery" }]} />
          <div className="gallery-grid">
            {galleryImages.map((image) => (
              <figure className="gallery-card" key={image.src}>
                <img src={image.src} alt={image.alt} />
                <figcaption>{image.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}

export function GuideDetailPage({ slug }: { slug: string }) {
  const article = articles.find((item) => item.slug === slug)
  if (!article) return <NotFoundPage />
  const path = `/insights/${article.slug}`
  return (
    <Shell>
      <JsonLd data={getArticleSchema({ title: article.title, description: article.description, image: article.image, path })} />
      <PageHero eyebrow="Insights" title={article.title} description={article.description} image={article.image} />
      <article className="article section-light"><div className="article-inner"><Breadcrumbs items={[{ label: "Insights", to: "/insights" }, { label: article.title }]} />{article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}<aside>Always confirm current road conditions, permits, inclusions, and equipment directly with the tour team before travel.</aside>
      
      </div></article>
     
    </Shell>
    
  )
}

const policies = {
  terms: {
    title: "Terms & Conditions",
    description: "General terms for enquiring about and booking a Legendary Moto Rides motorcycle journey.",
    sections: [
      ["Booking basis", "A website enquiry is not a confirmed booking. A booking becomes binding only when Legendary Moto Rides issues written confirmation and the payment requirements in that specific proposal have been met."],
      ["Tour information", "Routes, dates, prices, motorcycle models, accommodation, and inclusions can change with availability, road conditions, weather, permits, and local restrictions. Your written proposal and booking confirmation are the controlling documents."],
      ["Rider responsibility", "Riders are responsible for holding the licences, visas, insurance, fitness, and riding experience required for their confirmed journey. Follow road-captain instructions and applicable local law throughout the tour."],
      ["Changes and safety", "The team may alter a route, timing, accommodation, or activity when reasonably required for safety, weather, road access, or operating conditions."],
      ["Questions before payment", `Ask for the complete current terms for your proposed tour before making a payment. Contact ${siteConfig.email} if any part of the proposal is unclear.`],
    ],
  },
  payment: {
    title: "Payment Policy",
    description: "How payment details are communicated and confirmed for Legendary Moto Rides tours.",
    sections: [
      ["Written proposal first", "The current price, currency, deposit, balance schedule, and accepted payment method must be stated in the written proposal or invoice issued for your specific tour."],
      ["Do not rely on old pricing", "Website pages, archived messages, and previous-season quotations may not reflect current operating costs or availability. Request an updated written quotation before paying."],
      ["Payment confirmation", "A payment is not treated as received until Legendary Moto Rides confirms receipt. Keep your transaction record and the corresponding invoice or proposal."],
      ["Bank and card charges", "Unless your written proposal says otherwise, charges imposed by banks, card issuers, payment platforms, or currency conversion providers remain the payer’s responsibility."],
      ["Payment safety", `Use only payment instructions issued through the official contact details shown on this website. Verify unexpected changes by calling ${siteConfig.phones[0]} or ${siteConfig.phones[1]}.`],
    ],
  },
  cancellation: {
    title: "Cancellation & Refund",
    description: "How tour-specific cancellation and refund terms are confirmed before booking.",
    sections: [
      ["Tour-specific terms apply", "Cancellation deadlines, retained deposits, supplier charges, and refund eligibility depend on the written terms supplied for the specific departure or private tour."],
      ["Request cancellation in writing", `Send cancellation requests to ${siteConfig.email}. A request is recorded when the team acknowledges it in writing.`],
      ["Non-refundable suppliers", "Some permits, accommodation, transport, motorcycle arrangements, or other third-party services may become non-refundable once booked. Any applicable amounts should be identified in your proposal."],
      ["Changes outside reasonable control", "Weather, road closures, border restrictions, government action, and similar events may require an altered route or schedule. The options available depend on recoverable supplier costs and the terms of the confirmed booking."],
      ["Travel insurance", "Travel insurance should be appropriate for motorcycle touring, medical treatment, cancellation, interruption, and the destinations included in the itinerary."],
    ],
  },
  privacy: {
    title: "Privacy Policy",
    description: "How Legendary Moto Rides handles information supplied through enquiries and tour arrangements.",
    sections: [
      ["Information you provide", "The business may process contact details, travel preferences, riding experience, booking information, and details you voluntarily provide when requesting or arranging a tour."],
      ["How it is used", "Information is used to respond to enquiries, prepare proposals, arrange tour services, communicate updates, process bookings, and meet legal or operational obligations."],
      ["Service partners", "Relevant information may be shared with providers involved in a confirmed journey, such as accommodation, payment, logistics, and technology providers, where necessary to supply the service."],
      ["Your choices", `You can request access, correction, or deletion where applicable by emailing ${siteConfig.email}. Marketing consent can be withdrawn at any time.`],
      ["Sensitive details", "Do not submit passport, payment-card, or medical information through the general website enquiry form. The team will explain an appropriate process if those details become necessary."],
    ],
  },
} as const

function PolicyPage({ policy }: { policy: (typeof policies)[keyof typeof policies] }) {
  return (
    <Shell>
      <ListingIntro eyebrow="Booking information" title={policy.title} description={policy.description} />
      <article className="policy-page section-light">
        <div className="policy-inner">
          <div className="policy-notice"><Icon name="shield" /><p>This page is a clear website summary. The written proposal and booking terms issued for your specific tour contain the applicable commercial details.</p></div>
          {policy.sections.map(([heading, body], index) => <section key={heading}><span>0{index + 1}</span><div><h2>{heading}</h2><p>{body}</p></div></section>)}
          <Conversion title="Need a policy clarified?" />
        </div>
      </article>
    </Shell>
  )
}

export function TermsPage() {
  return <PolicyPage policy={policies.terms} />
}

export function PaymentPolicyPage() {
  return <PolicyPage policy={policies.payment} />
}

export function CancellationPage() {
  return <PolicyPage policy={policies.cancellation} />
}

export function PrivacyPage() {
  return <PolicyPage policy={policies.privacy} />
}

export function NotFoundPage() {
  return (
    <Shell>
      <section className="not-found section-dark"><div className="container"><span>404</span><h1>This road ends here.</h1><p>The page may have moved, but the next journey is easy to find.</p><a className="button button-primary" href="/">Return home <Icon name="arrow" /></a></div></section>
    </Shell>
  )
}
