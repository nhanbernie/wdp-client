'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import ToastItem, { type Toast, type ToastType } from '@/components/common/Toast'

interface ToastContextType {
  success: (message: string, description?: string) => void
  error: (message: string, description?: string) => void
  warning: (message: string, description?: string) => void
  info: (message: string, description?: string) => void
  loading: (message: string) => string
  dismiss: (id: string) => void
  dismissAll: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback(
    (type: ToastType, message: string, description?: string, duration: number = 4000) => {
      const id = `toast-${Date.now()}-${Math.random()}`
      const toast: Toast = {
        id,
        type,
        message,
        description,
        duration,
      }

      setToasts((prev) => [...prev, toast])

      // Auto dismiss after duration (except loading)
      if (type !== 'loading' && duration > 0) {
        setTimeout(() => {
          setToasts((prev) => prev.filter((t) => t.id !== id))
        }, duration)
      }

      return id
    },
    [],
  )

  const success = useCallback(
    (message: string, description?: string) => {
      showToast('success', message, description)
    },
    [showToast],
  )

  const error = useCallback(
    (message: string, description?: string) => {
      showToast('error', message, description)
    },
    [showToast],
  )

  const warning = useCallback(
    (message: string, description?: string) => {
      showToast('warning', message, description)
    },
    [showToast],
  )

  const info = useCallback(
    (message: string, description?: string) => {
      showToast('info', message, description)
    },
    [showToast],
  )

  const loading = useCallback(
    (message: string) => {
      return showToast('loading', message, undefined, 0) // Loading toasts don't auto-dismiss
    },
    [showToast],
  )

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  const dismissAll = useCallback(() => {
    setToasts([])
  }, [])

  const value: ToastContextType = {
    success,
    error,
    warning,
    info,
    loading,
    dismiss,
    dismissAll,
  }

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed top-4 right-4 z-[9999] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map((toast) => (
            <div key={toast.id} className="pointer-events-auto">
              <ToastItem toast={toast} onDismiss={dismiss} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  )
}

export const useToast = () => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

