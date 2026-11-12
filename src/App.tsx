"use client"

import { FormEvent, useState } from "react"
import Footer from "./components/Footer"
import Header from "./components/Header"
import MoveToTop from "./components/MoveToTop"
import { Icon } from "./icons"
import { getFaqSchema, serializeSchema } from "./lib/schema"
import { siteConfig } from "./lib/site-config"

const destinations = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "The high Himalayas",
    image: "/images/ladakh.webp",
    alt: "High-altitude mountain road winding through Ladakh",
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "The desert kingdoms",
    image: "/images/rajasthan.webp",
    alt: "Amber Fort rising over the rugged landscape of Rajasthan",
  },
  {
    slug: "south-india",
    name: "South India",
    region: "Spice roads & coastlines",
    image: "/images/south-india.webp",
    alt: "A winding road through palm forest in South India",
  },
]

const tours = [
  {
    slug: "the-grand-ladakh-ride",
    title: "The Grand Ladakh Ride",
    place: "Ladakh · High Himalayas",
    duration: "12 days",
    distance: "1,300 km",
    image: "/images/rider-road.webp",
    alt: "Motorcyclist riding a high mountain road",
  },
  {
    slug: "regal-rajasthan",
    title: "Regal Rajasthan",
    place: "Rajasthan · North India",
    duration: "14 days",
    distance: "1,650 km",
    image: "/images/desert-ride.webp",
    alt: "Motorcycle crossing a desert road with mountains beyond",
  },
  {
    slug: "stunning-south-india",
    title: "Stunning South India",
    place: "Karnataka · Kerala · Tamil Nadu",
    duration: "11 days",
    distance: "1,250 km",
    image: "/images/south-india.webp",
    alt: "Tropical road winding beneath palms",
  },
]

const faqs = [
  [
    "Do I need to bring my own motorcycle?",
    "No. Our guided journeys can include a Royal Enfield motorcycle. The exact model, support arrangements, and what is included are confirmed in your tour proposal.",
  ],
  [
    "How experienced do I need to be?",
    "Riding demands vary by route. Tell us about your road, off-road, and high-altitude experience and we will help you choose an appropriate journey.",
  ],
  [
    "Can you create a private itinerary?",
    "Yes. Private and customized motorcycle holidays can be designed around your preferred destination, dates, group size, pace, and accommodation style.",
  ],
  [
    "When are Himalayan routes open?",
    "Opening dates depend on snow, weather, road conditions, and local permissions. We verify operating conditions before confirming a high-altitude itinerary.",
  ],
]

function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode
  light?: boolean
}) {
  return (
    <p className={light ? "eyebrow eyebrow-light" : "eyebrow"}>
      <span />
      {children}
    </p>
  )
}

function App() {
  const [sent, setSent] = useState(false)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const fields = [
      "name",
      "email",
      "destination",
      "riders",
      "dates",
      "experience",
      "message",
    ]
    const body = fields
      .map(
        (field) =>
          `${field[0].toUpperCase() + field.slice(1)}: ${form.get(field) || "Not provided"}`,
      )
      .join("\n")
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent("Custom motorcycle tour enquiry")}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return (
    <div id="top">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeSchema(getFaqSchema(faqs)) }}
      />
      <Header variant="home" />
      <main>
        <section className="hero" aria-labelledby="hero-title">
          <img
            className="hero-image"
            src="/images/hero-rider.webp"
            alt="Motorcyclist riding through a dramatic Himalayan valley"
            fetchPriority="high"
          />
          <div className="hero-overlay" />
          <div className="hero-content container">
            <Eyebrow light>India · Himalayas · Beyond</Eyebrow>
            <h1 id="hero-title">
              The world is better
              <br />
              when you <em>ride it.</em>
            </h1>
            <div className="hero-bottom">
              <p>
                Discover India’s most extraordinary roads with experienced local
                riders. High passes, desert kingdoms, tropical coastlines, and
                the hidden roads between.
              </p>
              <div className="hero-actions">
                <a className="button button-primary" href="#tours">
                  Explore motorcycle tours <Icon name="arrow" size={19} />
                </a>
                <a className="text-link light-link" href="#enquire">
                  Plan your ride <Icon name="arrow" size={18} />
                </a>
              </div>
            </div>
          </div>
         
        </section>

        <section className="intro section-light">
          <div className="container">
            <div className="rider-manifesto">
              <div className="manifesto-topline">
                <span>01 / Our philosophy</span>
                <span>Delhi · India · Since 2009</span>
              </div>
              <div className="manifesto-grid">
                <div className="manifesto-title">
                  <Eyebrow light>By the motorcyclist, for the motorcyclist</Eyebrow>
                  <h2 className="manifesto-title">
                    We don’t just show
                    <br />
                    you India. <em>We ride it</em>
                    <br />
                    <em>with you.</em>
                  </h2>
                </div>
                <div className="manifesto-copy">
                  <p className="lead">
                    From the cold-desert roads of Ladakh to the palaces of
                    Rajasthan and Kerala’s tropical backwaters, every journey is
                    shaped by riders who know the road, the rhythm, and the
                    places worth stopping for.
                  </p>
                  <a className="text-link light-link" href="#story">
                    Discover our story <Icon name="arrow" size={18} />
                  </a>
                </div>
              </div>
              <div className="manifesto-proof">
                <div><strong>2009</strong><span>Founded in India</span></div>
                <div><strong>Rider-led</strong><span>Journeys, not packages</span></div>
                <div><strong>Local</strong><span>Knowledge on every road</span></div>
                <div><strong>Supported</strong><span>From arrival to farewell</span></div>
              </div>
            </div>
          </div>
        </section>

        <section className="destinations section-light" id="destinations">
          <div className="container">
            <div className="section-heading">
              <div>
                <Eyebrow>Choose your horizon</Eyebrow>
                <h2>
                  Where will the road
                  <br />
                  take you?
                </h2>
              </div>
              <p>
                India is not one landscape, but a thousand worlds connected by
                remarkable roads. Choose a direction. We’ll handle the details.
              </p>
            </div>
            <div className="destination-grid">
              {destinations.map((destination, index) => (
                <a
                  className={`destination-card destination-${index + 1}`}
                  href={`/destinations/${destination.slug}`}
                  key={destination.name}
                >
                  <img
                    src={destination.image}
                    alt={destination.alt}
                    loading="lazy"
                  />
                  <div className="image-shade" />
                  <span className="card-number">0{index + 1}</span>
                  <div className="destination-copy">
                    <small>{destination.region}</small>
                    <h3>{destination.name}</h3>
                    <span className="card-action">
                      Explore destination <Icon name="arrow" size={18} />
                    </span>
                  </div>
                </a>
              ))}
            </div>
            <div className="more-destinations">
              <span>Also riding</span>
              <p>
                Spiti Valley <i /> Himachal Pradesh <i /> Uttarakhand <i /> Goa{" "}
                <i /> Nepal <i /> Bhutan <i /> Tibet
              </p>
            </div>
          </div>
        </section>

        <section className="tours section-dark" id="tours">
          <div className="container">
            <div className="section-heading heading-dark">
              <div>
                <Eyebrow light>Featured journeys</Eyebrow>
                <h2>
                  Routes worth
                  <br />
                  <em>remembering.</em>
                </h2>
              </div>
              <a className="text-link light-link" href="#enquire">
                Find your tour <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="tour-grid">
              {tours.map((tour, index) => (
                <article className="tour-card" key={tour.title}>
                  <a className="tour-image" href={`/motorcycle-tours/${tour.slug}`}>
                    <img src={tour.image} alt={tour.alt} loading="lazy" />
                    <span>0{index + 1}</span>
                  </a>
                  <div className="tour-copy">
                    <small>{tour.place}</small>
                    <h3>
                      <a href={`/motorcycle-tours/${tour.slug}`}>{tour.title}</a>
                    </h3>
                    <div className="tour-meta">
                      <span>{tour.duration}</span>
                      <i />
                      <span>{tour.distance}</span>
                      <i />
                      <span>Guided</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="availability-note">
              Routes, prices, departure dates, and permissions are confirmed
              individually before booking.
            </p>
          </div>
        </section>

        <section className="story section-sand" id="story">
          <div className="container story-grid">
            <div className="story-image-wrap">
              <img
                src="/images/rider-road.webp"
                alt="A rider crossing the Himalayas on a motorcycle"
                loading="lazy"
              />
              <div className="story-caption">
                <span>Based in</span>
                <strong>INDIA</strong>
                <small>Riding beyond</small>
              </div>
            </div>
            <div className="story-copy">
              <Eyebrow>The Legendary difference</Eyebrow>
              <h2>
                Local knowledge.
                <br />
                Real <em>camaraderie.</em>
              </h2>
              <p>
                Great motorcycle travel is about more than reaching the next
                hotel. It’s the chai stop you didn’t plan, the road captain who
                reads the mountain, and the shared stories after a long day in
                the saddle.
              </p>
              <div className="feature-list">
                <div>
                  <Icon name="helmet" />
                  <span>
                    <strong>Rider-led journeys</strong>
                    <small>
                      Experienced road captains who understand motorcycles and
                      India.
                    </small>
                  </span>
                </div>
                <div>
                  <Icon name="route" />
                  <span>
                    <strong>Routes with character</strong>
                    <small>
                      Landscapes, culture, and roads chosen for the quality of
                      the ride.
                    </small>
                  </span>
                </div>
                <div>
                  <Icon name="shield" />
                  <span>
                    <strong>Support on the road</strong>
                    <small>
                      Thoughtful planning and practical support from arrival to
                      farewell.
                    </small>
                  </span>
                </div>
              </div>
              <a className="button button-dark" href="#enquire">
                Talk to a rider <Icon name="arrow" size={19} />
              </a>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <div className="container">
            <div className="testimonial-heading">
              <div><Eyebrow light>Words from the road</Eyebrow><h2>Stories carried<br /><em>home.</em></h2></div>
              <p>Genuine reflections published by riders who travelled with Legendary Moto Rides.</p>
            </div>
            <div className="testimonial-grid">
              <article className="testimonial-feature">
                <span>01</span>
                <blockquote>“Great riding, historic forts, excellent accommodation and four brilliant lads to look after us. We are returning to do the Himalayas trip.”</blockquote>
                <div className="quote-credit"><strong>Peter Gasson</strong><span>Australia · Rajasthan rider</span></div>
              </article>
              <div className="testimonial-stack">
                <article><span>02</span><p>“Everything was sorted for us, and we saw unforgettable sights and had experiences we wouldn’t otherwise have had.”</p><div className="quote-credit"><strong>Nenad J</strong><span>Australia · Himalayan tour</span></div></article>
                <article><span>03</span><p>“Thank you Team LMR for making our trip full of awesome memories. We had an incredible time in incredible India.”</p><div className="quote-credit"><strong>Philip</strong><span>Canada · Rajasthan tour</span></div></article>
              </div>
            </div>
            <a className="testimonial-source" href={siteConfig.socialLinks[0].url} target="_blank" rel="noreferrer">Read more traveller feedback on Tripadvisor <Icon name="arrow" /></a>
          </div>
        </section>

        <section className="journal section-light" id="journal">
          <div className="container">
            <div className="section-heading">
              <div>
                <Eyebrow>Field notes</Eyebrow>
                <h2>
                  Know before
                  <br />
                  you <em>go.</em>
                </h2>
              </div>
              <p>
                Practical guidance for riders preparing for India’s climate,
                altitude, roads, and pace.
              </p>
            </div>
            <div className="journal-grid">
              <article className="journal-feature">
                <img
                  src="/images/ladakh.webp"
                  alt="Ladakh mountains and a high-altitude road"
                  loading="lazy"
                />
                <div>
                  <small>Himalayan riding guide</small>
                  <h3>Preparing for the high roads of Ladakh</h3>
                  <a className="text-link" href="#faq">
                    Read the insight <Icon name="arrow" size={18} />
                  </a>
                </div>
              </article>
              <div className="journal-list">
                <a href="#faq">
                  <span>Planning</span>
                  <strong>What to pack for a motorcycle tour in India</strong>
                  <Icon name="arrow" />
                </a>
                <a href="#faq">
                  <span>On the road</span>
                  <strong>Riding Royal Enfield motorcycles in India</strong>
                  <Icon name="arrow" />
                </a>
                <a href="#faq">
                  <span>Destinations</span>
                  <strong>High Himalayas or desert roads?</strong>
                  <Icon name="arrow" />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="faq section-light" id="faq">
          <div className="container faq-grid">
            <div>
              <Eyebrow>Good to know</Eyebrow>
              <h2>
                Questions from
                <br />
                fellow <em>riders.</em>
              </h2>
              <p>
                Still curious? Our team is happy to talk through the details.
              </p>
              <a className="text-link" href={`mailto:${siteConfig.email}`}>
                Ask us anything <Icon name="arrow" size={18} />
              </a>
            </div>
            <div className="faq-list">
              {faqs.map(([question, answer]) => (
                <details key={question}>
                  <summary>
                    {question}
                    <span>+</span>
                  </summary>
                  <p>{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

         
      </main>

      <Footer />
      <MoveToTop />
    </div>
  )
}

export default App
