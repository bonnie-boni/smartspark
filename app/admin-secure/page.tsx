'use client'

import { useEffect, useState } from 'react'

export default function SecureAdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [data, setData] = useState<{ contacts: any[]; quotes: any[] } | null>(null)

  useEffect(() => {
    if (!authenticated) {
      return
    }

    fetch('/api/admin/submissions')
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch(() => setData({ contacts: [], quotes: [] }))
  }, [authenticated])

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
        <form
          onSubmit={(event) => {
            event.preventDefault()
            setAuthenticated(password === 'SmartSpark2026!')
          }}
          className="w-full max-w-md rounded-3xl bg-slate-800 p-8 text-white shadow-2xl"
        >
          <h1 className="text-3xl font-bold">Secure admin</h1>
          <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" placeholder="Password" className="mt-6 w-full rounded-xl border border-white/10 bg-slate-900 px-4 py-3 outline-none" />
          <button type="submit" className="mt-4 w-full rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white">Enter</button>
        </form>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-10 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl bg-slate-800 p-8 shadow-2xl">
        <h1 className="text-3xl font-bold">SmartSpark secure dashboard</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">Contacts</p>
            <p className="mt-3 text-4xl font-bold">{data?.contacts.length || 0}</p>
          </div>
          <div className="rounded-2xl bg-slate-900 p-6">
            <p className="text-sm uppercase tracking-[0.24em] text-white/60">Quotes</p>
            <p className="mt-3 text-4xl font-bold">{data?.quotes.length || 0}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
