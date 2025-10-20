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
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="relative">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-4 border-indigo-200 rounded-full animate-ping"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 border-4 border-t-indigo-600 border-r-purple-600 border-b-indigo-600 border-l-purple-600 rounded-full animate-spin"></div>
          </div>

          {/* Icon container */}
          <div className="relative w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl shadow-indigo-300">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
              />
            </svg>
          </div>
        </div>

        {/* Text */}
        <div className="mt-8 text-center space-y-2">
          <h3 className="text-2xl font-bold text-slate-900">Đang tải sản phẩm</h3>
          <p className="text-sm text-slate-600 font-medium">Vui lòng chờ trong giây lát...</p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 mt-6">
          <div className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.1s' }}
          ></div>
          <div
            className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
            style={{ animationDelay: '0.2s' }}
          ></div>
        </div>
      </div>
    )
  if (error || !product?.data)
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 text-center">
          {/* Error icon */}
          <div className="mx-auto w-24 h-24 bg-gradient-to-br from-red-500 to-pink-600 rounded-full flex items-center justify-center shadow-xl shadow-red-300 mb-6">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>

          {/* Error message */}
          <h3 className="text-2xl font-bold text-slate-900 mb-3">Không tìm thấy sản phẩm</h3>
          <p className="text-sm text-slate-600 mb-8 leading-relaxed">
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/categories"
              className="flex-1 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-xl shadow-lg shadow-indigo-300 transition-all duration-300 hover:scale-105"
            >
              Xem danh mục
            </a>
            <a
              href="/"
              className="flex-1 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-900 font-bold rounded-xl transition-all duration-300"
            >
              Về trang chủ
            </a>
          </div>
        </div>
      </div>
    )

  const productData = product.data as unknown as ProductDetailDto

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-colors px-[var(--header-horizontal-padding)]">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          category={productData.category?.name}
          productName={productData.name}
          colors={colors}
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
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
