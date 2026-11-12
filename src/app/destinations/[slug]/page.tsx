import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { DestinationDetailPage } from "@/components/SitePages"
import { destinations } from "@/lib/content"

export function generateStaticParams() {
  return destinations.map((destination) => ({ slug: destination.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const destination = destinations.find((item) => item.slug === slug)
  if (!destination) return { title: "Destination not found" }
  return {
    title: `${destination.name} motorcycle tours`,
    description: destination.description,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!destinations.some((item) => item.slug === slug)) notFound()
  return <DestinationDetailPage slug={slug} />
}
