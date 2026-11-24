import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { Breadcrumbs, Conversion, PageHero } from "@/components/sections"
import { getAboutPage, getSettings, getTeam } from "@/lib/api"
import { alt, pad, RichTitle, src } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getAboutPage()).seo)
}

export default async function Page() {
  const [page, settings, team] = await Promise.all([getAboutPage(), getSettings(), getTeam()])
  const { philosophy, teamHeading } = page
  return (
    <Shell>
      <PageHero hero={page.hero} />
      <section className="detail-section section-light">
        <div className="container">
          <Breadcrumbs homeLabel={settings.labels.home} items={[{ label: page.breadcrumbLabel }]} />
          <div className="detail-grid">
            <div><p className="eyebrow"><span />{philosophy.eyebrow}</p><h2>{philosophy.title}</h2></div>
            <div className="prose">{philosophy.paragraphs.map((paragraph) => <p key={paragraph.text}>{paragraph.text}</p>)}</div>
          </div>
          <section className="team-section">
            <div className="team-heading">
              <div><p className="eyebrow"><span />{teamHeading.eyebrow}</p><h2><RichTitle text={teamHeading.title} /></h2></div>
              <p>{teamHeading.description}</p>
            </div>
            <div className="team-grid">
              {team.map((member, index) => (
                <article className={`team-card ${index < 3 ? "team-card-featured" : ""}`} key={member.title}>
                  <div className="team-portrait">
                    {member.image ? <img src={src(member.image)} alt={alt(member.image, member.title)} loading="lazy" /> : <span>{member.title.split(" ").map((part) => part[0]).join("")}</span>}
                    <small>{pad(index + 1)}</small>
                  </div>
                  <div className="team-copy"><span>{member.role}</span><h3>{member.title}</h3><p>{member.bio}</p></div>
                </article>
              ))}
            </div>
          </section>
          <Conversion cta={page.cta} />
        </div>
      </section>
    </Shell>
  )
}
