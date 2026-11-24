import { NextRequest, NextResponse } from "next/server"
import { getSettings } from "@/lib/api"
import { submitContactForm } from "@/lib/wp"

const FIELDS = ["name", "email", "phone", "riders", "tour", "dates", "message"]

/** "Join tour" request, delivered through Contact Form 7. */
export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Record<string, unknown> | null
  const name = String(body?.name ?? "").trim()
  const email = String(body?.email ?? "").trim()
  if (!name || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ message: "Name and a valid email are required." }, { status: 400 })
  }

  const fields = Object.fromEntries(FIELDS.map((key) => [key, String(body?.[key] ?? "").trim()]))
  const settings = await getSettings()
  const result = await submitContactForm(settings.forms.joinFormId, fields)
  return NextResponse.json({ ok: result.ok, message: result.message }, { status: result.ok ? 200 : 502 })
}
