'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ComponentType,
  type ReactNode
} from 'react'
import { AlertCircle, CheckCircle, X } from 'lucide-react'

type ToastIntent = 'success' | 'error'

export interface Toast {
  id: string
  intent: ToastIntent
  title: string
  description?: string
  duration?: number
  dismissed?: boolean
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (input: Omit<Toast, 'id'>) => void
  dismissToast: (id: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

let nextToastId = 0
const DEFAULT_DURATION = 4000

const ICONS: Record<ToastIntent, ComponentType<{ size?: number }>> = {
  success: CheckCircle,
  error: AlertCircle
}

const ACCENTS: Record<ToastIntent, string> = {
  success: '#10b981',
  error: '#ef4444'
}

const LABELS: Record<ToastIntent, string> = {
  success: 'Success',
  error: 'Error'
}

function ToastItem({ toast, dismissToast }: { toast: Toast; dismissToast: (id: string) => void }) {
  const [entering, setEntering] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setEntering(false), 60)
    return () => clearTimeout(timer)
  }, [])

  const accent = ACCENTS[toast.intent]
  const Icon = ICONS[toast.intent]
  const visible = entering ? 'opacity-0 translate-y-[20px]' : 'opacity-100 translate-y-0'

  return (
    <div
      className={`pointer-events-auto w-full max-w-xs rounded-lg border border-[#2a2a3d] border-l-4 bg-[#09090e]/80 backdrop-blur-md p-4 shadow-2xl transition-all duration-300 ease-out ${visible}`}
      style={{ borderLeftColor: accent }}
    >
      <div className="flex items-start gap-3">
        <div className={`shrink-0 mt-0.5 ${toast.intent === 'success' ? 'text-[#10b981]' : 'text-[#ef4444]'}`}>
          <Icon size={17} />
        </div>
        <div className="flex flex-col leading-tight text-sm">
          <span className="font-semibold" style={{ color: accent }}>
            {LABELS[toast.intent]}
          </span>
          <span className="mt-1 text-[#6b7280]">{toast.title}</span>
          {toast.description && (
            <span className="mt-1 text-xs text-[#6b7280]">{toast.description}</span>
          )}
        </div>
      </div>
      <button
        onClick={(event) => {
          event.stopPropagation()
          dismissToast(toast.id)
        }}
        className="absolute right-2 top-2 rounded-sm p-1 text-[#6b7280] hover:text-white transition-colors"
        aria-label="Dismiss notification"
      >
        <span className="sr-only">Dismiss</span>
        <X size={15} />
      </button>
    </div>
  )
}

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts((current) =>
      current.map((toast) => (toast.id === id ? { ...toast, dismissed: true } : toast))
    )
    setTimeout(() => setToasts((current) => current.filter((toast) => toast.id !== id)), 300)
  }, [])

  const addToast = useCallback(
    (input: Omit<Toast, 'id'>) => {
      const id = String(++nextToastId)
      const toast: Toast = { ...input, id }
      setToasts((current) => [toast, ...current])
      const duration = input.duration ?? DEFAULT_DURATION
      if (duration > 0) {
        setTimeout(() => dismissToast(id), duration)
      }
      return id
    },
    [dismissToast]
  )

  const value = useMemo<ToastContextValue>(
    () => ({ toasts, addToast, dismissToast }),
    [toasts, addToast, dismissToast]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        aria-live="polite"
        aria-atomic="true"
        className="fixed bottom-4 right-4 z-[60] flex flex-col gap-2 pointer-events-none sm:bottom-6 sm:right-6"
      >
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} dismissToast={dismissToast} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider.')
  }
  return context
}