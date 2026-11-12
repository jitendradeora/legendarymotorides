import { NextRequest, NextResponse } from "next/server"
import { postToWordPress } from "@/lib/wordpress"

type JoinTourRequest = {
  name?: string
  email?: string
  phone?: string
  tour?: string
  dates?: string
  riders?: string
  message?: string
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as JoinTourRequest | null
  const name = body?.name?.trim() ?? ""
  const email = body?.email?.trim() ?? ""
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Name and a valid email are required." }, { status: 400 })
  }

  const forwarded = await postToWordPress("/lmr/v1/join-tour", {
    name,
    email,
    phone: body?.phone?.trim() ?? "",
    tour: body?.tour?.trim() ?? "",
    dates: body?.dates?.trim() ?? "",
    riders: body?.riders?.trim() ?? "",
    message: body?.message?.trim() ?? "",
  })

  return NextResponse.json({ ok: true, forwarded })
}
