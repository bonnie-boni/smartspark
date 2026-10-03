'use client'

import { useEffect, useState } from 'react'
import { useAuthGuard } from '../../../lib/auth-guard'

export default function AdminContactsPage() {
  const { isAuthenticated, loading } = useAuthGuard()
  const [contacts, setContacts] = useState<any[]>([])

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    fetch('/api/contacts-list')
      .then((response) => response.json())
      .then((data) => setContacts(Array.isArray(data) ? data : []))
      .catch(() => setContacts([]))
  }, [isAuthenticated])

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-bold">Contact submissions</h1>
        <p className="mt-2 text-gray-600">Loaded from the local mock API store.</p>
        <div className="mt-8 space-y-4">
          {contacts.map((contact) => (
            <article key={contact.id} className="rounded-2xl border border-gray-200 p-5">
              <h2 className="text-lg font-bold">{contact.name}</h2>
              <p className="text-sm text-gray-600">{contact.email}</p>
              <p className="mt-3 text-sm text-gray-700">{contact.message}</p>
            </article>
          ))}
          {contacts.length === 0 && <div className="rounded-2xl bg-gray-50 p-10 text-center text-gray-600">No contact submissions yet.</div>}
        </div>
      </div>
    </div>
  )
}
