import { siteConfig } from "./site-config"

const organizationId = `${siteConfig.url}/#organization`

export function getSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "TravelAgency"],
        "@id": organizationId,
        name: siteConfig.legalName,
        url: `${siteConfig.url}/`,
        description: siteConfig.description,
        logo: `${siteConfig.url}/images/logo.webp`,
        image: `${siteConfig.url}/images/hero-rider.webp`,
        email: [siteConfig.email, siteConfig.alternateEmail],
        telephone: siteConfig.phones,
        sameAs: siteConfig.socialLinks.map((social) => social.url),
        address: {
          "@type": "PostalAddress",
          ...siteConfig.address,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteConfig.url}/#website`,
        url: `${siteConfig.url}/`,
        name: siteConfig.name,
        description: siteConfig.description,
        publisher: { "@id": organizationId },
        inLanguage: "en-IN",
      },
    ],
  }
}

export function getHomeSchema() {
  return getSiteSchema()
}

export function getFaqSchema(faqs: readonly (readonly string[])[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  }
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path}`,
    })),
  }
}

export function getTourSchema(tour: {
  name: string
  description: string
  image: string
  path: string
  areaServed: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    url: `${siteConfig.url}${tour.path}`,
    image: `${siteConfig.url}${tour.image}`,
    provider: { "@id": organizationId },
    itinerary: { "@type": "Place", name: tour.areaServed },
  }
}

export function getArticleSchema(article: {
  title: string
  description: string
  image: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: `${siteConfig.url}${article.image}`,
    mainEntityOfPage: `${siteConfig.url}${article.path}`,
    author: { "@id": organizationId },
    publisher: { "@id": organizationId },
  }
}

export function serializeSchema(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}
