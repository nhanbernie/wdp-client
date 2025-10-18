import { PaymentCancelPage } from '@/features/payment/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hủy thanh toán - AICShop',
  description: 'Thanh toán đơn hàng đã bị hủy',
}

export default function Page() {
  return <PaymentCancelPage />
}
