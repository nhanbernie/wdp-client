'use client'

import React from 'react'
import AICManageLayout from '@/components/layouts/AICManageLayout'
import { vendorNavigationItems } from '@/common/constants/navigate.constant'

interface VendorLayoutProps {
  children: React.ReactNode
}

export default function VendorLayout({ children }: VendorLayoutProps) {
  return (
    <AICManageLayout
      navigationItems={vendorNavigationItems}
      showSearch={true}
      showNotifications={true}
      userRole="vendor"
      fullWidth={true}
    >
      {children}
    </AICManageLayout>
  )
}
