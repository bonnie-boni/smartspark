import Link from 'next/link'
import { notFound } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import { getPublishedPostBySlug, listPublishedPosts } from '../../../lib/mock-store'

export function generateStaticParams() {
  return listPublishedPosts().map((post) => ({ slug: post.slug }))
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPublishedPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-primary-950 dark:text-slate-100">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden pt-20">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: 'url(/images/blog/4.jpg)' }}
          />
          <div className="absolute inset-0 bg-primary-950/80" />

          <div className="relative mx-auto flex min-h-[56vh] max-w-4xl flex-col justify-center px-4 py-24 text-white sm:px-6 lg:px-8">
            <Link href="/blog" className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Back to blog</Link>
            <h1 className="mt-4 text-4xl font-bold md:text-6xl">{post.title}</h1>
            <p className="mt-6 text-lg text-white/90 md:text-2xl">{post.excerpt}</p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <article className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl dark:bg-primary-800">
            <div className="prose max-w-none dark:prose-invert">
              <p>{post.content}</p>
            </div>
          </article>
        </section>
      </main>
      <Footer />
    </div>
  )
}
