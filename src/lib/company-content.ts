export type TeamMember = {
  name: string
  role: string
  image?: string
  bio: string
}

export type CalendarTour = {
  dates: string
  name: string
  description: string
  duration: string
  rider: string
  pillion: string
}

export type CalendarMonth = {
  month: string
  tours: CalendarTour[]
}

export const teamMembers: TeamMember[] = [
  {
    name: "Mahendra Singh",
    role: "Founder",
    bio: "Mahendra founded Legendary Moto Rides in 2009 to create rider-designed journeys grounded in service, local knowledge, and a genuine feel for India. His favourite riding regions include Ladakh, Rajasthan, and Kerala.",
  },
  {
    name: "Chris Gleeson",
    role: "Co-Founder & Mentor",
    image: "/images/team/chris-gleeson.webp",
    bio: "A lifelong traveller and motorcyclist from New Zealand, Chris helps riders from Australia and New Zealand choose the right Indian adventure and brings an international perspective to the team.",
  },
  {
    name: "Bharat Singh",
    role: "General Manager",
    image: "/images/team/bharat-singh.webp",
    bio: "Bharat joined the company as a tour guide in 2010 and now leads operations. With a master’s degree in Tourism Administration, he brings deep experience across Rajasthan, Ladakh, Himachal Pradesh, South India, and beyond.",
  },
  {
    name: "Bhanu Pratap",
    role: "Road Captain",
    image: "/images/team/bhanu-pratap.webp",
    bio: "Bhanu is part of the experienced road-captain team responsible for group rhythm, route leadership, rider communication, and day-to-day support on the road.",
  },
  {
    name: "Bajrang Gehlot",
    role: "Road Captain",
    image: "/images/team/bajrang-gehlot.webp",
    bio: "Bajrang leads riders through changing Indian terrain with calm local judgement, practical route knowledge, and a focus on keeping the group supported throughout each stage.",
  },
  {
    name: "Luv Kumar",
    role: "Road Captain",
    image: "/images/team/luv-kumar.webp",
    bio: "Luv supports guided departures as a road captain, helping riders settle into the pace of India’s roads while coordinating closely with the mechanic and support vehicle.",
  },
  {
    name: "Dheeraj Ranawat",
    role: "Office Manager",
    image: "/images/team/dheeraj-ranawat.webp",
    bio: "Dheeraj keeps the office and tour arrangements running smoothly, bringing a detail-focused, helpful approach to rider questions and operational coordination.",
  },
  {
    name: "Shikha Gupta",
    role: "Office Assistant",
    bio: "Shikha has worked with adventure and cultural travel across India and the subcontinent since 2012. Her careful planning and professional support help turn rider enquiries into workable journeys.",
  },
  {
    name: "Ranjit",
    role: "Mechanic",
    image: "/images/team/ranjit.webp",
    bio: "A Royal Enfield specialist, experienced rider, and resourceful travelling companion, Ranjit maintains the fleet and supports tours across Ladakh, Kashmir, Rajasthan, Kerala, and Tamil Nadu.",
  },
  {
    name: "Dipu",
    role: "Mechanic",
    image: "/images/team/dipu.webp",
    bio: "Dipu joined the team in 2012 and has supported the Royal Enfield fleet ever since. He follows tours, handles roadside problems, and is known for his mechanical skill, humour, and tireless work ethic.",
  },
]

export const calendarMonths: CalendarMonth[] = [
  {
    month: "January",
    tours: [
      { dates: "4–14 January 2027", name: "Stunning South India", description: "The land of spices, coconut, beaches, and backwaters", duration: "11 days", rider: "US $2,690", pillion: "US $1,990" },
      { dates: "10–29 January 2027", name: "The Grand Rajasthan Ride", description: "Experience Rajasthan like few ever have", duration: "20 days", rider: "US $3,800", pillion: "US $2,500" },
      { dates: "16–29 January 2027", name: "The Southern Trinity Ride", description: "Tamil Nadu, Karnataka, and Goa by Royal Enfield", duration: "14 days", rider: "US $3,200", pillion: "US $2,200" },
    ],
  },
  {
    month: "February",
    tours: [
      { dates: "1–14 February 2027", name: "Regal Rajasthan Motorcycle Tour", description: "A Royal Enfield tour through colourful Rajasthan", duration: "14 days", rider: "US $2,900", pillion: "US $2,190" },
      { dates: "8–18 February 2027", name: "Stunning South India", description: "The land of spices, coconut, beaches, and backwaters", duration: "11 days", rider: "US $2,690", pillion: "US $1,990" },
      { dates: "14–27 February 2027", name: "Regal Rajasthan Motorcycle Tour", description: "A Royal Enfield tour through colourful Rajasthan", duration: "14 days", rider: "US $2,900", pillion: "US $2,190" },
      { dates: "20 February–5 March 2027", name: "The Southern Trinity Ride", description: "Tamil Nadu, Karnataka, and Goa by Royal Enfield", duration: "14 days", rider: "US $3,200", pillion: "US $2,200" },
    ],
  },
  {
    month: "March",
    tours: [
      { dates: "1–8 March 2027", name: "Rajasthan Essential Ride", description: "A focused motorcycle adventure trail", duration: "8 days", rider: "US $1,690", pillion: "US $1,100" },
      { dates: "6–25 March 2027", name: "Ride the Heart of India", description: "Adventure, wildlife, and heritage by Royal Enfield", duration: "20 days", rider: "US $3,600", pillion: "US $2,600" },
      { dates: "12–25 March 2027", name: "Regal Rajasthan Motorcycle Tour", description: "Holi Festival of Colors special ride", duration: "14 days", rider: "US $2,900", pillion: "US $2,190" },
      { dates: "20–31 March 2027", name: "Uttarakhand Uncovered", description: "The Himalayan soul ride", duration: "12 days", rider: "US $2,300", pillion: "US $1,600" },
    ],
  },
  {
    month: "April",
    tours: [
      { dates: "1–13 April 2027", name: "The Secret Himachal Ride", description: "Twisties, tranquillity, and hidden Himalayan roads", duration: "13 days", rider: "US $2,600", pillion: "US $1,800" },
      { dates: "4–15 April 2027", name: "Uttarakhand Uncovered", description: "The Himalayan soul ride", duration: "12 days", rider: "US $2,300", pillion: "US $1,600" },
      { dates: "11–23 April 2027", name: "The Secret Himachal Ride", description: "Twisties, tranquillity, and hidden Himalayan roads", duration: "13 days", rider: "US $2,600", pillion: "US $1,800" },
      { dates: "18–29 April 2027", name: "Uttarakhand Uncovered", description: "The Himalayan soul ride", duration: "12 days", rider: "US $2,300", pillion: "US $1,600" },
    ],
  },
  {
    month: "May",
    tours: [
      { dates: "1–12 May 2027", name: "Uttarakhand Uncovered", description: "The Himalayan soul ride", duration: "12 days", rider: "US $2,300", pillion: "US $1,600" },
      { dates: "9–21 May 2027", name: "The Secret Himachal Ride", description: "Twisties, tranquillity, and hidden Himalayan roads", duration: "13 days", rider: "US $2,600", pillion: "US $1,800" },
      { dates: "16–27 May 2027", name: "The Himalaya Crown Ride", description: "Riding from heaven to the horizon", duration: "12 days", rider: "US $2,500", pillion: "US $1,900" },
      { dates: "23 May–3 June 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "23 May–6 June 2027", name: "Spiti Valley Motorcycle Expedition", description: "Into the wild heart of Little Tibet", duration: "15 days", rider: "US $2,700", pillion: "US $2,100" },
    ],
  },
  {
    month: "June",
    tours: [
      { dates: "6–25 June 2027", name: "The Himalayan Frontier Ride", description: "Spiti, Zanskar, and Ladakh expedition", duration: "20 days", rider: "US $3,600", pillion: "US $2,600" },
      { dates: "14–25 June 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "26 June–7 July 2027", name: "The Himalaya Crown Ride", description: "Riding from heaven to the horizon", duration: "12 days", rider: "US $2,500", pillion: "US $1,900" },
    ],
  },
  {
    month: "July",
    tours: [
      { dates: "3–16 July 2027", name: "Trans-Himalayan Sky Adventure", description: "Ladakh, Zanskar, and the world’s highest roads", duration: "14 days", rider: "US $3,150", pillion: "US $2,250" },
      { dates: "11–22 July 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "18–31 July 2027", name: "Trans-Himalayan Sky Adventure", description: "Ladakh, Zanskar, and the world’s highest roads", duration: "14 days", rider: "US $3,150", pillion: "US $2,250" },
    ],
  },
  {
    month: "August",
    tours: [
      { dates: "1–14 August 2027", name: "Trans-Himalayan Sky Adventure", description: "Ladakh, Zanskar, and the world’s highest roads", duration: "14 days", rider: "US $3,150", pillion: "US $2,250" },
      { dates: "15–28 August 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "21 August–4 September 2027", name: "Spiti Valley Motorcycle Expedition", description: "Into the wild heart of Little Tibet", duration: "15 days", rider: "US $2,700", pillion: "US $2,100" },
    ],
  },
  {
    month: "September",
    tours: [
      { dates: "1–12 September 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "5–19 September 2027", name: "Spiti Valley Motorcycle Expedition", description: "Into the wild heart of Little Tibet", duration: "15 days", rider: "US $2,700", pillion: "US $2,100" },
      { dates: "10–21 September 2027", name: "The Himalaya Crown Ride", description: "Riding from heaven to the horizon", duration: "12 days", rider: "US $2,500", pillion: "US $1,900" },
      { dates: "12–23 September 2027", name: "The Grand Ladakh Ride", description: "Ride the world’s highest roads", duration: "12 days", rider: "US $2,300", pillion: "US $1,700" },
      { dates: "26 September–8 October 2027", name: "The Secret Himachal Ride", description: "Twisties, tranquillity, and hidden Himalayan roads", duration: "13 days", rider: "US $2,600", pillion: "US $1,800" },
    ],
  },
  {
    month: "October",
    tours: [
      { dates: "3–14 October 2027", name: "Uttarakhand Uncovered", description: "The Himalayan soul ride", duration: "12 days", rider: "US $2,300", pillion: "US $1,600" },
      { dates: "4–14 October 2027", name: "Stunning South India", description: "The land of spices, coconut, beaches, and backwaters", duration: "11 days", rider: "US $2,690", pillion: "US $1,990" },
      { dates: "10–22 October 2027", name: "The Secret Himachal Ride", description: "Twisties, tranquillity, and hidden Himalayan roads", duration: "13 days", rider: "US $2,600", pillion: "US $1,800" },
      { dates: "17–30 October 2027", name: "The Southern Trinity Ride", description: "Tamil Nadu, Karnataka, and Goa by Royal Enfield", duration: "14 days", rider: "US $3,200", pillion: "US $2,200" },
    ],
  },
  {
    month: "November",
    tours: [
      { dates: "1–14 November 2027", name: "Regal Rajasthan Motorcycle Tour", description: "A Royal Enfield tour through colourful Rajasthan", duration: "14 days", rider: "US $2,900", pillion: "US $2,190" },
      { dates: "6–25 November 2027", name: "The Grand Rajasthan Ride", description: "Experience Rajasthan like few ever have", duration: "20 days", rider: "US $3,800", pillion: "US $2,500" },
      { dates: "21–28 November 2027", name: "Rajasthan Essential Ride", description: "A focused motorcycle adventure trail", duration: "8 days", rider: "US $1,690", pillion: "US $1,100" },
    ],
  },
  {
    month: "December",
    tours: [
      { dates: "5–18 December 2027", name: "Regal Rajasthan Motorcycle Tour", description: "A Royal Enfield tour through colourful Rajasthan", duration: "14 days", rider: "US $2,900", pillion: "US $2,190" },
      { dates: "12–19 December 2027", name: "Rajasthan Essential Ride", description: "A focused motorcycle adventure trail", duration: "8 days", rider: "US $1,690", pillion: "US $1,100" },
      { dates: "18 December 2027–6 January 2028", name: "The Grand Rajasthan Ride", description: "Experience Rajasthan like few ever have", duration: "20 days", rider: "US $3,800", pillion: "US $2,500" },
    ],
  },
]
