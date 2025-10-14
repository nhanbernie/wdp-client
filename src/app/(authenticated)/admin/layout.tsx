import React from 'react'
import AICManageLayout from '@/components/layouts/AICManageLayout'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <AICManageLayout userRole="admin">{children}</AICManageLayout>
}
