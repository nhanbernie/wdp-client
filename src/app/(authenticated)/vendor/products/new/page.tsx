'use client'

import { ProductFormPage } from '@/features/vendor/product-management/ProductFormPage'
import { useProductManagement } from '@/features/vendor/product-management/hooks/useProductManagement'

export default function NewProductPage() {
  const { createProduct } = useProductManagement()

  const handleSubmit = async (data: any) => {
    await createProduct(data)
  }

  return <ProductFormPage mode="create" onSubmit={handleSubmit} title="Thêm sản phẩm mới" />
}
