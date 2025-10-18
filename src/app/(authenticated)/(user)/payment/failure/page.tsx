import { PaymentFailurePage } from '@/features/payment/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thanh toán thất bại - AICShop',
  description: 'Thanh toán đơn hàng thất bại',
}

export default function Page() {
  return <PaymentFailurePage />
}
