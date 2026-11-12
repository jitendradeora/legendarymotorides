import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { TourDetailPage } from "@/components/SitePages"
import { tours } from "@/lib/content"

export function generateStaticParams() {
  return tours.map((tour) => ({ slug: tour.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const tour = tours.find((item) => item.slug === slug)
  if (!tour) return { title: "Tour not found" }
  return { title: tour.name, description: tour.description }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!tours.some((item) => item.slug === slug)) notFound()
  return <TourDetailPage slug={slug} />
}
