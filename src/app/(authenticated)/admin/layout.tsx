'use client'

import React from 'react'
import AICManageLayout from '@/components/layouts/AICManageLayout'
import { AuthGuard } from '@/components/guards/AuthGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthGuard requiredRole="admin">
      <AICManageLayout userRole="admin">{children}</AICManageLayout>
    </AuthGuard>
  )
}
