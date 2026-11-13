import type { Metadata } from "next"
import { FaqPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers for riders planning a Legendary Moto Rides journey: motorcycles, experience, seasons, bookings, insurance, and permits.",
}

export default function Page() {
  return <FaqPage />
}
