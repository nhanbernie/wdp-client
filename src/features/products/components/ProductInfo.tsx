'use client'

import { Badge } from '@/components/ui/badge'
import { Star, Award, TrendingUp, Sparkles, Shield, Zap, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductInfoProps {
  category?: string
  name: string
  brand?: string
  price: number
  salePrice?: number
  colors: any
  brandColors: any
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  name,
  brand,
  price,
  salePrice,
  colors,
  brandColors,
}) => {
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-4"
    >
      {/* Category & Badges */}
      {salePrice && (
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
        {brand && (
          <div
            className="flex items-center gap-1.5 text-sm"
            style={{ color: colors.textSecondary }}
          >
            <span>Thương hiệu:</span>
            <span className="font-semibold" style={{ color: colors.text }}>
              {brand}
            </span>
          </div>
        )}
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
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4"
                  style={{
                    fill: i < 4 ? colors.textSecondary : 'none',
                    color: i < 4 ? colors.textSecondary : colors.border,
                  }}
                />
              ))}
            </div>
            <span className="text-sm font-semibold" style={{ color: colors.text }}>
              4.0
            </span>
            <span className="text-xs" style={{ color: colors.textSecondary }}>
              (12 đánh giá)
            </span>
          </div>
          {salePrice ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-black" style={{ color: colors.accent }}>
                {salePrice.toLocaleString('vi-VN')}
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
                {price.toLocaleString('vi-VN')}
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
