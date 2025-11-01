import { OrderDetailPage } from '@/features/vendor/orders/order-detail'

interface PageProps {
  params: Promise<{
    id: string
  }>
}

export default async function VendorOrderDetailPageRoute({ params }: PageProps) {
  const { id } = await params
  return <OrderDetailPage orderId={id} />
}
