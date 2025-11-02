'use client'

import { useParams, useRouter } from 'next/navigation'
import { ProductDetailPage } from '@/features/vendor/product-management'
import { useGetProductDetailQuery } from '@/services/vendor/vendor.service'

export default function ProductDetailPageRoute() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string

  // Fetch product detail
  const { data: productData, isLoading, error } = useGetProductDetailQuery(productId)
  const product = productData?.data

  const handleEdit = (product: any) => {
    router.push(`/vendor/product-management/${product.id}/edit`)
  }

  const handleDelete = async (id: string) => {
    // Will be handled by the component
    router.push('/vendor/product-management')
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-muted-foreground">Đang tải sản phẩm...</div>
      </div>
    )
  }

  if (error || !product) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Không tìm thấy sản phẩm</h1>
        <p className="text-muted-foreground">
          {error
            ? 'Đã xảy ra lỗi khi tải thông tin sản phẩm'
            : 'Sản phẩm không tồn tại hoặc đã bị xóa'}
        </p>
        <button
          onClick={() => router.push('/vendor/product-management')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    )
  }

  return <ProductDetailPage product={product} onEdit={handleEdit} onDelete={handleDelete} />
}
