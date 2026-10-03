import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Star } from 'lucide-react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

const serviceMap = {
  'web-development-and-design': {
    title: 'Web Development & Design',
    subtitle: 'Custom websites that perform and convert',
    description: 'Build a stronger online presence with lean, responsive, and maintainable web experiences.',
    features: ['Personal websites', 'Company websites', 'E-commerce integration', 'CMS development', 'Performance optimization'],
    pricing: 'Starting from $1,500',
    delivery: '2-4 weeks',
  },
  'ai-and-automation-solutions': {
    title: 'AI & Automation Solutions',
    subtitle: 'Automation that removes repetitive work',
    description: 'Use AI to streamline support, content, and internal workflows without creating complexity.',
    features: ['ChatGPT integration', 'Email automation', 'Chatbot creation', 'Workflow automation', 'Data analysis'],
    pricing: 'Starting from $500',
    delivery: '1-3 weeks',
  },
  'graphic-design-and-branding': {
    title: 'Graphic Design & Branding',
    subtitle: 'Visual identity that stays consistent everywhere',
    description: 'Create logos, identity systems, and marketing assets that hold together across channels.',
    features: ['Logo design', 'Brand identity', 'Marketing materials', 'Social graphics'],
    pricing: 'Starting from $200',
    delivery: '5-10 business days',
  },
  'digital-marketing': {
    title: 'Digital Marketing',
    subtitle: 'Campaign support with a clearer focus',
    description: 'Plan and ship content, SEO, and campaign work without losing track of outcomes.',
    features: ['SEO', 'Social media management', 'Content marketing', 'Ad campaign management'],
    pricing: 'Starting from $800',
    delivery: '2-4 weeks',
  },
} as const

export default async function ServiceDetailPage({ params }: { params: Promise<{ service: keyof typeof serviceMap }> }) {
  const { service: routeService } = await params
  const service = serviceMap[routeService]
  const heroImage = routeService === 'web-development-and-design'
    ? '/images/services/web-development.jpg'
    : routeService === 'ai-and-automation-solutions'
      ? '/images/services/ai-automation.jpg'
      : routeService === 'graphic-design-and-branding'
        ? '/images/services/graphic-design.jpg'
        : '/images/services/digital-marketing.jpg'

  if (!service) {
    return (
      <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-primary-950 dark:text-slate-100">
        <Header />
        <main className="px-4 py-24 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold">Service not found</h1>
          <Link href="/services" className="mt-6 inline-flex text-accent-500">
            Back to services
          </Link>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 text-slate-900 dark:bg-primary-950 dark:text-slate-100">
      <Header />
      <main>
        <section className="relative isolate overflow-hidden pt-20">
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${heroImage})` }} />
          <div className="absolute inset-0 bg-primary-950/80" />

          <div className="relative mx-auto flex min-h-[56vh] max-w-5xl flex-col justify-center px-4 py-24 text-center text-white sm:px-6 lg:px-8">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-white/80">Service detail</p>
            <h1 className="mt-3 text-4xl font-bold md:text-6xl">{service.title}</h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-2xl">{service.subtitle}</p>
          </div>
        </section>

        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
            <div>
              <h2 className="text-3xl font-bold md:text-5xl">What this service covers.</h2>
              <p className="mt-6 text-lg leading-8 text-gray-700 dark:text-gray-300">{service.description}</p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {service.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-primary-700 dark:bg-primary-800">
                    <CheckCircle className="text-green-500" size={18} />
                    <span className="text-sm text-gray-700 dark:text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
            <aside className="rounded-3xl bg-primary-950 p-8 text-white shadow-2xl">
              <div className="flex items-center gap-2 text-accent-300">
                <Star size={18} />
                <span className="text-sm font-semibold uppercase tracking-[0.24em]">Quick facts</span>
              </div>
              <div className="mt-6 space-y-6">
                <div>
                  <p className="text-sm text-white/70">Pricing</p>
                  <p className="mt-2 text-2xl font-bold">{service.pricing}</p>
                </div>
                <div>
                  <p className="text-sm text-white/70">Delivery</p>
                  <p className="mt-2 inline-flex items-center gap-2 text-2xl font-bold"><Clock size={20} /> {service.delivery}</p>
                </div>
              </div>
              <Link href={`/contact?service=${routeService}`} className="mt-8 inline-flex w-full items-center justify-center rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-600">
                Get a quote <ArrowRight className="ml-2" size={18} />
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
