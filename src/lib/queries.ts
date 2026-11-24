/** GraphQL field selections. Shared section selections are defined once and reused by every page query. */

export const IMG = "node { sourceUrl altText }"
export const SEO = `seo { title description image { ${IMG} } }`
export const HERO = `hero { eyebrow title description image { ${IMG} } }`
export const HERO_CTA = `hero { eyebrow title description image { ${IMG} } primaryLabel primaryUrl secondaryLabel secondaryUrl }`
export const INTRO = "intro { eyebrow title description }"
export const CTA = "cta { kicker title buttonLabel buttonUrl }"
export const heading = (name: string, link = false) => `${name} { eyebrow title description ${link ? "linkLabel linkUrl" : ""} }`
const PANEL = (name = "panel") => `${name} { eyebrow title text }`

export const SETTINGS_QUERY = `{
  siteSettings { siteSettingsData {
    brand { logo { ${IMG} } siteName legalName tagline about footerSlogan }
    contact { email alternateEmail phones { display dial } street locality postalCode countryCode countryName companyLabel telephoneLabel emailLabel officeLabel }
    socialLinks { name icon url }
    reviewLinks { name icon url }
    header { navLinks { label url } ctaLabel ctaUrl }
    footer { exploreTitle exploreLinks { label url } contactTitle policyLinks { label url } }
    newsletter { eyebrow title copy emailLabel placeholder buttonLabel defaultNote successMessage errorMessage }
    enquiryForm { nameLabel emailLabel destinationLabel destinationPlaceholder destinationUnsure ridersLabel datesLabel datesPlaceholder durationLabel durationPlaceholder experienceLabel experiencePlaceholder experienceOptions { text } accommodationLabel accommodationPlaceholder accommodationOptions { text } messageLabel submitLabel note successMessage errorMessage }
    joinForm { nameLabel emailLabel phoneLabel ridersLabel tourLabel departureLabel messageLabel submitLabel note successMessage errorMessage loadingLabel }
    forms { enquiryFormId joinFormId newsletterFormId }
    labels { home exploreDestination readArticle loadMore menuOpen menuClose moveTop playVideo closeVideo }
    notFound { code title text buttonLabel buttonUrl }
    seoDefaults { title description shareImage { ${IMG} } locale themeColor googleVerification bingVerification gtmId metaPixelId }
  } }
}`

const ORDER = "where: { orderby: { field: MENU_ORDER, order: ASC } }"

const DESTINATION_FIELDS = `slug title destinationFields { region description season terrain image { ${IMG} } relatedTours { nodes { ... on Tour { slug } } } ${SEO} }`
export const DESTINATIONS_QUERY = `{ destinations(first: 100, ${ORDER}) { nodes { ${DESTINATION_FIELDS} } } }`

const TOUR_FIELDS = `slug title tourCategories { nodes { name slug } } tourFields {
  destination { nodes { ... on Destination { slug title } } }
  place description image { ${IMG} } duration distance price season ridingDays accommodation terrain dailyRide groupSize
  departures { text } priceNotes { text } highlights { text }
  itinerary { phase title description } includes { text } excludes { text } mapStops { text } ${SEO}
}`
export const TOURS_QUERY = `{ tours(first: 100, ${ORDER}) { nodes { ${TOUR_FIELDS} } } }`

const INSIGHT_FIELDS = `slug title insightFields { category description image { ${IMG} } sections { heading body } ${SEO} }`
export const INSIGHTS_QUERY = `{ insights(first: 100, ${ORDER}) { nodes { ${INSIGHT_FIELDS} } } }`

export const DEPARTURES_QUERY = `{ departures(first: 100, ${ORDER}) { nodes { title departureFields { tourName startDate datesLabel description duration riderPrice pillionPrice } } } }`
export const TEAM_QUERY = `{ teamMembers(first: 100, ${ORDER}) { nodes { title teamMemberFields { role image { ${IMG} } bio } } } }`
export const FAQS_QUERY = `{ faqs(first: 100, ${ORDER}) { nodes { title faqFields { answer } } } }`
export const REVIEWS_QUERY = `{ testimonials(first: 100, ${ORDER}) { nodes { testimonialFields { quote author origin } } } }`
export const VIDEOS_QUERY = `{ videoTestimonials(first: 100, ${ORDER}) { nodes { title videoTestimonialFields { youtubeId rider place } } } }`

export const SLUGS_QUERY = `{
  destinations(first: 100) { nodes { slug } }
  tours(first: 100) { nodes { slug } }
  insights(first: 100) { nodes { slug } }
}`

/** Page content selections, keyed by page slug. Each is wrapped as page(id: slug) { <group> { ... } }. */
export const PAGE_SELECTIONS: Record<string, { group: string; fields: string }> = {
  home: {
    group: "homePage",
    fields: `${SEO} ${HERO_CTA}
      philosophy { toplineLeft toplineRight eyebrow title lead linkLabel linkUrl proof { value label } }
      destinations { ${heading("heading")} alsoRidingLabel featured { subtitle destination { nodes { ... on Destination { slug title destinationFields { region image { ${IMG} } } } } } } }
      tours { ${heading("heading", true)} guidedLabel availabilityNote featured { tour { nodes { ... on Tour { slug title tourFields { place duration distance image { ${IMG} } } } } } } }
      story { image { ${IMG} } captionTop captionMain captionBottom eyebrow title body features { icon title text } buttonLabel buttonUrl }
      testimonials { ${heading("heading")} reviewLabel }
      videos { ${heading("heading")} sourceLabel sourceUrl }
      journal { ${heading("heading")} featuredKicker featuredLinkLabel featuredArticle { nodes { ... on Insight { slug title insightFields { image { ${IMG} } } } } } list { label title url } }
      faq { eyebrow title intro linkLabel linkUrl count }`,
  },
  destinations: {
    group: "destinationsPage",
    fields: `${SEO} breadcrumbLabel ${HERO} ${heading("grid")} callout { title text }
      detail { heroTitlePrefix sectionEyebrow sectionTitle seasonLabel terrainLabel planningLabel planningText relatedLabel ctaKicker ctaTitle ctaButtonLabel ctaButtonUrl }`,
  },
  "motorcycle-tours": {
    group: "toursPage",
    fields: `${SEO} ${INTRO} ${CTA}
      detail { breadcrumbLabel heroEyebrowSuffix durationLabel distanceLabel ridingDaysLabel seasonLabel priceLabel overviewEyebrow overviewTitle highlightsLabel highlightsCountSuffix terrainLabel dailyLabel staysLabel groupLabel departuresIndex departuresEyebrow departuresTitle departuresIntro packageLabel availabilityLabel departureCardLabel departureEnquireLabel departureUrl itineraryEyebrow itineraryTitle itineraryText itineraryFallback mapEyebrow mapTitle mapText includedTitle excludedTitle policyLabel policyLinks { label url } ctaKicker ctaTitle ctaButtonLabel ctaButtonUrl }`,
  },
  "fixed-departures": { group: "fixedDeparturesPage", fields: `${SEO} ${INTRO} ${CTA}` },
  "tour-calendar": {
    group: "tourCalendarPage",
    fields: `${SEO} ${INTRO} overview { year departuresSuffix text } labels { departure rider pillion join joinUrl }`,
  },
  "join-tour": { group: "joinTourPage", fields: `${SEO} ${INTRO} ${PANEL()}` },
  "custom-tours": { group: "customToursPage", fields: `${SEO} breadcrumbLabel ${HERO} ${PANEL()}` },
  contact: { group: "contactPage", fields: `${SEO} ${INTRO}` },
  about: {
    group: "aboutPage",
    fields: `${SEO} breadcrumbLabel ${HERO} philosophy { eyebrow title paragraphs { text } } ${heading("teamHeading")} ${CTA}`,
  },
  insights: {
    group: "insightsPage",
    fields: `${SEO} breadcrumbLabel ${HERO} cardLabel readLabel detail { heroEyebrow disclaimer }`,
  },
  gallery: { group: "galleryPage", fields: `${SEO} breadcrumbLabel ${HERO} images { caption image { ${IMG} } }` },
  faq: {
    group: "faqPage",
    fields: `${SEO} breadcrumbLabel ${HERO} more { beforeEmail between linkLabel linkUrl }`,
  },
  policy: { group: "policyPage", fields: `${SEO} ${INTRO} notice sections { heading body }` },
}
