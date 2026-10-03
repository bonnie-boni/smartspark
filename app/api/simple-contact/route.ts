import { NextResponse } from 'next/server'
import { addContact } from '../../../lib/mock-store'

export async function POST(request: Request) {
  const { name, email, message } = await request.json()

  if (!name || !email || !message) {
    return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
  }

  addContact({ name, email, message })
  return NextResponse.json({ message: 'Contact submitted successfully' })
}
