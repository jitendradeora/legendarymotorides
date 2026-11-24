import type { Metadata } from "next"
import { Suspense } from "react"
import JoinTourForm from "@/components/JoinTourForm"
import Shell from "@/components/Shell"
import { ListingIntro } from "@/components/sections"
import { getJoinTourPage, getSettings } from "@/lib/api"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getJoinTourPage()).seo)
}

export default async function Page() {
  const [page, settings] = await Promise.all([getJoinTourPage(), getSettings()])
  return (
    <Shell>
      <ListingIntro intro={page.intro} homeLabel={settings.labels.home} />
      <section className="form-page section-sand">
        <div className="container form-page-grid">
          <div>
            <p className="eyebrow"><span />{page.panel.eyebrow}</p>
            <h2>{page.panel.title}</h2>
            <p>{page.panel.text}</p>
          </div>
          <Suspense fallback={<p className="form-note">{settings.joinForm.loadingLabel}</p>}>
            <JoinTourForm form={settings.joinForm} />
          </Suspense>
        </div>
      </section>
    </Shell>
  )
}
