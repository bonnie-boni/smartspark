"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Award, Globe, Heart, Target, Users, Zap } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const heroImages = ['/images/about/1.jpg', '/images/about/2.jpg', '/images/about/3.jpg', '/images/about/4.jpg']

const stats = [
  { number: '10', label: 'Projects Completed', icon: Award },
  { number: '12', label: 'Happy Clients', icon: Users },
  { number: '3', label: 'Countries Served', icon: Globe },
  { number: '99.99%', label: 'Client Satisfaction', icon: Heart },
]

const values = [
  { icon: Target, title: 'Excellence', description: 'A clear standard for quality across every page, system, and delivery.' },
  { icon: Heart, title: 'Integrity', description: 'Transparent communication, practical scope, and honest execution.' },
  { icon: Globe, title: 'Global Impact', description: 'Connecting strong talent with businesses that need dependable output.' },
  { icon: Zap, title: 'Innovation', description: 'AI-assisted workflows paired with clean product thinking.' },
]

const team = [
  { name: 'Frieze Wandabwa', role: 'Founder & CEO' },
  { name: 'Cyrilla Chikamai', role: 'Co-Founder' },
  { name: 'Teddy Githiji', role: 'Software Engineer' },
  { name: 'Mboni George', role: 'Software Engineer' },
]

export default function AboutPage() {
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
            <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="text-4xl font-bold md:text-6xl">
              About SmartSpark Services
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }} className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">
              A more organized digital services company built around web development, creative systems, and practical automation.
            </motion.p>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-primary-900">
          <div className="mx-auto grid max-w-7xl gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
            {stats.map((stat, index) => (
              <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }} viewport={{ once: true }} className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-primary-800 dark:bg-primary-900">
                <stat.icon className="mx-auto text-accent-500" size={32} />
                <div className="mt-4 text-4xl font-bold text-gray-600 dark:text-gray-300">{stat.number}</div>
                <div className="mt-2 text-sm font-medium text-gray-600 dark:text-gray-300">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Our story</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">Built to bridge talent, technology, and delivery.</h2>
              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">
                SmartSpark Services started with a straightforward goal: make high-quality digital work easier to plan, easier to manage, and easier to ship. That means better structure, cleaner routes, and clearer service pages.
              </p>
              <p className="mt-4 text-lg leading-8 text-gray-700 dark:text-gray-300">
                The revamp keeps the same service offering but presents it in a more organized App Router layout so the site is simpler to grow.
              </p>
            </div>
            <div className="rounded-3xl bg-primary-950 p-8 text-white shadow-2xl">
              <h3 className="text-2xl font-bold">Our mission</h3>
              <p className="mt-4 text-white/85">Provide dependable creative and technical support without unnecessary complexity.</p>
              <h3 className="mt-8 text-2xl font-bold">Our vision</h3>
              <p className="mt-4 text-white/85">Become the clear, organized home for AI, design, content, and web execution.</p>
            </div>
          </div>
        </section>

        <section className="bg-gray-100 py-20 dark:bg-primary-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Values</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">The operating principles behind the revamp.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {values.map((value, index) => (
                <motion.div key={value.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.08 }} viewport={{ once: true }} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900">
                  <value.icon className="text-accent-500" size={32} />
                  <h3 className="mt-5 text-xl font-bold">{value.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-500">Team</p>
              <h2 className="mt-3 text-3xl font-bold md:text-5xl">The people behind the work.</h2>
            </div>
            <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {team.map((member) => (
                <div key={member.name} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg dark:border-primary-800 dark:bg-primary-900">
                  <h3 className="text-xl font-bold">{member.name}</h3>
                  <p className="mt-2 text-sm text-accent-500">{member.role}</p>
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
