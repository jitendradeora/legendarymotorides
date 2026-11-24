import type { NextConfig } from "next"

/** All images are served from the WordPress media library. */
function wordpressImagePattern() {
  const raw = process.env.WORDPRESS_URL || "http://213.210.36.12:8081"
  if (!raw) return []
  try {
    const url = new URL(raw)
    return [{ protocol: url.protocol.replace(":", "") as "http" | "https", hostname: url.hostname, pathname: "/wp-content/uploads/**" }]
  } catch {
    return []
  }
}

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: { remotePatterns: wordpressImagePattern() },
  async redirects() {
    return [
      { source: "/about-us/why-choose-lmr", destination: "/about", permanent: true },
      { source: "/plan-your-tour", destination: "/custom-tours", permanent: true },
      { source: "/travel-guide", destination: "/insights", permanent: true },
      { source: "/travel-guide/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/terms-conditions", destination: "/terms-and-conditions", permanent: true },
      { source: "/fixed-tours", destination: "/tour-calendar", permanent: true },
      { source: "/fixed_tours", destination: "/tour-calendar", permanent: true },
      { source: "/fixed_tours/the-grand-ladakh-ride", destination: "/motorcycle-tours/the-grand-ladakh-ride", permanent: true },
      { source: "/fixed_tours/regal-rajasthan-motorcycle-tour", destination: "/motorcycle-tours/regal-rajasthan", permanent: true },
      { source: "/fixed_tours/stunning-south-india", destination: "/motorcycle-tours/stunning-south-india", permanent: true },
    ]
  },
}

export default nextConfig
