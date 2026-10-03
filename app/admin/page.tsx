'use client'

import { Users, MessageSquare, FolderOpen } from 'lucide-react'
import { useAuthGuard, logout } from '../../lib/auth-guard'

export default function AdminDashboardPage() {
  const { isAuthenticated, loading } = useAuthGuard()

  if (loading) {
    return <div className="flex min-h-screen items-center justify-center">Loading...</div>
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="border-b bg-white shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <button onClick={logout} className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700">
            Logout
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <MessageSquare className="text-blue-600" size={32} />
              <div>
                <p className="text-2xl font-bold">/api/admin/submissions</p>
                <p className="text-sm text-gray-600">Contact and quote data</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <FolderOpen className="text-green-600" size={32} />
              <div>
                <p className="text-2xl font-bold">/api/blog-simple</p>
                <p className="text-sm text-gray-600">Blog management data</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="flex items-center gap-4">
              <Users className="text-purple-600" size={32} />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-gray-600">Admin user</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Quick actions</h2>
            <div className="mt-4 space-y-3">
              <a href="/admin/contacts" className="block rounded-lg bg-blue-600 p-3 text-white hover:bg-blue-700">Manage contacts</a>
              <a href="/admin/blog" className="block rounded-lg bg-green-600 p-3 text-white hover:bg-green-700">Manage blog</a>
              <a href="/admin-secure" className="block rounded-lg bg-purple-600 p-3 text-white hover:bg-purple-700">Open secure dashboard</a>
            </div>
          </div>
          <div className="rounded-2xl bg-white p-6 shadow">
            <h2 className="text-xl font-bold">Recent activity</h2>
            <div className="mt-4 space-y-2 text-sm text-gray-600">
              <p>• New contact message received</p>
              <p>• Portfolio updated</p>
              <p>• Blog workflow prepared</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
