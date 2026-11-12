import type { Metadata } from "next"
import { JoinTourPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Join Tour",
  description: "Request a place on a scheduled Legendary Moto Rides departure.",
}

export default function Page() {
  return <JoinTourPage />
}
