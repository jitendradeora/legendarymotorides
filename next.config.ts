import type { NextConfig } from "next"

function wordpressHostname() {
  const raw = process.env.WORDPRESS_API_URL
  if (!raw || raw.includes("example.com")) return ""
  try {
    return new URL(raw).hostname
  } catch {
    return ""
  }
}

const wordpressHost = wordpressHostname()

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: wordpressHost
      ? [{ protocol: "https", hostname: wordpressHost, pathname: "/wp-content/uploads/**" }]
      : [],
  },
  async redirects() {
    return [
      { source: "/about-us/why-choose-lmr", destination: "/about", permanent: true },
      { source: "/plan-your-tour", destination: "/custom-tours", permanent: true },
      { source: "/travel-guide", destination: "/insights", permanent: true },
      { source: "/travel-guide/:slug", destination: "/insights/:slug", permanent: true },
      { source: "/terms-conditions", destination: "/terms-and-conditions", permanent: true },
      { source: "/fixed-tours", destination: "/tour-calendar", permanent: true },
      { source: "/fixed_tours", destination: "/tour-calendar", permanent: true },
      {
        source: "/fixed_tours/the-grand-ladakh-ride",
        destination: "/motorcycle-tours/the-grand-ladakh-ride",
        permanent: true,
      },
      {
        source: "/fixed_tours/regal-rajasthan-motorcycle-tour",
        destination: "/motorcycle-tours/regal-rajasthan",
        permanent: true,
      },
      {
        source: "/fixed_tours/stunning-south-india",
        destination: "/motorcycle-tours/stunning-south-india",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
