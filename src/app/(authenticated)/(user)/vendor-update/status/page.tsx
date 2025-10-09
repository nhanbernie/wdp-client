'use client'

import { VendorStatusPage } from '@/features/vendor/status'
import { AuthGuard } from '@/components/guards/AuthGuard'

export default function VendorStatusRoute() {
  return (
    <AuthGuard requiredRole="vendor" requiredApprovedStatus="pending">
      <VendorStatusPage />
    </AuthGuard>
  )
}
