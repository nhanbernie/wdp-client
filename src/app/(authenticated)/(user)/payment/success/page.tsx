import { PaymentSuccessPage } from '@/features/payment/components'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Thanh toán thành công - AICShop',
  description: 'Thanh toán đơn hàng thành công',
}

export default function Page() {
  return <PaymentSuccessPage />
}
