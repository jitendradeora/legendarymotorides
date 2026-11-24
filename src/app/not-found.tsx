import Shell from "@/components/Shell"
import { Icon } from "@/icons"
import { getSettings } from "@/lib/api"

export default async function NotFound() {
  const { notFound } = await getSettings()
  return (
    <Shell>
      <section className="not-found section-dark">
        <div className="container">
          <span>{notFound.code}</span>
          <h1>{notFound.title}</h1>
          <p>{notFound.text}</p>
          <a className="button button-primary" href={notFound.buttonUrl}>{notFound.buttonLabel} <Icon name="arrow" /></a>
        </div>
      </section>
    </Shell>
  )
}
