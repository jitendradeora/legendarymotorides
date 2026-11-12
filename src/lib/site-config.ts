import type { IconName } from "../icons"
import { publicEnv } from "./public-env"

function social(name: string, icon: IconName, url: string) {
  return { name, icon, url }
}

export const siteConfig = {
  name: publicEnv.siteName,
  legalName: "Legendary Moto Rides Pvt. Ltd.",
  url: publicEnv.siteUrl.replace(/\/$/, ""),
  tagline: "Where Every Mile Is a Memory",
  description: publicEnv.defaultDescription,
  about:
    "Rider-led Royal Enfield journeys across India and the Himalayas, planned in Delhi and guided on the road since 2009.",
  email: "info@legendarymotorides.com",
  alternateEmail: "legendarymotorides@gmail.com",
  phones: ["+91 98714 83018", "+91 99718 60718"],
  phoneLinks: ["tel:+919871483018", "tel:+919971860718"],
  socialLinks: [
    social("Tripadvisor", "tripadvisor", "https://www.tripadvisor.in/Attraction_Review-g304551-d8818238-Reviews-Legendary_Moto_Rides-New_Delhi_National_Capital_Territory_of_Delhi.html"),
    social("Facebook", "facebook", "https://www.facebook.com/LegendaryMotoRides/"),
    social("Instagram", "instagram", "https://www.instagram.com/legendarymotorides/"),
    social("YouTube", "youtube", "https://www.youtube.com/channel/UCyFKHKKov3yeY3dohhv7nEw"),
    social("X", "x", "https://twitter.com/Legendaryrides"),
  ],
  address: {
    streetAddress:
      "Office No. 20, near Sanjay Park, Veer Savarkar Block, Block U, Shakarpur",
    addressLocality: "Delhi",
    postalCode: "110092",
    addressCountry: "IN",
  },
}
