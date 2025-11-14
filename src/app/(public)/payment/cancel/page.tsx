import { PaymentCancelPage } from '@/features/payment/components'
import { Suspense } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hủy thanh toán - AICShop',
  description: 'Thanh toán đơn hàng đã bị hủy',
}

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentCancelPage />
    </Suspense>
  )
}

