'use client'

import { useState, useEffect } from 'react'
import { Badge } from '@/components/ui/badge'
import { Star, Award, TrendingUp, Sparkles, Shield, Zap, Crown } from 'lucide-react'
import { motion } from 'framer-motion'
import { reviewService } from '@/services/reviews'
import type { ReviewStats } from '@/services/reviews'

interface ProductInfoProps {
  productId: string
  category?: string
  name: string
  brand?: string
  badges?: string[]
  price: number
  salePrice?: number
  colors: any
  brandColors: any
  sku?: string
  selectedVariant?: {
    sku: string
    price?: number
    stockQty: number
  }
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  productId,
  category,
  name,
  brand,
  price,
  badges,
  salePrice,
  colors,
  brandColors,
  sku,
  selectedVariant,
}) => {
  // Only calculate discount when no variant is selected (variants have their own pricing)
  const discountPercentage =
    !selectedVariant && salePrice && price ? Math.round(((price - salePrice) / price) * 100) : 0
  const displaySku = selectedVariant?.sku || sku
  // If variant is selected, use variant price; otherwise use product salePrice or price
  const displayPrice = selectedVariant?.price || salePrice || price
  // Only show sale price if no variant is selected (variants have their own pricing)
  const displaySalePrice = selectedVariant ? undefined : salePrice
  const [reviewStats, setReviewStats] = useState<ReviewStats | null>(null)
  const [loadingStats, setLoadingStats] = useState(true)

  useEffect(() => {
    const fetchReviewStats = async () => {
      try {
        const stats = await reviewService.getProductReviewStats(productId)
        setReviewStats(stats)
      } catch (error) {
        console.error('Failed to load review stats:', error)
      } finally {
        setLoadingStats(false)
      }
    }

    fetchReviewStats()
  }, [productId])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Category & Badges */}
      {displaySalePrice && discountPercentage > 0 && (
        <Badge
          className="px-3 py-1 text-xs font-bold text-white shadow-sm inline-block"
          style={{
            backgroundImage: 'none',
            backgroundColor: colors.accent + '20',
            color: colors.accent,
            borderColor: 'transparent',
          }}
        >
          GIẢM {discountPercentage}%
        </Badge>
      )}

      {/* Product Title & Info */}
      <motion.div
        className="space-y-2"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1
          className="text-2xl lg:text-4xl font-black leading-tight"
          style={{ color: colors.text }}
        >
          {name}
        </h1>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {brand && (
            <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
              <span>Thương hiệu:</span>
              <span className="font-semibold" style={{ color: colors.text }}>
                {brand}
              </span>
            </div>
          )}
          {displaySku && (
            <div className="flex items-center gap-1.5" style={{ color: colors.textSecondary }}>
              <span>SKU:</span>
              <span
                className="font-bold px-2 py-1 rounded text-xs"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  color: colors.text,
                }}
              >
                {displaySku}
              </span>
            </div>
          )}
        </div>
      </motion.div>

      {/* Rating & Price Combined */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="rounded-xl p-4 shadow-md"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {loadingStats ? (
              <div className="flex items-center gap-2">
                <div
                  className="animate-pulse h-4 w-24 rounded"
                  style={{ backgroundColor: colors.border }}
                />
              </div>
            ) : reviewStats && reviewStats.totalReviews > 0 ? (
              <>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4"
                      style={{
                        fill: i < Math.round(reviewStats.averageRating) ? colors.accent : 'none',
                        color:
                          i < Math.round(reviewStats.averageRating) ? colors.accent : colors.border,
                      }}
                    />
                  ))}
                </div>
                <span className="text-sm font-semibold" style={{ color: colors.text }}>
                  {reviewStats.averageRating.toFixed(1)}
                </span>
                <span className="text-xs" style={{ color: colors.textSecondary }}>
                  ({reviewStats.totalReviews} đánh giá)
                </span>
              </>
            ) : (
              <span className="text-xs" style={{ color: colors.textSecondary }}>
                Chưa có đánh giá
              </span>
            )}
          </div>
          {displaySalePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black" style={{ color: colors.accent }}>
                {displaySalePrice.toLocaleString('vi-VN')}
              </span>
              <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                VND
              </span>
              <span className="text-sm line-through ml-2" style={{ color: colors.textSecondary }}>
                {price.toLocaleString('vi-VN')}
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black" style={{ color: colors.accent }}>
                {displayPrice.toLocaleString('vi-VN')}
              </span>
              <span className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                VND
              </span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-3 text-xs" style={{ color: colors.textSecondary }}>
          <Shield className="h-3 w-3" style={{ color: colors.success }} />
          <span>Giá đã bao gồm VAT</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
