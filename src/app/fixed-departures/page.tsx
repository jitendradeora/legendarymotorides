import type { Metadata } from "next"
import { FixedDeparturesPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Fixed departures",
  description:
    "Join a scheduled Legendary Moto Rides departure with a road captain and support crew.",
}

export default function Page() {
  return <FixedDeparturesPage />
}
