'use client'

import { useEffect, useState } from 'react'
import { useMemo } from 'react'
import { ExternalLink, Search } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const heroImages = ['/images/portfolio/1.jpg', '/images/portfolio/2.jpg', '/images/portfolio/3.jpg', '/images/portfolio/4.jpg']

const projects = [
  { id: 1, title: 'E-commerce Platform for African Fashion', client: 'Ankara Styles Co.', category: 'web', description: 'Responsive storefront with payments and inventory.', tags: ['React', 'Node.js', 'Stripe'], image: '/images/portfolio/projects/ecommerce.jpg' },
  { id: 2, title: 'Brand Identity for Fintech Startup', client: 'PayFlow Africa', category: 'design', description: 'Logo, palette, and collateral for launch.', tags: ['Brand Design', 'Style Guide'], image: '/images/portfolio/projects/fintech.jpg' },
  { id: 3, title: 'AI Customer Support System', client: 'TechSupport Pro', category: 'ai', description: 'Custom chatbot workflow with handoff logic.', tags: ['ChatGPT', 'Automation'], image: '/images/portfolio/projects/ai.jpg' },
  { id: 4, title: 'Content Marketing Campaign', client: 'Green Energy Solutions', category: 'content', description: 'SEO content and email support for lead growth.', tags: ['SEO', 'Content Strategy'], image: '/images/portfolio/projects/content.jpg' },
  { id: 5, title: 'Website Launch Campaign', client: 'Nordic Studio', category: 'web', description: 'Conversion-focused marketing site with product storytelling.', tags: ['UX', 'Strategy', 'Web'], image: '/images/portfolio/projects/web.jpg' },
  { id: 6, title: 'Product Demo Experience', client: 'Signal Labs', category: 'design', description: 'A sharper product narrative for demos, decks, and launch assets.', tags: ['Product Story', 'Design'], image: '/images/portfolio/projects/product.jpg' },
]

const filters = [
  { id: 'all', name: 'All Projects' },
  { id: 'web', name: 'Web Development' },
  { id: 'design', name: 'Design & Branding' },
  { id: 'content', name: 'Content & Writing' },
  { id: 'ai', name: 'AI & Automation' },
]

export default function PortfolioPage() {
  const [activeFilter, setActiveFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [slide, setSlide] = useState(0)

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = activeFilter === 'all' || project.category === activeFilter
      const matchesSearch = [project.title, project.description, project.client].some((value) =>
        value.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      return matchesFilter && matchesSearch
    })
  }, [activeFilter, searchTerm])

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

          <div className="relative mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Work organized around results.</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">A cleaner portfolio surface with filters and search for faster browsing.</p>
          </div>
        </section>

        <section className="bg-gray-100 px-4 py-12 dark:bg-primary-900 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap gap-2">
              {filters.map((filter) => (
                <button key={filter.id} onClick={() => setActiveFilter(filter.id)} className={`rounded-full px-4 py-2 text-sm font-medium hover:cursor-pointer transition-colors ${activeFilter === filter.id ? 'bg-primary-600 text-white' : 'bg-white text-gray-700 shadow-sm dark:bg-primary-700 dark:text-gray-200'}`}>
                  {filter.name}
                </button>
              ))}
            </div>
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder="Search projects..." className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
            </div>
          </div>
        </section>

        <section className="bg-gray-100 px-4 py-20 dark:bg-primary-900 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredProjects.map((project) => (
                <article key={project.id} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg transition-shadow hover:cursor-pointer hover:shadow-xl dark:border-primary-800 dark:bg-primary-900">
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${project.image})` }} />
                    <div className="absolute inset-0 bg-slate-950/30" />
                  </div>
                  <div className="p-6">
                    <p className="text-sm font-semibold text-accent-500">{project.client}</p>
                    <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{project.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-primary-800 dark:text-gray-200">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 flex gap-3">
                      <button className="rounded-full bg-white p-2 shadow-sm dark:bg-primary-800">
                        <ExternalLink size={18} />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
