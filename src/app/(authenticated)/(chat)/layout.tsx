'use client'

import React from 'react'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { useTheme } from '@/contexts/ThemeContext'

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  const { colors } = useTheme()

  return (
    <AuthGuard>
      <div
        className="h-screen flex overflow-hidden w-full"
        style={{ backgroundColor: colors.background }}
      >
        {children}
      </div>
    </AuthGuard>
  )
}

