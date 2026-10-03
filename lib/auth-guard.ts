'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export function useAuthGuard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const token = localStorage.getItem('adminToken')

    if (!token) {
      router.push('/admin/login')
      return
    }

    fetch('/api/auth/verify', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          localStorage.removeItem('adminToken')
          router.push('/admin/login')
        }
      })
      .catch(() => {
        localStorage.removeItem('adminToken')
        router.push('/admin/login')
      })
      .finally(() => setLoading(false))
  }, [router])

  return { isAuthenticated, loading }
}

export function logout() {
  localStorage.removeItem('adminToken')
  window.location.href = '/admin/login'
}
