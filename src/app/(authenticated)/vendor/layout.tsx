'use client'

import React from 'react'
import AICManageLayout from '@/components/layouts/AICManageLayout'
import { AuthGuard } from '@/components/guards/AuthGuard'
import { vendorNavigationItems } from '@/common/constants/navigate.constant'

interface VendorLayoutProps {
  children: React.ReactNode
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <AuthGuard requiredRole="vendor">
      <AICManageLayout
        navigationItems={vendorNavigationItems}
        showSearch={true}
        showNotifications={true}
        userRole="vendor"
      >
        {children}
      </AICManageLayout>
    </AuthGuard>
  )
}
