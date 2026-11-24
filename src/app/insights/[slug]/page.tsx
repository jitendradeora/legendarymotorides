import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, JsonLd, PageHero } from "@/components/sections"
import { getAllSlugs, getInsight, getInsightsPage, getSettings } from "@/lib/api"
import { getArticleSchema } from "@/lib/schema"
import { buildMetadata } from "@/lib/seo"

type Params = { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return (await getAllSlugs()).insights.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const article = await getInsight((await params).slug)
  return buildMetadata(article.seo, { title: article.title, description: article.description, image: article.image })
}

export default async function Page({ params }: Params) {
  const { slug } = await params
  const [article, page, settings] = await Promise.all([getInsight(slug), getInsightsPage(), getSettings()])
  return (
    <Shell>
      <JsonLd data={getArticleSchema({ title: article.title, description: article.description, image: article.image, path: `/insights/${article.slug}` })} />
      <PageHero
        hero={{ eyebrow: page.detail.heroEyebrow, title: "", description: article.description, image: article.image }}
        title={article.title}
      />
      <article className="article section-light">
        <div className="article-inner">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel, to: "/insights" }, { label: article.title }]} />
          {article.sections.map((section) => <section key={section.heading}><h2>{section.heading}</h2><p>{section.body}</p></section>)}
          <aside>{page.detail.disclaimer}</aside>
        </div>
      </article>
    </Shell>
  )
}
