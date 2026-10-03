'use client'

import { useEffect, useState } from 'react'
import { useAuthGuard } from '../../../lib/auth-guard'

export default function AdminBlogPage() {
  const { isAuthenticated, loading } = useAuthGuard()
  const [posts, setPosts] = useState<any[]>([])
  const [formData, setFormData] = useState({ title: '', slug: '', content: '', excerpt: '', published: false })
  const [editingId, setEditingId] = useState<number | null>(null)

  const fetchPosts = () => {
    fetch('/api/blog-simple')
      .then((response) => response.json())
      .then((data) => setPosts(Array.isArray(data) ? data : []))
      .catch(() => setPosts([]))
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchPosts()
    }
  }, [isAuthenticated])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    await fetch(editingId ? `/api/blog-simple?id=${editingId}` : '/api/blog-simple', {
      method: editingId ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    setEditingId(null)
    setFormData({ title: '', slug: '', content: '', excerpt: '', published: false })
    fetchPosts()
  }

  const handleDelete = async (id: number) => {
    await fetch(`/api/blog-simple?id=${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-white p-8 shadow-xl">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Blog management</h1>
            <p className="mt-2 text-gray-600">Create, edit, or delete posts from the local mock store.</p>
          </div>
          <button onClick={fetchPosts} className="rounded-lg bg-gray-900 px-4 py-2 text-white">Refresh</button>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl bg-gray-50 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input value={formData.title} onChange={(event) => setFormData((current) => ({ ...current, title: event.target.value }))} placeholder="Title" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
            <input value={formData.slug} onChange={(event) => setFormData((current) => ({ ...current, slug: event.target.value }))} placeholder="Slug" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
          </div>
          <input value={formData.excerpt} onChange={(event) => setFormData((current) => ({ ...current, excerpt: event.target.value }))} placeholder="Excerpt" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
          <textarea value={formData.content} onChange={(event) => setFormData((current) => ({ ...current, content: event.target.value }))} rows={8} placeholder="Content" className="w-full rounded-xl border border-gray-200 px-4 py-3" />
          <label className="flex items-center gap-2 text-sm font-medium">
            <input type="checkbox" checked={formData.published} onChange={(event) => setFormData((current) => ({ ...current, published: event.target.checked }))} />
            Publish immediately
          </label>
          <div className="flex gap-3">
            <button type="submit" className="rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white">{editingId ? 'Update post' : 'Create post'}</button>
            {editingId && (
              <button type="button" onClick={() => { setEditingId(null); setFormData({ title: '', slug: '', content: '', excerpt: '', published: false }) }} className="rounded-xl border border-gray-300 px-5 py-3 font-semibold">
                Cancel edit
              </button>
            )}
          </div>
        </form>

        <div className="mt-8 space-y-4">
          {posts.map((post) => (
            <article key={post.id} className="rounded-2xl border border-gray-200 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold">{post.title}</h2>
                  <p className="mt-2 text-gray-600">{post.excerpt}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(post.id)
                      setFormData({ title: post.title, slug: post.slug, content: post.content, excerpt: post.excerpt || '', published: post.published })
                    }}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white"
                  >
                    Edit
                  </button>
                  <button type="button" onClick={() => handleDelete(post.id)} className="rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white">
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
          {posts.length === 0 && <div className="rounded-2xl bg-gray-50 p-10 text-center text-gray-600">No posts yet.</div>}
        </div>
      </div>
    </div>
  )
}
