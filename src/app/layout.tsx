import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { getSettings } from "@/lib/api"
import { getSiteSchema, serializeSchema } from "@/lib/schema"
import { siteUrl } from "@/lib/seo"
import "../index.css"
import "../pages.css"

export async function generateMetadata(): Promise<Metadata> {
  const { brand, seoDefaults } = await getSettings()
  const image = seoDefaults.shareImage
  const title = `${brand.siteName} | ${seoDefaults.title}`
  return {
    metadataBase: new URL(siteUrl()),
    title: { default: seoDefaults.title, template: `%s | ${brand.siteName}` },
    description: seoDefaults.description,
    applicationName: brand.siteName,
    authors: [{ name: brand.legalName, url: siteUrl() }],
    icons: { icon: "/favicon.svg" },
    robots: { index: true, follow: true },
    openGraph: {
      type: "website",
      url: siteUrl(),
      siteName: brand.siteName,
      title,
      description: seoDefaults.description,
      locale: seoDefaults.locale,
      ...(image ? { images: [{ url: image.sourceUrl, alt: image.altText ?? "" }] } : {}),
    },
    twitter: { card: "summary_large_image", title, description: seoDefaults.description, ...(image ? { images: [image.sourceUrl] } : {}) },
    verification: {
      ...(seoDefaults.googleVerification ? { google: seoDefaults.googleVerification } : {}),
      ...(seoDefaults.bingVerification ? { other: { "msvalidate.01": seoDefaults.bingVerification } } : {}),
    },
  }
}

export async function generateViewport(): Promise<Viewport> {
  const { seoDefaults } = await getSettings()
  return { themeColor: seoDefaults.themeColor || "#111311", width: "device-width", initialScale: 1 }
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const settings = await getSettings()
  const { gtmId, metaPixelId } = settings.seoDefaults
  return (
    <html lang="en">
      <body>
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {metaPixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeSchema(getSiteSchema(settings)) }} />
        {children}
      </body>
    </html>
  )
}
