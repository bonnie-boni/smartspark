import { NextResponse } from 'next/server'
import { getPublishedPostBySlug } from '../../../../lib/mock-store'

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = getPublishedPostBySlug(slug)

  if (!post) {
    return NextResponse.json({ message: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json(post)
}
