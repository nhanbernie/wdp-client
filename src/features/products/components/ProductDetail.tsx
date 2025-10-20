'use client'

import { useTheme } from '@/contexts/ThemeContext'
import { useProductDetail } from '../hooks/useProductDetail'
import { ProductDetailDto } from '../types/products.types'

import { Breadcrumb } from './Breadcrumb'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { ProductQuantity } from './ProductQuantity'
import { ProductTabs } from './ProductTabs'
import { AIRecommendationSection } from './AIRecommendationSection'

interface ProductDetailProps {
  id: string
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { product, loading, error } = useProductDetail(id)
  const { colors, brandColors } = useTheme()

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Đang tải sản phẩm...</p>
      </div>
    )
  if (error || !product?.data)
    return (
      <div className="flex justify-center items-center min-h-screen bg-background text-foreground">
        <p>Không tìm thấy sản phẩm</p>
      </div>
    )

  const productData = product.data as unknown as ProductDetailDto

  return (
    <div className="min-h-screen bg-background transition-colors px-[var(--header-horizontal-padding)]">
      <main className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb
          category={productData.category?.name}
          productName={productData.name}
          colors={colors}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <ProductGallery
            images={productData.images}
            thumbnail={productData.thumbnail}
            name={productData.name}
            colors={colors}
          />

          <div className="space-y-6">
            <ProductInfo
              category={productData.category?.name}
              name={productData.name}
              brand={productData.brand}
              price={productData.price}
              salePrice={productData.salePrice}
              colors={colors}
              brandColors={brandColors}
            />
            <ProductQuantity 
              stock={productData.stock?.quantity} 
              colors={colors} 
              productId={productData.id}
            />
          </div>
        </div>

        <ProductTabs
          description={productData.description}
          specs={productData.specs}
          colors={colors}
        />
        <AIRecommendationSection productId={id} colors={colors} />
      </main>
    </div>
  )
}
export default ProductDetail
