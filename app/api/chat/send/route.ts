import { NextResponse } from 'next/server'
import { addContact } from '../../../../lib/mock-store'

// POST /api/chat/send
// Body: { draft: string, name?: string, email?: string, service?: string }
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const draft = String(body?.draft || '')
    const name = body?.name ? String(body.name) : 'Anonymous'
    const email = body?.email ? String(body.email) : ''
    const service = body?.service ? String(body.service) : undefined

    if (!draft) {
      return NextResponse.json({ error: 'No draft provided' }, { status: 400 })
    }

    // Record as a contact submission in the mock store
    const contact = addContact({ name, email, service, message: draft })

    // In a real app, you would send an email (SMTP, SendGrid, etc.) here.
    return NextResponse.json({ status: 'ok', contact })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
