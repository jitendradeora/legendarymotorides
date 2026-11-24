import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Conversion, ListingIntro, TourRow } from "@/components/sections"
import { getSettings, getTours, getToursPage } from "@/lib/api"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getToursPage()).seo)
}

export default async function Page() {
  const [page, tours, settings] = await Promise.all([getToursPage(), getTours(), getSettings()])
  return (
    <Shell>
      <ListingIntro intro={page.intro} homeLabel={settings.labels.home} />
      <section className="tour-list section-light">
        <div className="container">
          {tours.map((tour) => <TourRow key={tour.slug} tour={tour} />)}
          <Conversion cta={page.cta} />
        </div>
      </section>
    </Shell>
  )
}
