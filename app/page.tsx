'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Brain, Globe, MessageSquare, Monitor, Pen, Sparkles } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ChatBox from '../components/ChatBox'

const services = [
  {
    icon: Monitor,
    title: 'Web Development & Design',
    description: 'Fast, polished websites and interfaces that turn visitors into customers.',
    href: '/services/web-development-and-design',
    image: '/images/services/web-development.jpg',
  },
  {
    icon: Brain,
    title: 'AI & Automation Solutions',
    description: 'Practical AI workflows that save time and remove repetitive work.',
    href: '/services/ai-and-automation-solutions',
    image: '/images/services/ai-automation.jpg',
  },
  {
    icon: Pen,
    title: 'Graphic Design & Branding',
    description: 'Distinctive visual identity systems built for consistency and recall.',
    href: '/services/graphic-design-and-branding',
    image: '/images/services/graphic-design.jpg',
  },
  {
    icon: Globe,
    title: 'Digital Marketing',
    description: 'Focused campaigns that improve reach, engagement, and conversion.',
    href: '/services/digital-marketing',
    image: '/images/services/digital-marketing.jpg',
  },
]

const portfolio = [
  {
    title: 'AI Support Automation',
    category: 'AI',
    result: '3x faster customer response',
    image: '/images/portfolio/projects/ai.jpg',
  },
  {
    title: 'Brand Identity Refresh',
    category: 'Design',
    result: 'Sharper positioning across channels',
    image: '/images/portfolio/projects/content.jpg',
  },
  {
    title: 'Digital Marketing System',
    category: 'Marketing',
    result: '45% organic traffic growth',
    image: '/images/portfolio/projects/fintech.jpg',
  },
]

export default function HomePage() {
  const [slide, setSlide] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % 3)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setStatus('idle')

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      return
    }

    const response = await fetch('/api/simple-contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setFormData({ name: '', email: '', message: '' })
      setStatus('success')
      return
    }

    setStatus('error')
  }

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-primary-950 dark:text-slate-100">
      <Header />
      <ChatBox />

      <main>
        <section className="relative isolate overflow-hidden pt-20">
          <div className="absolute inset-0">
            {['/images/home/1.jpg', '/images/home/2.jpg', '/images/home/8.jpg', '/images/home/3.jpg', '/images/home/4.jpg', '/images/home/5.jpg', '/images/home/6.jpg',  '/images/home/7.webp'].map((image, index) => (
              <div
                key={image}
                className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${slide === index ? 'opacity-100' : 'opacity-0'}`}
                style={{ backgroundImage: `url(${image})` }}
              />
            ))}
            <div className="absolute inset-0 bg-primary-950/80" />
          </div>

          <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-20 sm:px-6 lg:px-8">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-4xl">
              <h1 className="text-5xl font-bold leading-tight text-white md:text-7xl">
                Where AI and <span className="text-accent-200">Creativity</span> work together.
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-white/85 md:text-2xl">
                SmartSpark builds modern websites, brand systems, content workflows, and automation that help teams move faster without losing quality.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link href="/services" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                  Explore services
                  <ArrowRight className="ml-2" size={18} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center rounded-xl border border-white/30 bg-white/10 px-6 py-4 font-semibold text-white backdrop-blur transition-colors hover:bg-white/20">
                  Start a project
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-primary-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Services</p>
                <h2 className="mt-2 text-3xl font-bold md:text-5xl">Structured around the work that matters.</h2>
              </div>
            </div>

            <p className="max-w-xl text-gray-600 dark:text-gray-300">
                  A cleaner route map for the same core offerings: development, AI, design, and marketing.
            </p>
            
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4 mt-12 ">
              {services.map((service, index) => (
                <motion.div key={service.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: index * 0.08 }} viewport={{ once: true }} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900 light:text-accent-700">
                  <div className="relative min-h-70 p-6">
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105" />
                    <div className="relative z-10 flex h-full flex-col justify-between">
                      <service.icon className="text-gray-600 dark:text-gray-300" size={36} />
                      <div>
                        <h3 className="mt-5 text-xl font-bold text-gray-600 dark:text-gray-300">{service.title}</h3>
                        <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.description}</p>
                        <Link href={service.href} className="mt-6 inline-flex items-center font-semibold text-gray-600 dark:text-gray-300 transition-colors hover:text-accent-400">
                          Learn more
                          <ArrowRight className="ml-2" size={16} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-primary-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Portfolio</p>
                <h2 className="mt-2 text-3xl font-bold md:text-5xl">Selected results.</h2>
              </div>
              <Link href="/portfolio" className="hidden font-semibold text-accent-400 md:inline-flex">
                View full portfolio
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {portfolio.map((item) => (
                <article key={item.title} className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-lg dark:border-primary-800 dark:bg-primary-900">
                  <div className="h-56 bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
                  <div className="p-6">
                    <p className="text-sm font-semibold text-accent-500">{item.category}</p>
                    <h3 className="mt-2 text-xl font-bold">{item.title}</h3>
                    <p className="mt-3 text-sm text-gray-600 dark:text-gray-300">{item.result}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary-950 py-20 text-white">
          <div className="mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-300">Contact</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Tell us what you need. We’ll shape the route.</h2>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {[
                  'Web development and product UI',
                  'AI automation and chat workflows',
                  'Branding, design, and content systems',
                  'Marketing campaigns that are easier to manage',
                ].map((item) => (
                  <div key={item} className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/85 backdrop-blur">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
