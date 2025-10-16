import { CheckoutPage } from '@/features/cart/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thanh toán - WDP Materials',
  description: 'Thanh toán đơn hàng',
}

export default function Page() {
  return <CheckoutPage />
}
