'use client'

import React from 'react'
import Image from 'next/image'
import { Star, ShoppingCart, Package } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { VendorProductDto } from '../types/vendors.types'

interface Props {
  products: VendorProductDto[]
  onOpenProduct?: (id: string) => void
  viewMode?: 'grid' | 'list'
}

export const VendorProductsGrid: React.FC<Props> = ({
  products,
  onOpenProduct,
  viewMode = 'grid',
}) => {
  const { colors } = useTheme()

  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return 0
    return Math.round(((originalPrice - price) / originalPrice) * 100)
  }

  return (
    <div
      className={
        viewMode === 'grid' ? 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4' : 'space-y-4'
      }
    >
      {products.map((p) => {
        const discount = calculateDiscount(p.price, p.originalPrice)

        return (
          <div
            key={p.id}
            onClick={() => onOpenProduct?.(p.id)}
            className={`cursor-pointer rounded-xl overflow-hidden transition-transform hover:scale-105 relative group ${
              viewMode === 'list' ? 'flex gap-4' : ''
            }`}
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
              border: `1px solid ${colors.border}30`,
              boxShadow: `0 4px 12px ${colors.border}20`,
            }}
          >
            {/* Discount Badge */}
            {discount > 0 && (
              <div
                className="absolute top-2 left-2 z-10 px-2 py-1 rounded-lg text-xs font-bold text-white flex items-center gap-1"
                style={{ backgroundColor: colors.error }}
              >
                <span>⚡</span>
                <span>-{discount}%</span>
              </div>
            )}

            {/* Product Image */}
            <div
              className={
                viewMode === 'list' ? 'w-32 h-32 flex-shrink-0 relative' : 'aspect-square relative'
              }
            >
              {p.thumbnail || (p.images && p.images.length > 0) ? (
                <Image
                  src={p.thumbnail || p.images![0]}
                  alt={p.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center"
                  style={{ backgroundColor: colors.cardBackgroundSecondary }}
                >
                  <Package size={48} style={{ color: colors.textSecondary }} />
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className={viewMode === 'list' ? 'p-3 flex-1' : 'p-3'}>
              {/* Brand */}
              {(p as any).brand && (
                <div
                  className="text-xs font-medium mb-1 px-2 py-0.5 rounded inline-block"
                  style={{
                    backgroundColor: colors.accent + '20',
                    color: colors.accent,
                  }}
                >
                  {(p as any).brand}
                </div>
              )}

              {/* Product Name */}
              <h4
                className={`text-sm font-medium mb-2 ${
                  viewMode === 'list' ? 'line-clamp-1' : 'line-clamp-2 min-h-[40px]'
                }`}
                style={{ color: colors.text }}
              >
                {p.name}
              </h4>

              {/* Stock Status */}
              {(p as any).stock && (
                <div className="flex items-center gap-1 mb-2">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: colors.success }}
                  />
                  <span className="text-xs" style={{ color: colors.textSecondary }}>
                    Còn {(p as any).stock.quantity} {(p as any).stock.unit}
                  </span>
                </div>
              )}

              {/* Prices */}
              <div className="space-y-1 mb-3">
                {p.originalPrice && p.originalPrice > p.price && (
                  <div className="text-xs line-through" style={{ color: colors.textSecondary }}>
                    {p.originalPrice.toLocaleString('vi-VN')} VND
                  </div>
                )}
                <div className="text-lg font-bold" style={{ color: colors.accent }}>
                  {p.price.toLocaleString('vi-VN')} VND
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  // TODO: Add to cart functionality
                  console.log('Add to cart:', p.id)
                }}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg font-medium transition-opacity hover:opacity-90"
                style={{
                  backgroundColor: colors.accent,
                  color: 'white',
                }}
              >
                <ShoppingCart size={16} />
              </button>
            </div>

            {/* Rating (optional, if available) */}
            {p.rating && (
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1 px-2 py-1 rounded-lg"
                style={{ backgroundColor: colors.background }}
              >
                <Star size={12} fill={colors.accent} style={{ color: colors.accent }} />
                <span className="text-xs font-medium" style={{ color: colors.text }}>
                  {p.rating.toFixed(1)}
                </span>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
