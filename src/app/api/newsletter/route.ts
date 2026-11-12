import { NextRequest, NextResponse } from "next/server"
import { postToWordPress } from "@/lib/wordpress"

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null
  const email = body?.email?.trim() ?? ""
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 })
  }

  const forwarded = await postToWordPress("/lmr/v1/newsletter", { email })
  return NextResponse.json({ ok: true, forwarded })
}
