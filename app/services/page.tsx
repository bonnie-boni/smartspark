 'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, Award, CheckCircle, Clock, Globe, Monitor, Shield } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const heroImages = ['/images/services/1.jpg', '/images/services/2.jpg', '/images/services/3.jpg', '/images/services/4.jpg']

const coreServices = [
  {
    name: 'Web Development & Design',
    description: 'Custom websites, landing pages, and product interfaces built for speed and clarity.',
    icon: Monitor,
    href: '/services/web-development-and-design',
    features: ['Responsive layouts', 'SEO ready structure', 'Performance optimization'],
  },
  {
    name: 'AI & Automation Solutions',
    description: 'Practical automation for support, lead handling, and content workflows.',
    icon: Globe,
    href: '/services/ai-and-automation-solutions',
    features: ['Chatbot flows', 'Workflow automation', 'Repeat-task reduction'],
  },
  {
    name: 'Graphic Design & Branding',
    description: 'Brand systems and visual assets that stay consistent across touchpoints.',
    icon: Award,
    href: '/services/graphic-design-and-branding',
    features: ['Logos and identity', 'Social visuals', 'Marketing collateral'],
  },
  {
    name: 'Digital Marketing',
    description: 'Campaign planning and content support that keeps marketing manageable.',
    icon: Shield,
    href: '/services/digital-marketing',
    features: ['SEO content', 'Campaign setup', 'Reporting support'],
  },
]

const reasons = [
  { icon: Globe, title: 'Global Talent Pool', description: 'Flexible execution across time zones and disciplines.' },
  { icon: Clock, title: 'Fast Turnaround', description: 'A clearer structure means less back-and-forth.' },
  { icon: Shield, title: 'Quality Focus', description: 'Reliable delivery with a simpler review process.' },
  { icon: Award, title: 'Proven Output', description: 'Delivery shaped around business outcomes, not filler.' },
]

export default function ServicesPage() {
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

          <div className="relative mx-auto flex min-h-[72vh] max-w-5xl flex-col justify-center px-4 py-20 text-center text-white sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Services</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Professional freelance services, reorganized.</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">
              The same core offerings from the source site, presented as a cleaner App Router experience.
            </p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Core services</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Four main service lanes.</h2>
            </div>
            <div className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
              {coreServices.map((service) => (
                <div key={service.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900">
                  <service.icon className="text-accent-500" size={32} />
                  <h3 className="mt-5 text-xl font-bold">{service.name}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{service.description}</p>
                  <ul className="mt-5 space-y-2 text-sm text-gray-600 dark:text-gray-300">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2">
                        <CheckCircle className="text-green-500" size={16} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Link href={service.href} className="mt-6 inline-flex items-center font-semibold text-accent-500 hover:text-accent-600">
                    Learn more <ArrowRight className="ml-2" size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-primary-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Why us</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">The service layer is easier to navigate now.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {reasons.map((reason) => (
                <div key={reason.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900">
                  <reason.icon className="text-accent-500" size={30} />
                  <h3 className="mt-4 text-lg font-bold">{reason.title}</h3>
                  <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{reason.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
