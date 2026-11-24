import type { Metadata } from "next"
import EnquiryForm from "@/components/EnquiryForm"
import Shell from "@/components/Shell"
import { Breadcrumbs, PageHero } from "@/components/sections"
import { getCustomToursPage, getDestinations, getSettings } from "@/lib/api"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getCustomToursPage()).seo)
}

export default async function Page() {
  const [page, settings, destinations] = await Promise.all([getCustomToursPage(), getSettings(), getDestinations()])
  return (
    <Shell>
      <PageHero hero={page.hero} />
      <section className="form-page section-sand">
        <div className="container form-page-grid">
          <div>
            <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
            <p className="eyebrow"><span />{page.panel.eyebrow}</p>
            <h2>{page.panel.title}</h2>
            <p>{page.panel.text}</p>
          </div>
          <EnquiryForm form={settings.enquiryForm} destinations={destinations.map((d) => d.title)} compact />
        </div>
      </section>
    </Shell>
  )
}
