'use client'

import { useParams } from 'next/navigation'
import { ProductFormPage } from '@/features/vendor/product-management/ProductFormPage'
import { useProductManagement } from '@/features/vendor/product-management/hooks/useProductManagement'
import { useEffect, useState } from 'react'

export default function EditProductPage() {
  const params = useParams()
  const productId = params.id as string
  const { products, updateProduct } = useProductManagement()
  const [initialData, setInitialData] = useState<any>(null)

  useEffect(() => {
    if (products && productId) {
      const product: any = products.find((p: any) => p.id === productId)
      if (product) {
        setInitialData({
          name: product.name || '',
          slug: product.slug || '',
          categoryId: product.category?.id || '',
          brand: product.brand || '',
          thumbnail: product.thumbnail || '',
          images: product.images?.map?.((img: any) => img.url || img) || [],
          price: product.price || 0,
          salePrice: product.salePrice || null,
          currency: product.currency || 'VND',
          stock: {
            quantity: product.stock?.quantity || 0,
            unit: product.stock?.unit || '',
          },
          badges: product.badges || [],
          specs: product.specs || null,
          options:
            product.options?.map?.((opt: any) => ({
              name: opt.name,
              displayName: opt.displayName,
              values: opt.values.map((v: any) => ({ value: v.value })),
            })) || null,
          variants:
            product.variants?.map?.((variant: any) => ({
              sku: variant.sku,
              options: variant.options,
              price: variant.price,
              stockQty: variant.stockQty,
              specs: variant.specs || null,
            })) || null,
          shortDescription: product.shortDescription || '',
          description: product.description || '',
          datasheetUrl: product.datasheetUrl || null,
        })
      }
    }
  }, [products, productId])

  const handleSubmit = async (data: any) => {
    await updateProduct(productId, data)
  }

  if (!initialData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Đang tải...</p>
      </div>
    )
  }

  return (
    <ProductFormPage
      mode="edit"
      productId={productId}
      initialData={initialData}
      onSubmit={handleSubmit}
      title="Chỉnh sửa sản phẩm"
    />
  )
}
