'use client'

import ErrorBoundary from '../components/ErrorBoundary'
import { ThemeProvider } from '../lib/ThemeContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <ThemeProvider>{children}</ThemeProvider>
    </ErrorBoundary>
  )
}