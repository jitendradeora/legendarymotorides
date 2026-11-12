import { draftMode } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret")
  const slug = request.nextUrl.searchParams.get("slug") || "/"
  if (!process.env.WORDPRESS_PREVIEW_SECRET || process.env.WORDPRESS_PREVIEW_SECRET === "replace-me" || secret !== process.env.WORDPRESS_PREVIEW_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  return NextResponse.redirect(new URL(slug.startsWith("/") ? slug : `/${slug}`, request.url))
}
