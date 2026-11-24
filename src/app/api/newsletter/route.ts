import { NextRequest, NextResponse } from "next/server"
import { getSettings } from "@/lib/api"
import { submitContactForm } from "@/lib/wp"

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as { email?: string } | null
  const email = body?.email?.trim() ?? ""
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Enter a valid email address." }, { status: 400 })
  }

  const settings = await getSettings()
  const result = await submitContactForm(settings.forms.newsletterFormId, { email })
  return NextResponse.json({ ok: result.ok, message: result.message }, { status: result.ok ? 200 : 502 })
}
