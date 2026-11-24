import type { Metadata } from "next"
import LoadMore from "@/components/LoadMore"
import Shell from "@/components/Shell"
import { Breadcrumbs, PageHero } from "@/components/sections"
import { getGalleryPage, getSettings } from "@/lib/api"
import { alt, src } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getGalleryPage()).seo)
}

export default async function Page() {
  const [page, settings] = await Promise.all([getGalleryPage(), getSettings()])
  return (
    <Shell>
      <PageHero hero={page.hero} />
      <section className="gallery-page page-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
          <LoadMore className="gallery-grid" step={12} label={settings.labels.loadMore}>
            {(page.images ?? []).map((item, index) => (
              <figure className="gallery-card" key={`${index}-${src(item.image)}`}>
                <img src={src(item.image)} alt={alt(item.image, item.caption)} />
                <figcaption>{item.caption}</figcaption>
              </figure>
            ))}
          </LoadMore>
        </div>
      </section>
    </Shell>
  )
}
