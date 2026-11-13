export type Destination = {
  slug: string
  name: string
  region: string
  description: string
  image: string
  season?: string
  terrain: string
  relatedTours: string[]
}

export type Tour = {
  slug: string
  legacyPath: string
  name: string
  destination: string
  description: string
  image: string
  duration: string
  distance: string
  price: string
  season?: string
  ridingDays?: string
  accommodation?: string
  terrain?: string
  dailyRide?: string
  groupSize?: string
  departures?: string[]
  priceNotes?: string[]
  highlights: string[]
  itinerary: { phase: string; title: string; description: string }[]
  includes: string[]
  excludes: string[]
  mapStops: string[]
}

export type Article = {
  slug: string
  title: string
  description: string
  image: string
  sections: { heading: string; body: string }[]
}

export const destinations: Destination[] = [
  {
    slug: "ladakh",
    name: "Ladakh",
    region: "The high Himalayas",
    description:
      "Ride into India’s high-altitude cold desert, where immense valleys, remote settlements, and mountain roads create one of the world’s most distinctive motorcycle journeys.",
    image: "/images/ladakh.webp",
    season: "June to September",
    terrain: "High mountain passes, paved and variable mountain roads, and remote valleys.",
    relatedTours: ["the-grand-ladakh-ride"],
  },
  {
    slug: "spiti-valley",
    name: "Spiti Valley",
    region: "Himachal Pradesh",
    description:
      "A raw Himalayan landscape of deep gorges, ancient villages, and roads carved into the mountainside. Conditions and route access vary throughout the season.",
    image: "/images/rider-road.webp",
    terrain: "Narrow mountain roads, river valleys, and changing high-altitude surfaces.",
    relatedTours: [],
  },
  {
    slug: "rajasthan",
    name: "Rajasthan",
    region: "The desert kingdoms",
    description:
      "Cross open desert roads between historic forts, palace cities, rural villages, and the vivid culture of north-west India.",
    image: "/images/rajasthan.webp",
    terrain: "Long paved roads, desert landscapes, historic cities, and rural backroads.",
    relatedTours: ["regal-rajasthan"],
  },
  {
    slug: "south-india",
    name: "South India",
    region: "Karnataka · Kerala · Tamil Nadu",
    description:
      "Follow roads through coffee country, tropical forest, temple towns, spice gardens, beaches, and Kerala’s backwaters.",
    image: "/images/south-india.webp",
    season: "October to March",
    terrain: "Winding hill roads, tropical countryside, coastlines, and lively towns.",
    relatedTours: ["stunning-south-india"],
  },
  {
    slug: "himachal-pradesh",
    name: "Himachal Pradesh",
    region: "The middle Himalayas",
    description:
      "Ride through pine forest, apple country, snow-fed valleys, and mountain communities across the western Himalayas.",
    image: "/images/rider-road.webp",
    terrain: "Mountain roads, forested valleys, river crossings, and changing elevations.",
    relatedTours: [],
  },
  {
    slug: "uttarakhand",
    name: "Uttarakhand",
    region: "The middle Himalayas",
    description:
      "Discover quiet mountain roads, river valleys, forest routes, and spiritual towns in India’s northern hill country.",
    image: "/images/ladakh.webp",
    terrain: "Mountain highways, forest roads, river valleys, and village routes.",
    relatedTours: [],
  },
  {
    slug: "goa",
    name: "Goa",
    region: "India’s western coast",
    description:
      "Combine coastal roads with the green interior, village routes, and the relaxed pace of India’s western shoreline.",
    image: "/images/south-india.webp",
    terrain: "Coastal roads, tropical lanes, and inland countryside.",
    relatedTours: [],
  },
  {
    slug: "nepal",
    name: "Nepal",
    region: "Beyond India",
    description:
      "A Himalayan riding destination offered subject to current border, permit, and operating conditions.",
    image: "/images/ladakh.webp",
    terrain: "Mountain roads and valleys; exact routes depend on current operating conditions.",
    relatedTours: [],
  },
  {
    slug: "bhutan",
    name: "Bhutan",
    region: "Beyond India",
    description:
      "A mountain kingdom of forest roads and remote valleys, offered only when permissions and local operating conditions allow.",
    image: "/images/rider-road.webp",
    terrain: "Mountain roads, forest routes, and remote valleys.",
    relatedTours: [],
  },
  {
    slug: "tibet",
    name: "Tibet",
    region: "Beyond India",
    description:
      "High-plateau motorcycle travel subject to current international border rules, permits, and local operating permissions.",
    image: "/images/ladakh.webp",
    terrain: "High-altitude plateau and long-distance mountain roads.",
    relatedTours: [],
  },
]

export const tours: Tour[] = [
  {
    slug: "the-grand-ladakh-ride",
    legacyPath: "/fixed_tours/the-grand-ladakh-ride/",
    name: "The Grand Ladakh Ride",
    destination: "ladakh",
    description:
      "Ride the world’s highest roads on a fully supported Royal Enfield Himalayan journey through Ladakh, Nubra Valley, Pangong Lake, Hanle, and Umling La.",
    image: "/images/rider-road.webp",
    duration: "11 nights / 12 days",
    distance: "1,500 km / 935 miles",
    price: "US $2,300 per rider",
    season: "June to September",
    ridingDays: "8 days",
    accommodation: "3-star & 4-star hotels, camps and homestays",
    terrain: "70% tarmac · 30% gravel",
    dailyRide: "5–7 hours on average",
    groupSize: "Maximum 10 riders",
    departures: [
      "23 May – 3 June 2027",
      "14–25 June 2027",
      "11–22 July 2027",
      "15–28 August 2027",
      "1–12 September 2027",
      "12–23 September 2027",
    ],
    priceNotes: [
      "US $1,700 per pillion",
      "US $1,700 per car passenger",
      "US $390 single-room supplement",
      "US $230 off per rider for groups of three riders",
    ],
    highlights: [
      "Umling La — the world’s highest motorable road",
      "Khardung La and the Nubra Valley",
      "Pangong Lake and Hanle Dark Sky Reserve",
      "Royal Enfield Himalayan motorcycle",
    ],
    itinerary: [
      { phase: "Day 1 · Delhi", title: "Arrive in New Delhi", description: "Meet the local representative at Delhi International Airport, transfer to the hotel, and receive an introduction to the journey. The remainder of the day is free to rest." },
      { phase: "Day 2 · Flight & acclimatization", title: "Delhi to Leh", description: "Fly across the Himalayas to Leh at 3,505 metres. Rest and acclimatize before visiting Shanti Stupa and Leh Market, followed by the full tour briefing." },
      { phase: "Day 3 · 100 km / 4 hours", title: "Leh to Hemis Shukpachan", description: "Meet the Royal Enfield Himalayan and support team, then ride through Sham Valley via the Indus–Zanskar confluence and Likir Monastery to Hemis Shukpachan." },
      { phase: "Day 4 · 100 km / 5 hours", title: "Hemis Shukpachan to Leh", description: "Return toward Leh with visits to Alchi village and its ancient monastery, followed by Gurdwara Pathar Sahib and its community kitchen." },
      { phase: "Day 5 · 125 km / 6 hours", title: "Leh to Nubra Valley via Khardung La", description: "Climb Khardung La at 5,482 metres before descending into Nubra Valley, traditionally known as the valley of flowers." },
      { phase: "Day 6 · Local exploration", title: "Nubra Valley sightseeing", description: "Visit Diskit Monastery and Hunder’s high-altitude dunes, with the opportunity to experience the valley’s double-humped Bactrian camels." },
      { phase: "Day 7 · 160 km / 7 hours", title: "Nubra Valley to Pangong Lake", description: "Follow an adventurous route of rough tracks, shallow streams, and sandy stretches to Pangong Tso, the brilliant high-altitude lake at 4,200 metres." },
      { phase: "Day 8 · 190 km / 8 hours", title: "Pangong Lake to Hanle", description: "Ride deeper into the Changthang region via the Rezang La War Memorial and Loma or Tsaga, finishing in Hanle, India’s first official Dark Sky Reserve." },
      { phase: "Day 9 · 150 km return", title: "Hanle to Umling La and back", description: "Take on the expedition’s highest objective: the rough, remote road to Umling La at approximately 5,882 metres, before returning to Hanle." },
      { phase: "Day 10 · 250 km / 7 hours", title: "Hanle to Leh", description: "Ride back through the broad landscapes of Chumathang Valley and Upshi, reaching Leh for a final evening in the market and cafés." },
      { phase: "Day 11 · Flight & Delhi", title: "Leh to New Delhi", description: "Fly back over the Himalayas and transfer to the Delhi hotel. The planned afternoon includes India Gate, the government district, and Connaught Place." },
      { phase: "Day 12 · Departure", title: "New Delhi airport transfer", description: "Transfer to Delhi International Airport according to your flight time. A same-day Taj Mahal visit may be arranged at additional cost for late departures." },
    ],
    includes: [
      "11 nights in hotels, camps, and homestays on twin or double-sharing basis",
      "Breakfast, lunch, and dinner during the tour; breakfast-only accommodation in Delhi",
      "Delhi–Leh–Delhi domestic flights and all scheduled ground transfers",
      "Royal Enfield Himalayan motorcycle and fuel on all riding days",
      "English-speaking road captain, Royal Enfield mechanic, spares, and first-aid kit",
      "Support vehicle for luggage and pillion riders, plus riding refreshments",
      "Scheduled monument and monastery entry fees, local guides, and inner-line permits",
      "Farewell dinner and currently applicable taxes",
    ],
    excludes: [
      "International flights and Indian visa fees",
      "Compulsory personal medical and motorcycle travel insurance",
      "Motorcycle damage and personal riding equipment",
      "Tips, laundry, liquor, additional drinks, and other personal expenses",
      "Anything not specifically listed in the included package",
    ],
    mapStops: ["Delhi", "Leh", "Hemis Shukpachan", "Nubra Valley", "Pangong Lake", "Hanle", "Umling La", "Leh"],
  },
  {
    slug: "regal-rajasthan",
    legacyPath: "/fixed_tours/regal-rajasthan-motorcycle-tour/",
    name: "Regal Rajasthan",
    destination: "rajasthan",
    description:
      "Ride between Rajasthan’s desert landscapes, historic forts, palace cities, and rural communities.",
    image: "/images/desert-ride.webp",
    duration: "14 days",
    distance: "1,650 km",
    price: "Request current quote",
    highlights: ["Desert roads", "Historic fort cities", "Rural Rajasthan"],
    itinerary: [
      { phase: "Start", title: "Arrival & rider briefing", description: "Meet the team, check equipment, and review the current Rajasthan route." },
      { phase: "Ride", title: "Desert kingdom riding stages", description: "Ride the confirmed itinerary between Rajasthan’s landscapes, historic cities, and rural roads." },
      { phase: "Finish", title: "Final stage & departure", description: "Complete the last guided stage and conclude the journey with the support team." },
    ],
    includes: ["Pre-tour rider briefing", "Guided road leadership and support described in your proposal", "Motorcycle, accommodation, and meals only where itemized in the current proposal"],
    excludes: ["International and domestic flights unless specifically listed", "Visa, travel insurance, and personal riding equipment", "Personal expenses and anything not itemized as included"],
    mapStops: ["Arrival & briefing", "Rajasthan", "Desert kingdom roads", "Journey finish"],
  },
  {
    slug: "stunning-south-india",
    legacyPath: "/fixed_tours/stunning-south-india/",
    name: "Stunning South India",
    destination: "south-india",
    description:
      "A tropical journey through spice country, coffee hills, beaches, temple towns, and backwater landscapes.",
    image: "/images/south-india.webp",
    duration: "11 days",
    distance: "1,250 km",
    price: "Request current quote",
    season: "October to March",
    highlights: ["Coffee and spice country", "Tropical coastlines", "Karnataka, Kerala, and Tamil Nadu"],
    itinerary: [
      { phase: "Start", title: "Arrival & rider briefing", description: "Meet the road team, review the motorcycle, and prepare for tropical riding conditions." },
      { phase: "Ride", title: "South India riding stages", description: "Follow the currently confirmed route through coffee country, spice landscapes, temple towns, and coastal roads." },
      { phase: "Finish", title: "Final stage & departure", description: "Complete the southern route and conclude the guided journey." },
    ],
    includes: ["Pre-tour rider briefing", "Guided road leadership and support described in your proposal", "Motorcycle, accommodation, and meals only where itemized in the current proposal"],
    excludes: ["International and domestic flights unless specifically listed", "Visa, travel insurance, and personal riding equipment", "Personal expenses and anything not itemized as included"],
    mapStops: ["Arrival & briefing", "Coffee & spice roads", "Tropical coast", "Journey finish"],
  },
]

export const articles: Article[] = [
  {
    slug: "preparing-for-ladakh",
    title: "Preparing for the high roads of Ladakh",
    description:
      "A practical introduction to altitude, changing weather, riding pace, and preparation for a Ladakh motorcycle journey.",
    image: "/images/ladakh.webp",
    sections: [
      { heading: "Respect the altitude", body: "High-altitude travel requires a measured pace. Build acclimatization time into the journey and discuss health considerations with an appropriate medical professional before travel." },
      { heading: "Pack for change", body: "Conditions can shift quickly in the Himalayas. Layering, weather protection, sun protection, and appropriate riding equipment matter more than packing heavily." },
      { heading: "Stay flexible", body: "Mountain roads can change with weather, maintenance, and local restrictions. A good itinerary leaves room for the road captain to make safe, informed decisions." },
    ],
  },
  {
    slug: "what-to-pack",
    title: "What to pack for a motorcycle tour in India",
    description:
      "A focused packing framework for riding equipment, climate layers, personal essentials, and travel documents.",
    image: "/images/rider-road.webp",
    sections: [
      { heading: "Riding essentials", body: "Bring protective riding equipment that fits well and that you already trust. Confirm motorcycle, helmet, and luggage arrangements before departure." },
      { heading: "Travel light", body: "Prioritize versatile layers, weather protection, essential medication, and secure copies of travel documents." },
    ],
  },
  {
    slug: "royal-enfield-in-india",
    title: "Riding Royal Enfield motorcycles in India",
    description:
      "What international riders should know about the pace, character, and practicalities of a guided Royal Enfield journey.",
    image: "/images/desert-ride.webp",
    sections: [
      { heading: "Ride the rhythm", body: "A guided ride is not a race. Smooth inputs, clear spacing, and attention to the road captain help the group move safely through changing conditions." },
      { heading: "Confirm your motorcycle", body: "Motorcycle models and availability can change. The exact bike and support package should be confirmed in your tour proposal." },
    ],
  },
  {
    slug: "a-day-on-the-road",
    title: "What a guided riding day feels like",
    description:
      "A dummy field sketch of breakfast, the morning briefing, the riding rhythm, and the stop that makes the day.",
    image: "/images/hero-rider.webp",
    sections: [
      { heading: "The morning start", body: "The day begins with a short briefing: the road, the weather, the meeting points, and the pace. Riders leave together and settle into the group’s rhythm." },
      { heading: "The middle hours", body: "Support stays close, tea stops are part of the plan, and the road captain adjusts the route when the mountains or the traffic ask for it." },
      { heading: "The evening", body: "The bikes are parked, the day is talked through, and the next morning’s start is already on the table. This article is a placeholder until the full story is written." },
    ],
  },
]

export const faqs = [
  ["Do I need to bring my own motorcycle?", "No. Guided journeys can include a Royal Enfield motorcycle. The exact model, support arrangements, and what is included are confirmed in your tour proposal."],
  ["How experienced do I need to be?", "Riding demands vary by route. Tell us about your road, off-road, and high-altitude experience and we will help you choose an appropriate journey."],
  ["Can you create a private itinerary?", "Yes. Private motorcycle holidays can be designed around your preferred destination, dates, group size, pace, and accommodation style."],
  ["When are Himalayan routes open?", "Opening dates depend on snow, weather, road conditions, and local permissions. We verify operating conditions before confirming a high-altitude itinerary."],
  ["Is an enquiry a confirmed booking?", "No. A booking becomes binding only when Legendary Moto Rides issues written confirmation and the payment requirements in that proposal have been met."],
  ["Do I need insurance?", "Riders need the licences, visas, insurance, and fitness required for the confirmed journey. Personal medical and motorcycle travel insurance stays with the rider unless a written proposal says otherwise."],
  ["Can a passenger come along?", "Some journeys can include a pillion. Luggage and passenger support are confirmed in the written proposal for that departure."],
  ["Who confirms permits and the final route?", "The team reconfirms mountain access, permits, and operating conditions before a booking is accepted. The road captain may adjust the route for safety, weather, or access."],
] as const

export const videoTestimonials = [
  {
    id: "GPXRRCApM1s",
    title: "Himachal motorcycle tour review",
    rider: "Rider from Switzerland",
    place: "Himachal Pradesh",
  },
  {
    id: "uibYB6qiTNk",
    title: "High Himalayan expedition",
    rider: "Riders from Australia",
    place: "Ladakh · Umling La",
  },
  {
    id: "VZjG6XP1nK0",
    title: "Royal roads of Rajasthan",
    rider: "Riders from France",
    place: "Rajasthan",
  },
]

export const galleryImages = [
  { src: "/images/hero-rider.webp", alt: "Motorcyclist riding through a Himalayan valley", caption: "High roads" },
  { src: "/images/ladakh.webp", alt: "A high-altitude road in Ladakh", caption: "Ladakh" },
  { src: "/images/desert-ride.webp", alt: "Motorcycle crossing a desert road", caption: "Desert miles" },
  { src: "/images/rajasthan.webp", alt: "Amber Fort above the Rajasthan landscape", caption: "Rajasthan" },
  { src: "/images/south-india.webp", alt: "A tropical road through South India", caption: "South India" },
  { src: "/images/rider-road.webp", alt: "Rider on a mountain road", caption: "The open road" },
]
