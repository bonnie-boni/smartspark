'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function AdminLoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    if (!response.ok) {
      setError('Invalid credentials')
      return
    }

    const result = await response.json()
    localStorage.setItem('adminToken', result.token)
    router.push('/admin')
  }

  return (
    <div className="min-h-screen bg-white dark:bg-primary-900">
      <Header />
      <main className="flex min-h-[80vh] items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
        <form onSubmit={handleLogin} className="w-full max-w-md rounded-3xl bg-white p-8 shadow-2xl dark:bg-primary-800">
          <h1 className="text-3xl font-bold">Admin login</h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Use the local admin token flow for the revamped app.</p>
          <div className="mt-6 space-y-4">
            <input value={credentials.username} onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))} placeholder="Username" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
            <input type="password" value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} placeholder="Password" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 outline-none focus:border-accent-500 dark:border-primary-700 dark:bg-primary-900" />
          </div>
          {error && <p className="mt-4 text-sm text-red-600">{error}</p>}
          <button type="submit" className="mt-6 w-full rounded-xl bg-accent-500 px-5 py-3 font-semibold text-white transition-colors hover:bg-accent-600">
            Login
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}
