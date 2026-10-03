import { NextResponse } from 'next/server'
import { listSubmissions } from '../../../../lib/mock-store'

export async function GET() {
  return NextResponse.json(listSubmissions())
}
