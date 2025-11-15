'use client'

import React from 'react'
import Link from 'next/link'
import { useTheme } from '@/contexts/ThemeContext'
import { useProductDetail } from '../hooks/useProductDetail'
import { ProductDetailDto, ProductVariant } from '../types/products.types'

import { Breadcrumb } from './Breadcrumb'
import { ProductGallery } from './ProductGallery'
import { ProductInfo } from './ProductInfo'
import { ProductQuantity } from './ProductQuantity'
import { ProductTabs } from './ProductTabs'
import { ProductVariants } from './ProductVariants'
import { AIRecommendationSection } from './AIRecommendationSection'
import { VendorInfo } from '@/features/vendors'

interface ProductDetailProps {
  id: string
}

const ProductDetail: React.FC<ProductDetailProps> = ({ id }) => {
  const { product, loading, error } = useProductDetail(id)
  const { colors, brandColors } = useTheme()
  const [selectedVariant, setSelectedVariant] = React.useState<ProductVariant | null>(null)

  if (loading)
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen"
        style={{ backgroundColor: colors.background }}
      >
        <div className="relative">
          {/* Animated circles */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-24 h-24 border-4 rounded-full animate-ping"
              style={{ borderColor: `${colors.accent}40` }}
            ></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="w-20 h-20 border-4 rounded-full animate-spin"
              style={{ borderColor: `${colors.accent}40` }}
            ></div>
          </div>

          {/* Icon container */}
          <div
            className="relative w-24 h-24 rounded-full flex items-center justify-center shadow-2xl"
            style={{ backgroundColor: colors.accent }}
          >
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
          <h3 className="text-2xl font-bold" style={{ color: colors.text }}>
            Đang tải sản phẩm
          </h3>
          <p className="text-sm font-medium" style={{ color: colors.textSecondary }}>
            Vui lòng chờ trong giây lát...
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex gap-2 mt-6">
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{ backgroundColor: colors.accent }}
          ></div>
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              backgroundColor: colors.accentSecondary,
              animationDelay: '0.1s',
            }}
          ></div>
          <div
            className="w-3 h-3 rounded-full animate-bounce"
            style={{
              backgroundColor: colors.accent,
              animationDelay: '0.2s',
            }}
          ></div>
        </div>
      </div>
    )
  if (error || !product?.data)
    return (
      <div
        className="flex flex-col justify-center items-center min-h-screen px-4"
        style={{ backgroundColor: colors.background }}
      >
        <div
          className="max-w-md w-full rounded-3xl shadow-2xl border p-8 text-center"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          {/* Error icon */}
          <div
            className="mx-auto w-24 h-24 rounded-full flex items-center justify-center shadow-xl mb-6"
            style={{ backgroundColor: colors.error }}
          >
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
          <h3 className="text-2xl font-bold mb-3" style={{ color: colors.text }}>
            Không tìm thấy sản phẩm
          </h3>
          <p className="text-sm mb-8 leading-relaxed" style={{ color: colors.textSecondary }}>
            Sản phẩm bạn đang tìm kiếm không tồn tại hoặc đã bị xóa khỏi hệ thống.
          </p>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="/categories"
              className="flex-1 px-6 py-3 text-white font-bold rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: colors.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.accentSecondary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent
              }}
            >
              Xem danh mục
            </a>
            <Link
              href="/"
              className="flex-1 px-6 py-3 font-bold rounded-xl transition-all duration-300"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
                color: colors.text,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.hoverBackground
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
              }}
            >
              Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    )

  const productData = product.data as unknown as ProductDetailDto

  console.log('ProductDetail - productData:', productData)
  console.log('ProductDetail - vendor:', productData.vendor)

  return (
    <div
      className="min-h-screen transition-colors px-[var(--header-horizontal-padding)]"
      style={{ backgroundColor: colors.background }}
    >
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
              productId={productData.id}
              category={productData.category?.name}
              name={productData.name}
              badges={productData.badges}
              brand={productData.brand}
              price={productData.price}
              salePrice={productData.salePrice}
              colors={colors}
              brandColors={brandColors}
              selectedVariant={
                selectedVariant
                  ? {
                      sku: selectedVariant.sku,
                      price: selectedVariant.price,
                      stockQty: selectedVariant.stockQty,
                    }
                  : undefined
              }
            />

            {/* Variants Section */}
            {productData.variants && productData.variants.length > 0 && (
              <ProductVariants
                variants={productData.variants}
                options={productData.options}
                colors={colors}
                onVariantSelect={(variant) => setSelectedVariant(variant)}
                selectedVariantId={selectedVariant?.id}
              />
            )}

            <ProductQuantity
              stock={selectedVariant?.stockQty || productData.stock?.quantity}
              colors={colors}
              productId={productData.id}
              variantId={selectedVariant?.id}
              hasVariants={productData.variants && productData.variants.length > 0}
              selectedVariant={selectedVariant}
            />
          </div>
        </div>

        {/* Vendor Information Section */}
        {productData.vendor && (
          <VendorInfo
            vendorId={productData.vendor.id}
            vendorName={productData.vendor.businessName}
          />
        )}

        <ProductTabs
          productId={id}
          description={productData.description}
          specs={productData.specs}
          colors={colors}
          variants={productData.variants}
        />
        <AIRecommendationSection productId={id} />
      </main>
    </div>
  )
}
export default ProductDetail
