import { NextResponse } from 'next/server'

// POST /api/chat
// Body: { message: string, compose?: boolean }
// Optional env variables to enable GROQ-backed search:
// - GROQ_API_URL: full GROQ HTTP endpoint (example: Sanity data query endpoint)
// - GROQ_API_TOKEN: optional bearer token for the GROQ endpoint
// If GROQ is not configured or the query fails, the route falls back to safe canned answers.

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const message = String(body?.message || '')
    const compose = Boolean(body?.compose)

    if (!message) {
      return NextResponse.json({ error: 'No message provided' }, { status: 400 })
    }

    const GROQ_API_URL = process.env.GROQ_API_URL
    const GROQ_API_TOKEN = process.env.GROQ_API_TOKEN
    const SANITY_PROJECT_ID = process.env.SANITY_PROJECT_ID
    const SANITY_DATASET = process.env.SANITY_DATASET

    let results: any[] = []

    // If a full GROQ URL is provided, use it. Otherwise, attempt to construct
    // a Sanity-style GROQ endpoint from SANITY_PROJECT_ID and SANITY_DATASET
    const effectiveGroqUrl = GROQ_API_URL
      || (SANITY_PROJECT_ID && SANITY_DATASET
        ? `https://${SANITY_PROJECT_ID}.api.sanity.io/v2023-10-12/data/query/${SANITY_DATASET}`
        : undefined)

    if (effectiveGroqUrl) {
      try {
        // build a simple GROQ query to find relevant content by matching title/description/body
        const safeTerm = message.replace(/"/g, "'")
        const groqQuery = `*[_type in ["service","blog","project","page"] && (title match "${safeTerm}" || description match "${safeTerm}" || body match "${safeTerm}")]{_type,title,description,slug}[0...6]`
        const url = `${effectiveGroqUrl}?query=${encodeURIComponent(groqQuery)}`
        const headers: Record<string, string> = { Accept: 'application/json' }
        if (GROQ_API_TOKEN) headers.Authorization = `Bearer ${GROQ_API_TOKEN}`

        // log which endpoint we attempted (server-side only)
        console.log('[chat] querying GROQ endpoint:', effectiveGroqUrl)

        const r = await fetch(url, { headers })
        const json = await r.json()
        // Sanity-like responses put results in `result`, but different endpoints may return direct arrays
        results = json.result || json || []
        if (!Array.isArray(results)) results = []
      } catch (e) {
        // ignore GROQ errors and fall back to canned answers below
        results = []
      }
    }

    let answer = ''

    if (results.length > 0) {
      // Summarize found items (only safe fields)
      const lines = results.map((it: any) => {
        const title = it.title || it._id || 'Untitled'
        const desc = it.description ? String(it.description).slice(0, 160) : ''
        const slug = it.slug?.current || it.slug || ''
        const path = slug ? `/${it._type}/${slug}` : ''
        return `• ${title}${path ? ` (${path})` : ''}${desc ? ` — ${desc}` : ''}`
      })
      answer = `Here are relevant SmartSpark items I found:\n\n${lines.join('\n')}\n\nIf you'd like, I can draft a short message referencing any of these.`
    } else {
      const lower = message.toLowerCase()
      if (lower.includes('service') || lower.includes('what do you do')) {
        answer = 'SmartSpark offers web development, AI automation, design, marketing, and contact-workflow integrations. Tell me which area you want to explore and I will give more details.'
      } else if (lower.includes('price') || lower.includes('cost') || lower.includes('quote')) {
        answer = 'Pricing depends on scope, timeline, and deliverables. Share an outline of your project and I will suggest the right service and an estimated range.'
      } else if (lower.includes('contact') || lower.includes('reach')) {
        answer = 'Use the site contact page or the Get a Quote button in the header to send a request; include a short summary of goals and timeline.'
      } else if (lower.includes('ai') || lower.includes('artificial intelligence')) {
        answer = 'AI automation and assistants are part of our offerings: data pipelines, assistant agents, and workflow automation to reduce manual work.'
      } else {
        answer = "I can help with SmartSpark services, pricing, portfolio, or draft messages. Ask a specific question about the site or request a draft message."
      }
    }

    let draft: string | null = null
    if (compose) {
      // produce a short, neutral draft the user can copy/send
      draft = `Hi,\n\nI'm reaching out because I'm interested in ${message}. Could you share a brief scope, an estimated timeline, and ballpark pricing? Thank you!\n\n[Your name]`
    }

    return NextResponse.json({ answer, draft })
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
