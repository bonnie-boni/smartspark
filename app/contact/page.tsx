'use client'

import { useActionState, useEffect, Suspense, useState } from 'react'
import { useFormStatus } from 'react-dom'
import { useSearchParams } from 'next/navigation'
import { Send } from 'lucide-react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Dropdown } from '@/components/ui/dropdown'
import { submitContactForm } from '@/app/actions/contact'
import { ToastProvider, useToast } from '@/components/ui/toaster'

interface ContactFormState {
  success: boolean | null
  message: string
}

const initialContactState: ContactFormState = { success: null, message: '' }

const SERVICE_OPTIONS = [
  { value: 'Web Development & Design', label: 'Web Development & Design' },
  { value: 'AI & Automation Solutions', label: 'AI & Automation Solutions' },
  { value: 'Graphic Design & Branding', label: 'Graphic Design & Branding' },
  { value: 'Digital Marketing', label: 'Digital Marketing' },
  { value: 'Other', label: 'Other' }
]

function ContactSubmitButton() {
  const { pending } = useFormStatus()

  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#6d28d9] px-5 py-3 font-semibold text-white shadow-lg shadow-[#6d28d9]/30 transition-all hover:bg-[#7c3aed] hover:shadow-[#6d28d9]/50 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6d28d9] disabled:opacity-60 disabled:cursor-not-allowed disabled:shadow-none"
    >
      {pending ? 'Sending...' : 'Send Message'}
      <Send size={18}  />
    </button>
  )
}

function ContactFormContent() {
  const searchParams = useSearchParams()
  const [serviceNeeded, setServiceNeeded] = useState<string>(searchParams.get('service') ?? '')
  const [formState, formAction] = useActionState(submitContactForm, initialContactState)
  const { addToast } = useToast()

  useEffect(() => {
    if (formState.success === null) {
      return
    }

    addToast({
      intent: formState.success ? 'success' : 'error',
      title: formState.message,
      duration: 4000
    })
  }, [formState, addToast])

  return (
    <form action={formAction} className="space-y-6">
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="block mb-2 text-sm font-semibold text-white">
            Full Name
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            autoComplete="name"
            placeholder="Full name"
            required
            className="w-full rounded-xl border border-[#2a2a3d] bg-[#12121a] px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6d28d9] transition-colors"
          />
        </div>
        <div>
          <label htmlFor="emailAddress" className="block mb-2 text-sm font-semibold text-white">
            Email Address
          </label>
          <input
            id="emailAddress"
            name="emailAddress"
            type="email"
            autoComplete="email"
            placeholder="Email address"
            required
            className="w-full rounded-xl border border-[#2a2a3d] bg-[#12121a] px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6d28d9] transition-colors"
          />
        </div>
      </div>
      <div>
        <label htmlFor="phoneNumber" className="block mb-2 text-sm font-semibold text-white">
          Phone Number
        </label>
        <input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          autoComplete="tel"
          placeholder="Phone number"
          className="w-full rounded-xl border border-[#2a2a3d] bg-[#12121a] px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6d28d9] transition-colors"
        />
      </div>
      <div>
        <Dropdown
          id="serviceNeeded"
          name="serviceNeeded"
          label="Service Needed"
          options={SERVICE_OPTIONS}
          value={serviceNeeded}
          onChange={setServiceNeeded}
        />
      </div>
      <div>
        <label htmlFor="projectDetails" className="block mb-2 text-sm font-semibold text-white">
          Project Details
        </label>
        <textarea
          id="projectDetails"
          name="projectDetails"
          rows={6}
          placeholder="Tell us about your project, goals, timeline, and budget..."
          required
          className="w-full rounded-xl border border-[#2a2a3d] bg-[#12121a] px-4 py-3 text-white placeholder-[#6b7280] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#6d28d9] transition-colors"
        />
      </div>
      <ContactSubmitButton />
    </form>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#09090e] text-white" />}>
      <ToastProvider>
        <Header />
        <main>
          <section className="pt-20 pb-12 sm:pt-28 sm:pb-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[#6d28d9]">
                  Contact
                </p>
                <h1 className="mt-3 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
                  Start the project in one clear step.
                </h1>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-[#94a3b8] md:text-xl">
                  A single contact route with service prefill and a simpler form flow.
                </p>
              </div>
            </div>
          </section>

          <section>
            <div className="mx-auto max-w-[850px] px-4 sm:px-6 lg:px-8">
              <div className="mx-auto rounded-[2rem] border border-[#2a2a3d] bg-[#12121a] p-6 sm:p-8 shadow-2xl">
                <ContactFormContent />
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </ToastProvider>
    </Suspense>
  )
}
