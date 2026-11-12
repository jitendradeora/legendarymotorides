import { revalidatePath, revalidateTag } from "next/cache"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  const secret = request.headers.get("x-revalidate-secret") ?? request.nextUrl.searchParams.get("secret")
  if (!process.env.REVALIDATE_SECRET || process.env.REVALIDATE_SECRET === "replace-me" || secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 })
  }

  const body = (await request.json().catch(() => ({}))) as { path?: string }
  const path = body.path?.startsWith("/") ? body.path : "/"
  revalidateTag("wordpress")
  revalidatePath(path)
  return NextResponse.json({ revalidated: true, path })
}
