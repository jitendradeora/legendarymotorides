import { siteUrl } from "./seo"
import type { Img, SiteSettings } from "./types"

const organizationId = () => `${siteUrl()}/#organization`

export function getSiteSchema(settings: SiteSettings) {
  const { brand, contact, seoDefaults, socialLinks } = settings
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "TravelAgency"],
        "@id": organizationId(),
        name: brand.legalName,
        url: `${siteUrl()}/`,
        description: seoDefaults.description,
        ...(brand.logo ? { logo: brand.logo.sourceUrl } : {}),
        ...(seoDefaults.shareImage ? { image: seoDefaults.shareImage.sourceUrl } : {}),
        email: [contact.email, contact.alternateEmail].filter(Boolean),
        telephone: contact.phones.map((phone) => phone.display),
        sameAs: socialLinks.map((social) => social.url),
        address: {
          "@type": "PostalAddress",
          streetAddress: contact.street,
          addressLocality: contact.locality,
          postalCode: contact.postalCode,
          addressCountry: contact.countryCode,
        },
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl()}/#website`,
        url: `${siteUrl()}/`,
        name: brand.siteName,
        description: seoDefaults.description,
        publisher: { "@id": organizationId() },
        inLanguage: seoDefaults.locale.replace("_", "-"),
      },
    ],
  }
}

export function getFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })),
  }
}

export function getBreadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${siteUrl()}${item.path}` })),
  }
}

export function getTourSchema(tour: { name: string; description: string; image: Img; path: string; areaServed: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: tour.name,
    description: tour.description,
    url: `${siteUrl()}${tour.path}`,
    ...(tour.image ? { image: tour.image.sourceUrl } : {}),
    provider: { "@id": organizationId() },
    itinerary: { "@type": "Place", name: tour.areaServed },
  }
}

export function getArticleSchema(article: { title: string; description: string; image: Img; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    ...(article.image ? { image: article.image.sourceUrl } : {}),
    mainEntityOfPage: `${siteUrl()}${article.path}`,
    author: { "@id": organizationId() },
    publisher: { "@id": organizationId() },
  }
}

export function serializeSchema(schema: unknown) {
  return JSON.stringify(schema).replace(/</g, "\\u003c")
}
