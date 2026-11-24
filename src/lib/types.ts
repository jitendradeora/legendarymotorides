/** Shapes returned by the WordPress GraphQL API after wrapper flattening (see lib/wp.ts). */

export type Img = { sourceUrl: string; altText?: string | null } | null
export type Link = { label: string; url: string }
export type Text = { text: string }
export type Seo = { title?: string | null; description?: string | null; image?: Img } | null

export type IconKey = "tripadvisor" | "facebook" | "instagram" | "youtube" | "x" | "google" | "mail" | "phone"
export type SocialLink = { name: string; icon: IconKey; url: string }

export type SiteSettings = {
  brand: { logo: Img; siteName: string; legalName: string; tagline: string; about: string; footerSlogan: string }
  contact: {
    email: string
    alternateEmail: string
    phones: { display: string; dial: string }[]
    street: string
    locality: string
    postalCode: string
    countryCode: string
    countryName: string
    companyLabel: string
    telephoneLabel: string
    emailLabel: string
    officeLabel: string
  }
  socialLinks: SocialLink[]
  reviewLinks: SocialLink[]
  header: { navLinks: Link[]; ctaLabel: string; ctaUrl: string }
  footer: { exploreTitle: string; exploreLinks: Link[]; contactTitle: string; policyLinks: Link[] }
  newsletter: {
    eyebrow: string
    title: string
    copy: string
    emailLabel: string
    placeholder: string
    buttonLabel: string
    defaultNote: string
    successMessage: string
    errorMessage: string
  }
  enquiryForm: {
    nameLabel: string
    emailLabel: string
    destinationLabel: string
    destinationPlaceholder: string
    destinationUnsure: string
    ridersLabel: string
    datesLabel: string
    datesPlaceholder: string
    durationLabel: string
    durationPlaceholder: string
    experienceLabel: string
    experiencePlaceholder: string
    experienceOptions: Text[]
    accommodationLabel: string
    accommodationPlaceholder: string
    accommodationOptions: Text[]
    messageLabel: string
    submitLabel: string
    note: string
    successMessage: string
    errorMessage: string
  }
  joinForm: {
    nameLabel: string
    emailLabel: string
    phoneLabel: string
    ridersLabel: string
    tourLabel: string
    departureLabel: string
    messageLabel: string
    submitLabel: string
    note: string
    successMessage: string
    errorMessage: string
    loadingLabel: string
  }
  forms: { enquiryFormId: string; joinFormId: string; newsletterFormId: string }
  labels: {
    home: string
    exploreDestination: string
    readArticle: string
    menuOpen: string
    menuClose: string
    moveTop: string
    playVideo: string
    closeVideo: string
  }
  notFound: { code: string; title: string; text: string; buttonLabel: string; buttonUrl: string }
  seoDefaults: {
    title: string
    description: string
    shareImage: Img
    locale: string
    themeColor: string
    googleVerification: string
    bingVerification: string
    gtmId: string
    metaPixelId: string
  }
}

export type Destination = {
  slug: string
  title: string
  region: string
  description: string
  image: Img
  season: string
  terrain: string
  relatedTours: { slug: string }[]
  seo: Seo
}

export type Tour = {
  slug: string
  title: string
  destination: { slug: string; title: string } | null
  place: string
  description: string
  image: Img
  duration: string
  distance: string
  price: string
  season: string
  ridingDays: string
  accommodation: string
  terrain: string
  dailyRide: string
  groupSize: string
  departures: Text[]
  priceNotes: Text[]
  highlights: Text[]
  itinerary: { phase: string; title: string; description: string }[]
  includes: Text[]
  excludes: Text[]
  mapStops: Text[]
  seo: Seo
}

export type Departure = {
  title: string
  tourName: string
  startDate: string
  datesLabel: string
  description: string
  duration: string
  riderPrice: string
  pillionPrice: string
}

export type Insight = {
  slug: string
  title: string
  category: string
  description: string
  image: Img
  sections: { heading: string; body: string }[]
  seo: Seo
}

export type TeamMember = { title: string; role: string; image: Img; bio: string }
export type Faq = { question: string; answer: string }
export type Review = { quote: string; author: string; origin: string }
export type Video = { title: string; youtubeId: string; rider: string; place: string }

/** Page-level content groups. Only the fields each page component reads are listed. */
export type Hero = { eyebrow: string; title: string; description: string; image: Img; primaryLabel?: string; primaryUrl?: string; secondaryLabel?: string; secondaryUrl?: string }
export type IntroBlock = { eyebrow: string; title: string; description: string }
export type HeadingBlock = IntroBlock & { linkLabel?: string; linkUrl?: string }
export type Cta = { kicker: string; title: string; buttonLabel: string; buttonUrl: string }
export type Panel = { eyebrow: string; title: string; text: string }
