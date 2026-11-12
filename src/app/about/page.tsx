import type { Metadata } from "next"
import { AboutPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "About",
  description:
    "Legendary Moto Rides is a New Delhi motorcycle tour company guiding riders across India and the Himalaya.",
}

export default function Page() {
  return <AboutPage />
}
