import { NextResponse } from 'next/server'
import { verifyAdminToken } from '../../../../lib/mock-store'

export async function GET(request: Request) {
  const token = request.headers.get('authorization')?.replace('Bearer ', '') ?? null

  if (!verifyAdminToken(token)) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  return NextResponse.json({ valid: true })
}
