import { NextResponse } from 'next/server'
import { getAdminStats } from '../../../../lib/mock-store'

export async function GET() {
  return NextResponse.json({
    submissionsByDay: [],
    totalStats: getAdminStats(),
    serviceStats: [],
  })
}
