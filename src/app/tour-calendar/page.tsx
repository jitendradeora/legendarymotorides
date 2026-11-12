import type { Metadata } from "next"
import { TourCalendarPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Tour calendar",
  description:
    "Scheduled motorcycle tour departures with Legendary Moto Rides.",
}

export default function Page() {
  return <TourCalendarPage />
}
