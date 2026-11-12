import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { GuideDetailPage } from "@/components/SitePages"
import { articles } from "@/lib/content"

export function generateStaticParams() {
  return articles.map((article) => ({ slug: article.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const article = articles.find((item) => item.slug === slug)
  if (!article) return { title: "Article not found" }
  return { title: article.title, description: article.description }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  if (!articles.some((item) => item.slug === slug)) notFound()
  return <GuideDetailPage slug={slug} />
}

