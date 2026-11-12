function trackingId(value: string | undefined) {
  const trimmed = value?.trim() ?? ""
  if (!trimmed || /x/i.test(trimmed) || /^0+$/.test(trimmed)) return ""
  return trimmed
}

export const publicEnv = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://legendarymotorides.com",
  siteName: process.env.NEXT_PUBLIC_SITE_NAME || "Legendary Moto Rides",
  defaultTitle: process.env.NEXT_PUBLIC_DEFAULT_TITLE || "Guided Motorcycle Tours in India",
  defaultDescription:
    process.env.NEXT_PUBLIC_DEFAULT_DESCRIPTION ||
    "Guided Royal Enfield motorcycle tours across India, the Himalayas, Rajasthan, and South India with experienced local riders.",
  gtmId: trackingId(process.env.NEXT_PUBLIC_GTM_ID),
  metaPixelId: trackingId(process.env.NEXT_PUBLIC_META_PIXEL_ID),
  googleVerification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION?.trim() || "",
  bingVerification: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION?.trim() || "",
}
