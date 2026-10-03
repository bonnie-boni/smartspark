export type SiteContact = {
  id: number
  name: string
  email: string
  phone?: string
  service?: string
  message: string
  created_at: string
}

export type BlogPost = {
  id: number
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  featured_image?: string
  status: 'published' | 'draft'
  views: number
  created_at: string
  updated_at: string
}

const now = new Date().toISOString()

const seedPublicPosts = [
  {
    id: 1,
    title: 'The Future of Web Development in 2026',
    slug: 'future-of-web-development-2026',
    excerpt: 'How AI tooling, performance-first frameworks, and design systems are reshaping the modern web.',
    content:
      'Web development continues to move toward faster, more intentional experiences. Teams that combine strong design systems, AI-assisted workflows, and lean architecture will ship better products with less friction.',
    author: { name: 'SmartSpark Team' },
    createdAt: now,
    published: true,
    category: 'Web Development',
    views: 18,
  },
  {
    id: 2,
    title: 'AI Automation for Small Teams',
    slug: 'ai-automation-for-small-teams',
    excerpt: 'Practical ways to automate repetitive work without adding complexity.',
    content:
      'Small teams can unlock outsized leverage by automating lead capture, email follow-up, content scheduling, and support triage. The goal is not more automation for its own sake, but fewer manual bottlenecks.',
    author: { name: 'SmartSpark Team' },
    createdAt: now,
    published: true,
    category: 'AI & Automation',
    views: 11,
  },
]

let publicPosts = [...seedPublicPosts]
let adminPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The Future of Web Development in 2026',
    slug: 'future-of-web-development-2026',
    content:
      'Web development continues to move toward faster, more intentional experiences. Teams that combine strong design systems, AI-assisted workflows, and lean architecture will ship better products with less friction.',
    excerpt: 'How AI tooling, performance-first frameworks, and design systems are reshaping the modern web.',
    category: 'Web Development',
    featured_image: '/images/backgrounds/1.jpg',
    status: 'published',
    views: 18,
    created_at: now,
    updated_at: now,
  },
  {
    id: 2,
    title: 'Digital Marketing That Actually Converts',
    slug: 'digital-marketing-that-actually-converts',
    content:
      'Good marketing compounds when it is focused, measurable, and designed around a real customer journey. Clear positioning and useful content outperform noise every time.',
    excerpt: 'A practical framework for campaigns that drive qualified leads.',
    category: 'Digital Marketing',
    featured_image: '/images/backgrounds/2.webp',
    status: 'draft',
    views: 3,
    created_at: now,
    updated_at: now,
  },
]

let contacts: SiteContact[] = []
let quotes: SiteContact[] = []
let nextContactId = 1
let nextQuoteId = 1
let nextAdminPostId = 3

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value)) as T

export function listPublishedPosts() {
  return clone(publicPosts.filter((post) => post.published).sort((left, right) => right.createdAt.localeCompare(left.createdAt)))
}

export function getPublishedPostBySlug(slug: string) {
  const post = publicPosts.find((item) => item.slug === slug && item.published)
  if (!post) {
    return null
  }

  post.views += 1
  return clone(post)
}

export function listAdminPosts() {
  return clone(adminPosts.sort((left, right) => right.created_at.localeCompare(left.created_at)))
}

const toSlug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')

export function createAdminPost(input: {
  title: string
  slug?: string
  content: string
  excerpt?: string
  category?: string
  published?: boolean
}) {
  const nowIso = new Date().toISOString()
  const post: BlogPost = {
    id: nextAdminPostId,
    title: input.title,
    slug: input.slug?.trim() || toSlug(input.title),
    content: input.content,
    excerpt: input.excerpt || '',
    category: input.category || 'General',
    featured_image: undefined,
    status: input.published ? 'published' : 'draft',
    views: 0,
    created_at: nowIso,
    updated_at: nowIso,
  }

  nextAdminPostId += 1
  adminPosts = [post, ...adminPosts]
  return clone(post)
}

export function updateAdminPost(
  id: number,
  input: {
    title: string
    slug?: string
    content: string
    excerpt?: string
    category?: string
    published?: boolean
  },
) {
  const post = adminPosts.find((item) => item.id === id)
  if (!post) {
    return null
  }

  post.title = input.title
  post.slug = input.slug?.trim() || toSlug(input.title)
  post.content = input.content
  post.excerpt = input.excerpt || ''
  post.category = input.category || 'General'
  post.status = input.published ? 'published' : 'draft'
  post.updated_at = new Date().toISOString()

  return clone(post)
}

export function deleteAdminPost(id: number) {
  adminPosts = adminPosts.filter((item) => item.id !== id)
}

export function addContact(input: { name: string; email: string; phone?: string; service?: string; message: string }) {
  const contact: SiteContact = {
    id: nextContactId,
    name: input.name,
    email: input.email,
    phone: input.phone,
    service: input.service,
    message: input.message,
    created_at: new Date().toISOString(),
  }

  nextContactId += 1
  contacts = [contact, ...contacts]
  return clone(contact)
}

export function addQuote(input: { name: string; email: string; phone?: string; service?: string; message: string }) {
  const quote: SiteContact = {
    id: nextQuoteId,
    name: input.name,
    email: input.email,
    phone: input.phone,
    service: input.service,
    message: input.message,
    created_at: new Date().toISOString(),
  }

  nextQuoteId += 1
  quotes = [quote, ...quotes]
  return clone(quote)
}

export function listContacts() {
  return clone(contacts)
}

export function listQuotes() {
  return clone(quotes)
}

export function listSubmissions() {
  return {
    contacts: listContacts(),
    quotes: listQuotes(),
  }
}

export function listProjects() {
  return [
    {
      id: 1,
      title: 'E-commerce Platform for African Fashion',
      category: 'web',
      client: 'Ankara Styles Co.',
      description: 'Complete e-commerce solution with payment integration, inventory management, and mobile-responsive design.',
      image: '/images/portfolio/ecommerce.jpg',
      tags: ['React', 'Node.js', 'Stripe', 'MongoDB'],
    },
    {
      id: 2,
      title: 'Brand Identity for Fintech Startup',
      category: 'design',
      client: 'PayFlow Africa',
      description: 'Complete brand identity including logo, color palette, typography, and marketing materials.',
      image: '/images/portfolio/brand-identity.jpg',
      tags: ['Brand Design', 'Logo', 'Marketing Materials', 'Style Guide'],
    },
  ]
}

export function verifyAdminToken(token: string | null) {
  return token === 'smartspark-admin-token'
}

export function getAdminStats() {
  return {
    contacts: contacts.length,
    quotes: quotes.length,
    posts: adminPosts.length,
    projects: listProjects().length,
  }
}
