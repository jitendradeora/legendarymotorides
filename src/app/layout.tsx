import type { Metadata } from "next"
import Script from "next/script"
import { publicEnv } from "@/lib/public-env"
import { getSiteSchema, serializeSchema } from "@/lib/schema"
import { siteConfig } from "@/lib/site-config"
import "../index.css"
import "../pages.css"

const description = publicEnv.defaultDescription

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: publicEnv.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${publicEnv.defaultTitle}`,
    description,
    locale: "en_IN",
    images: [
      {
        url: "/images/hero-rider.webp",
        alt: "Motorcyclist riding through a Himalayan valley",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | ${publicEnv.defaultTitle}`,
    description,
    images: ["/images/hero-rider.webp"],
  },
  verification: {
    ...(publicEnv.googleVerification ? { google: publicEnv.googleVerification } : {}),
    ...(publicEnv.bingVerification ? { other: { "msvalidate.01": publicEnv.bingVerification } } : {}),
  },
}

export const viewport = {
  themeColor: "#111311",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        {publicEnv.gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${publicEnv.gtmId}');`}
          </Script>
        ) : null}
        {publicEnv.metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${publicEnv.metaPixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(getSiteSchema()) }} />
        {children}
      </body>
    </html>
  )
}
