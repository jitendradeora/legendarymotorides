import type { Metadata } from "next"
import Shell from "@/components/Shell"
import { ListingIntro } from "@/components/sections"
import { Icon } from "@/icons"
import { getDepartures, getSettings, getTourCalendarPage } from "@/lib/api"
import { pad } from "@/lib/format"
import { buildMetadata } from "@/lib/seo"
import type { Departure } from "@/lib/types"

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata((await getTourCalendarPage()).seo)
}

/** Groups departures (already sorted by start date) into calendar months. */
function groupByMonth(departures: Departure[]) {
  const months: { key: string; name: string; tours: Departure[] }[] = []
  for (const departure of departures) {
    const key = departure.startDate.slice(0, 7)
    let month = months.find((m) => m.key === key)
    if (!month) {
      const name = new Date(`${key}-01T00:00:00Z`).toLocaleString("en-US", { month: "long", timeZone: "UTC" })
      month = { key, name, tours: [] }
      months.push(month)
    }
    month.tours.push(departure)
  }
  return months
}

export default async function Page() {
  const [page, departures, settings] = await Promise.all([getTourCalendarPage(), getDepartures(), getSettings()])
  const months = groupByMonth(departures)
  const { labels } = page

  return (
    <Shell>
      <ListingIntro intro={page.intro} homeLabel={settings.labels.home} />
      <section className="calendar-section section-light">
        <div className="container">
          <div className="calendar-overview">
            <div><span>{page.overview.year}</span><strong>{departures.length} {page.overview.departuresSuffix}</strong></div>
            <p>{page.overview.text}</p>
          </div>
          <div className="calendar-months">
            {months.map((month, monthIndex) => (
              <details className="calendar-month" key={month.key} name="tour-calendar" open={monthIndex === 0}>
                <summary>
                  <span>{pad(monthIndex + 1)}</span><strong>{month.name}</strong>
                  <small>{month.tours.length} {page.overview.departuresSuffix}</small><i>+</i>
                </summary>
                <div className="calendar-tours">
                  {month.tours.map((tour) => {
                    const join = new URLSearchParams({ tour: tour.tourName, dates: tour.datesLabel })
                    return (
                      <article className="calendar-tour" key={`${tour.startDate}-${tour.tourName}`}>
                        <div className="calendar-date"><small>{labels.departure}</small><strong>{tour.datesLabel}</strong></div>
                        <div className="calendar-name"><small>{tour.duration}</small><h3>{tour.tourName}</h3><p>{tour.description}</p></div>
                        <div className="calendar-price">
                          <span><small>{labels.rider}</small><strong>{tour.riderPrice}</strong></span>
                          <span><small>{labels.pillion}</small><strong>{tour.pillionPrice}</strong></span>
                        </div>
                        <a className="calendar-join" href={`${labels.joinUrl}?${join.toString()}`}>{labels.join} <Icon name="arrow" size={16} /></a>
                      </article>
                    )
                  })}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  )
}
