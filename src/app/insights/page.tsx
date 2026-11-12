import type { Metadata } from "next"
import { GuidesPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Practical riding insight for planning motorcycle journeys across India and the Himalayas.",
}

export default function Page() {
  return <GuidesPage />
}
