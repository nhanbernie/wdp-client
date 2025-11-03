'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle, Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { cn } from '@/lib/utils'

export type ToastType = 'success' | 'error' | 'warning' | 'info' | 'loading'

export interface Toast {
  id: string
  type: ToastType
  message: string
  description?: string
  duration?: number
}

interface ToastProps {
  toast: Toast
  onDismiss: (id: string) => void
}

const ToastIcon = ({ type, color }: { type: ToastType; color: string }) => {
  const iconClass = 'w-5 h-5'
  
  switch (type) {
    case 'success':
      return <CheckCircle2 className={iconClass} style={{ color }} />
    case 'error':
      return <AlertCircle className={iconClass} style={{ color }} />
    case 'warning':
      return <AlertTriangle className={iconClass} style={{ color }} />
    case 'info':
      return <Info className={iconClass} style={{ color }} />
    case 'loading':
      return <Loader2 className={cn(iconClass, 'animate-spin')} style={{ color }} />
    default:
      return null
  }
}

const ToastItem: React.FC<ToastProps> = ({ toast, onDismiss }) => {
  const { colors, theme } = useTheme()

  const getToastStyles = () => {
    const bgColor = colors.cardBackground
    
    switch (toast.type) {
      case 'success':
        return {
          borderColor: colors.success || '#10b981',
          bgColor,
          iconColor: colors.success || '#10b981',
        }
      case 'error':
        return {
          borderColor: colors.error || '#ef4444',
          bgColor,
          iconColor: colors.error || '#ef4444',
        }
      case 'warning':
        return {
          borderColor: colors.warning || '#f59e0b',
          bgColor,
          iconColor: colors.warning || '#f59e0b',
        }
      case 'info':
        return {
          borderColor: colors.accent || '#3b82f6',
          bgColor,
          iconColor: colors.accent || '#3b82f6',
        }
      case 'loading':
        return {
          borderColor: colors.border,
          bgColor,
          iconColor: colors.textSecondary,
        }
      default:
        return {
          borderColor: colors.border,
          bgColor,
          iconColor: colors.textSecondary,
        }
    }
  }

  const styles = getToastStyles()

  return (
    <motion.div
      initial={{ opacity: 0, y: -20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
      className={cn(
        'relative flex items-start gap-3 p-4 rounded-xl border-2 shadow-lg',
        'min-w-[320px] max-w-[420px]',
      )}
      style={{
        backgroundColor: styles.bgColor,
        borderColor: styles.borderColor,
        color: colors.text,
      }}
    >
      <div className="flex-shrink-0 mt-0.5">
        <ToastIcon type={toast.type} color={styles.iconColor} />
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold" style={{ color: colors.text }}>
          {toast.message}
        </p>
        {toast.description && (
          <p className="text-xs mt-1" style={{ color: colors.textSecondary }}>
            {toast.description}
          </p>
        )}
      </div>

      <button
        onClick={() => onDismiss(toast.id)}
        className="flex-shrink-0 p-1 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
        style={{ color: colors.textSecondary }}
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  )
}

export default ToastItem

