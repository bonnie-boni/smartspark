'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { listPublishedPosts } from '../../lib/mock-store'

const heroImages = ['/images/blog/1.jpg', '/images/blog/2.jpg', '/images/blog/3.jpg']

export default function BlogIndexPage() {
  const posts = listPublishedPosts()
  const [slide, setSlide] = useState(0)

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroImages.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-primary-950 dark:text-slate-100">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden pt-20">
          <div className="absolute inset-0">
            {heroImages.map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${slide === index ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="absolute inset-0 bg-primary-950/80" />
          </div>

          <div className="relative mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center px-4 py-20 text-center sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Blog</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Insights on AI, automation, and digital work.</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">A cleaner blog route with server-rendered posts.</p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6">
            {posts.map((post) => (
              <article key={post.slug} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900">
                <h2 className="text-2xl font-bold">
                  <Link href={`/blog/${post.slug}`} className="hover:text-accent-500">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 text-gray-600 dark:text-gray-300">{post.excerpt}</p>
                <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">By {post.author.name}</div>
              </article>
            ))}
            {posts.length === 0 && <div className="rounded-2xl bg-gray-50 p-12 text-center text-gray-600 dark:bg-primary-800 dark:text-gray-300">No posts yet.</div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
