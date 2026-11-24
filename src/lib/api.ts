import { cache } from "react"
import { notFound } from "next/navigation"
import {
  DEPARTURES_QUERY, DESTINATIONS_QUERY, FAQS_QUERY, INSIGHTS_QUERY, PAGE_SELECTIONS, REVIEWS_QUERY,
  SETTINGS_QUERY, SLUGS_QUERY, TEAM_QUERY, TOURS_QUERY, VIDEOS_QUERY,
} from "./queries"
import type {
  Cta, Departure, Destination, Faq, HeadingBlock, Hero, Img, Insight, IntroBlock, Panel, Review, Seo,
  SiteSettings, TeamMember, Tour, Video,
} from "./types"
import { decode } from "./format"
import { gql } from "./wp"

const list = <T,>(value: T[] | null | undefined): T[] => (Array.isArray(value) ? value : [])

/* ---------- Site settings ---------- */
export const getSettings = cache(async () => {
  const data = await gql<{ siteSettings: { siteSettingsData: SiteSettings } }>(SETTINGS_QUERY)
  return data.siteSettings.siteSettingsData
})

/* ---------- Collections ---------- */
type RawDestination = { slug: string; title: string; destinationFields: Omit<Destination, "slug" | "title"> }
export const getDestinations = cache(async (): Promise<Destination[]> => {
  const data = await gql<{ destinations: RawDestination[] }>(DESTINATIONS_QUERY)
  return list(data.destinations).map((d) => ({ slug: d.slug, title: decode(d.title), ...d.destinationFields, relatedTours: list(d.destinationFields.relatedTours) }))
})

type RawTour = { slug: string; title: string; tourCategories: { slug: string; name: string }[] | null; tourFields: Omit<Tour, "slug" | "title" | "destination" | "categories"> & { destination: { slug: string; title: string }[] | null } }
export const getTours = cache(async (): Promise<Tour[]> => {
  const data = await gql<{ tours: RawTour[] }>(TOURS_QUERY)
  return list(data.tours).map((t) => ({ slug: t.slug, title: decode(t.title), ...t.tourFields, categories: list(t.tourCategories).map((c) => ({ slug: c.slug, name: decode(c.name) })), destination: list(t.tourFields.destination)[0] ? { slug: list(t.tourFields.destination)[0].slug, title: decode(list(t.tourFields.destination)[0].title) } : null }))
})

type RawInsight = { slug: string; title: string; insightFields: Omit<Insight, "slug" | "title"> }
export const getInsights = cache(async (): Promise<Insight[]> => {
  const data = await gql<{ insights: RawInsight[] }>(INSIGHTS_QUERY)
  return list(data.insights).map((a) => ({ slug: a.slug, title: decode(a.title), ...a.insightFields }))
})

export const getDepartures = cache(async (): Promise<Departure[]> => {
  const data = await gql<{ departures: { departureFields: Departure }[] }>(DEPARTURES_QUERY)
  return list(data.departures).map((d) => d.departureFields).sort((a, b) => a.startDate.localeCompare(b.startDate))
})

export const getTeam = cache(async (): Promise<TeamMember[]> => {
  const data = await gql<{ teamMembers: { title: string; teamMemberFields: Omit<TeamMember, "title"> }[] }>(TEAM_QUERY)
  return list(data.teamMembers).map((m) => ({ title: decode(m.title), ...m.teamMemberFields }))
})

export const getFaqs = cache(async (): Promise<Faq[]> => {
  const data = await gql<{ faqs: { title: string; faqFields: { answer: string } }[] }>(FAQS_QUERY)
  return list(data.faqs).map((f) => ({ question: decode(f.title), answer: f.faqFields.answer }))
})

export const getReviews = cache(async (): Promise<Review[]> => {
  const data = await gql<{ testimonials: { testimonialFields: Review }[] }>(REVIEWS_QUERY)
  return list(data.testimonials).map((t) => t.testimonialFields)
})

export const getVideos = cache(async (): Promise<Video[]> => {
  const data = await gql<{ videoTestimonials: { title: string; videoTestimonialFields: Omit<Video, "title"> }[] }>(VIDEOS_QUERY)
  return list(data.videoTestimonials).map((v) => ({ title: decode(v.title), ...v.videoTestimonialFields }))
})

export async function getDestination(slug: string) {
  const found = (await getDestinations()).find((d) => d.slug === slug)
  if (!found) notFound()
  return found
}
export async function getTour(slug: string) {
  const found = (await getTours()).find((t) => t.slug === slug)
  if (!found) notFound()
  return found
}
export async function getInsight(slug: string) {
  const found = (await getInsights()).find((a) => a.slug === slug)
  if (!found) notFound()
  return found
}

export const getAllSlugs = cache(async () => {
  const data = await gql<{ destinations: { slug: string }[]; tours: { slug: string }[]; insights: { slug: string }[] }>(SLUGS_QUERY)
  return { destinations: list(data.destinations), tours: list(data.tours), insights: list(data.insights) }
})

/* ---------- Page content ---------- */
async function loadPage<T>(slug: string, selection: string): Promise<T> {
  const { group, fields } = PAGE_SELECTIONS[selection]
  const data = await gql<{ page: Record<string, T> | null }>(`{ page(id: "${slug}", idType: URI) { ${group} { ${fields} } } }`)
  const content = data.page?.[group]
  if (!content) throw new Error(`No WordPress content found for page "${slug}". Run the seed or fill in its custom fields.`)
  return content
}

type Base = { seo: Seo }
export type HomePageData = Base & {
  hero: Hero
  philosophy: { toplineLeft: string; toplineRight: string; eyebrow: string; title: string; lead: string; linkLabel: string; linkUrl: string; proof: { value: string; label: string }[] }
  destinations: {
    heading: HeadingBlock
    alsoRidingLabel: string
    featured: { subtitle: string; destination: { slug: string; title: string; destinationFields: { region: string; image: Img } }[] }[]
  }
  tours: {
    heading: HeadingBlock
    guidedLabel: string
    availabilityNote: string
    featured: { tour: { slug: string; title: string; tourFields: { place: string; duration: string; distance: string; image: Img } }[] }[]
  }
  story: { image: Img; captionTop: string; captionMain: string; captionBottom: string; eyebrow: string; title: string; body: string; features: { icon: "helmet" | "route" | "shield" | "mail" | "phone"; title: string; text: string }[]; buttonLabel: string; buttonUrl: string }
  testimonials: { heading: HeadingBlock; reviewLabel: string }
  videos: { heading: HeadingBlock; sourceLabel: string; sourceUrl: string }
  journal: {
    heading: HeadingBlock
    featuredKicker: string
    featuredLinkLabel: string
    featuredArticle: { slug: string; title: string; insightFields: { image: Img } }[]
    list: { label: string; title: string; url: string }[]
  }
  faq: { eyebrow: string; title: string; intro: string; linkLabel: string; linkUrl: string; count: number }
}
export type DestinationsPageData = Base & {
  breadcrumbLabel: string
  hero: Hero
  grid: IntroBlock
  callout: { title: string; text: string }
  detail: { heroTitlePrefix: string; sectionEyebrow: string; sectionTitle: string; seasonLabel: string; terrainLabel: string; planningLabel: string; planningText: string; relatedLabel: string; ctaKicker: string; ctaTitle: string; ctaButtonLabel: string; ctaButtonUrl: string }
}
export type ToursPageData = Base & {
  intro: IntroBlock
  cta: Cta
  detail: Record<
    | "breadcrumbLabel" | "heroEyebrowSuffix" | "durationLabel" | "distanceLabel" | "ridingDaysLabel" | "seasonLabel" | "priceLabel"
    | "overviewEyebrow" | "overviewTitle" | "highlightsLabel" | "highlightsCountSuffix" | "terrainLabel" | "dailyLabel" | "staysLabel"
    | "groupLabel" | "departuresIndex" | "departuresEyebrow" | "departuresTitle" | "departuresIntro" | "packageLabel" | "availabilityLabel"
    | "departureCardLabel" | "departureEnquireLabel" | "departureUrl" | "itineraryEyebrow" | "itineraryTitle" | "itineraryText"
    | "itineraryFallback" | "mapEyebrow" | "mapTitle" | "mapText" | "includedTitle" | "excludedTitle" | "policyLabel"
    | "ctaKicker" | "ctaTitle" | "ctaButtonLabel" | "ctaButtonUrl",
    string
  > & { policyLinks: { label: string; url: string }[] }
}
export type IntroCtaPageData = Base & { intro: IntroBlock; cta: Cta }
export type IntroPageData = Base & { intro: IntroBlock }
export type TourCalendarPageData = Base & {
  intro: IntroBlock
  overview: { year: string; departuresSuffix: string; text: string }
  labels: { departure: string; rider: string; pillion: string; join: string; joinUrl: string }
}
export type JoinTourPageData = Base & { intro: IntroBlock; panel: Panel }
export type CustomToursPageData = Base & { breadcrumbLabel: string; hero: Hero; panel: Panel }
export type AboutPageData = Base & {
  breadcrumbLabel: string
  hero: Hero
  philosophy: { eyebrow: string; title: string; paragraphs: { text: string }[] }
  teamHeading: HeadingBlock
  cta: Cta
}
export type InsightsPageData = Base & { breadcrumbLabel: string; hero: Hero; cardLabel: string; readLabel: string; detail: { heroEyebrow: string; disclaimer: string } }
export type GalleryPageData = Base & { breadcrumbLabel: string; hero: Hero; images: { caption: string; image: Img }[] }
export type FaqPageData = Base & { breadcrumbLabel: string; hero: Hero; more: { beforeEmail: string; between: string; linkLabel: string; linkUrl: string } }
export type PolicyPageData = Base & { intro: IntroBlock; notice: string; sections: { heading: string; body: string }[] }

export const getHomePage = cache(() => loadPage<HomePageData>("home", "home"))
export const getDestinationsPage = cache(() => loadPage<DestinationsPageData>("destinations", "destinations"))
export const getToursPage = cache(() => loadPage<ToursPageData>("motorcycle-tours", "motorcycle-tours"))
export const getFixedDeparturesPage = cache(() => loadPage<IntroCtaPageData>("fixed-departures", "fixed-departures"))
export const getTourCalendarPage = cache(() => loadPage<TourCalendarPageData>("tour-calendar", "tour-calendar"))
export const getJoinTourPage = cache(() => loadPage<JoinTourPageData>("join-tour", "join-tour"))
export const getCustomToursPage = cache(() => loadPage<CustomToursPageData>("custom-tours", "custom-tours"))
export const getContactPage = cache(() => loadPage<IntroPageData>("contact", "contact"))
export const getAboutPage = cache(() => loadPage<AboutPageData>("about", "about"))
export const getInsightsPage = cache(() => loadPage<InsightsPageData>("insights", "insights"))
export const getGalleryPage = cache(() => loadPage<GalleryPageData>("gallery", "gallery"))
export const getFaqPage = cache(() => loadPage<FaqPageData>("faq", "faq"))
export const getPolicyPage = cache((slug: string) => loadPage<PolicyPageData>(slug, "policy"))
