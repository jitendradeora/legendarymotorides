import type { Metadata } from "next"
import { DestinationsPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Riding destinations",
  description:
    "Motorcycle touring regions with Legendary Moto Rides, from Ladakh and Spiti to Rajasthan, South India, Nepal and Bhutan.",
}

export default function Page() {
  return <DestinationsPage />
}
