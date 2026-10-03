'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CheckCircle, Mail, MapPin, MessageCircle, Phone, Send } from 'lucide-react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'

const heroImages = ['/images/contact/1.jpg', '/images/contact/2.jpg', '/images/contact/3.jpg', '/images/contact/4.jpg']

export default function ContactPage() {
  const searchParams = useSearchParams()
  const [submitted, setSubmitted] = useState(false)
  const [slide, setSlide] = useState(0)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })

  useEffect(() => {
    const service = searchParams.get('service')
    if (service) {
      setFormData((current) => ({ ...current, service }))
    }
  }, [searchParams])

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlide((current) => (current + 1) % heroImages.length)
    }, 6000)

    return () => window.clearInterval(timer)
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })

    if (response.ok) {
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', service: '', message: '' })
    }
  }

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

          <div className="relative mx-auto flex min-h-[56vh] max-w-5xl flex-col justify-center px-4 py-24 text-center text-white sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Contact</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">Start the project in one clear step.</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">A single contact route with service prefill and a simpler form flow.</p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
            <div className="space-y-6 rounded-3xl bg-primary-950 p-8 text-white shadow-2xl">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent-300">Reach us</p>
                <h2 className="mt-3 text-3xl font-bold">Contact details</h2>
              </div>
              <div className="space-y-4 text-white/85">
                <div className="flex items-center gap-3"><Mail size={18} /> info@smartsparkservices.com</div>
                <div className="flex items-center gap-3"><Phone size={18} /> +1 (602) 851-1680</div>
                <div className="flex items-center gap-3"><MapPin size={18} /> Litchfield Park, AZ 85340</div>
              </div>

              <div className="pt-4">
                <a
                  href="https://wa.me/16028511680?text=Hi%20SmartSpark%2C%20I%20want%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1fb85d]"
                >
                  <MessageCircle size={18} />
                  Chat on WhatsApp
                </a>
              </div>
            </div>

            <div className="rounded-3xl bg-primary-900 p-8 text-white">
              {submitted ? (
                <div className="py-12 text-center">
                  <CheckCircle className="mx-auto text-green-500" size={48} />
                  <h2 className="mt-4 text-3xl font-bold">Thank you</h2>
                  <p className="mt-3 text-gray-600 dark:text-gray-300">Your message was submitted successfully.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 md:grid-cols-2">
                    <input value={formData.name} onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))} placeholder="Full name" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
                    <input value={formData.email} onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))} placeholder="Email address" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
                  </div>
                  <input value={formData.phone} onChange={(event) => setFormData((current) => ({ ...current, phone: event.target.value }))} placeholder="Phone number" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
                  <input value={formData.service} onChange={(event) => setFormData((current) => ({ ...current, service: event.target.value }))} placeholder="Service needed" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
                  <textarea value={formData.message} onChange={(event) => setFormData((current) => ({ ...current, message: event.target.value }))} rows={6} placeholder="Tell us about your project" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
                  <button type="submit" className="inline-flex w-full items-center justify-center rounded-xl bg-accent-600 px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-500 hover:cursor-pointer hover:text-accent-600">
                    Send message <Send className="ml-2" size={18} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
