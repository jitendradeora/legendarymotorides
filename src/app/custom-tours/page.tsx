import type { Metadata } from "next"
import { CustomToursPage } from "@/components/SitePages"

export const metadata: Metadata = {
  title: "Plan your ride",
  description:
    "Plan a private motorcycle tour around your dates, destination, pace and group.",
}

export default function Page() {
  return <CustomToursPage />
}
