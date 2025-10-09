import MainLayout from '@/components/layouts/MainLayout'
import ProductDetail from '@/features/products/components/ProductDetail'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Chi tiết sản phẩm',
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  return <ProductDetail id={id} />
}
