import { NextResponse } from 'next/server'
import { listPublishedPosts } from '../../../lib/mock-store'

export async function GET() {
  return NextResponse.json(listPublishedPosts())
}
