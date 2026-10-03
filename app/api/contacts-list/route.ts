import { NextResponse } from 'next/server'
import { listContacts } from '../../../lib/mock-store'

export async function GET() {
  return NextResponse.json(listContacts())
}
