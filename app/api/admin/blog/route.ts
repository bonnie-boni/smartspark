import { NextResponse } from 'next/server'
import { createAdminPost, deleteAdminPost, listAdminPosts, updateAdminPost } from '../../../../lib/mock-store'

export async function GET() {
  return NextResponse.json(listAdminPosts())
}

export async function POST(request: Request) {
  const body = await request.json()
  return NextResponse.json(createAdminPost(body), { status: 201 })
}

export async function PUT(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  const body = await request.json()
  const post = updateAdminPost(id, body)
  return NextResponse.json(post ?? { message: 'Blog post not found' }, { status: post ? 200 : 404 })
}

export async function DELETE(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = Number(searchParams.get('id'))
  deleteAdminPost(id)
  return NextResponse.json({ message: 'Blog post deleted successfully' })
}
