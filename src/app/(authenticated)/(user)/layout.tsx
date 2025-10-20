'use client'

import AICMainLayout from '@/components/layouts/second-layout/AICMainLayout'
import { AuthGuard } from '@/components/guards/AuthGuard'
import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="user">
      <AICMainLayout>{children}</AICMainLayout>
    </AuthGuard>
  )
}
