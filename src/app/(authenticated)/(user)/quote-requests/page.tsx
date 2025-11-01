import { MyQuoteRequestsPage } from '@/features/quote-requests'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Yêu cầu báo giá của tôi | AIC Store',
  description: 'Quản lý các yêu cầu báo giá bạn đã gửi',
}

export default function QuoteRequestsPageRoute() {
  return <MyQuoteRequestsPage />
}
