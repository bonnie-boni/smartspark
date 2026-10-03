import { NextResponse } from 'next/server'
import { addQuote } from '../../../lib/mock-store'

export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, phone, service, message } = body

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
  }

  addQuote({ name, email, phone, service: service || 'General Inquiry', message })
  return NextResponse.json({ message: 'Contact submitted successfully' })
}
