import type { Metadata } from "next"
import { GalleryPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photographs from Legendary Moto Rides journeys across India and the Himalayas.",
}

export default function Page() {
  return <GalleryPage />
}
