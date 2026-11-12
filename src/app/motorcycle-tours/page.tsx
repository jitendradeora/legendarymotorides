import type { Metadata } from "next"
import { ToursPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Guided motorcycle tours",
  description:
    "Compare verified guided motorcycle journeys across Ladakh, Rajasthan, and South India.",
}

export default function Page() {
  return <ToursPage />
}
