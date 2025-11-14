'use client'

import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Package, DollarSign, Layers, Hash } from 'lucide-react'
import { motion } from 'framer-motion'
import { ProductVariant } from '../types/products.types'

interface ProductVariantsProps {
  variants: ProductVariant[]
  options?: Array<{
    id: string
    name: string
    displayName: string
    values: Array<{ id: string; value: string }>
  }>
  colors: any
  onVariantSelect?: (variant: ProductVariant) => void
  selectedVariantId?: string
}

export const ProductVariants: React.FC<ProductVariantsProps> = ({
  variants,
  options,
  colors,
  onVariantSelect,
  selectedVariantId,
}) => {
  if (!variants || variants.length === 0) {
    return null
  }

  const formatPrice = (price?: number) => {
    if (!price) return 'N/A'
    return price.toLocaleString('vi-VN') + ' VND'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="space-y-4"
    >
      <Card
        className="rounded-xl shadow-md overflow-hidden"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-lg font-bold flex items-center gap-2" style={{ color: colors.text }}>
            <Package className="h-5 w-5" style={{ color: colors.accent }} />
            Biến thể sản phẩm ({variants.length})
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {variants.map((variant, index) => {
            const isSelected = selectedVariantId === variant.id
            const variantOptions = Object.entries(variant.options || {})
            const displayPrice = variant.price || 0
            const displayStock = variant.stockQty || 0

            return (
              <motion.div
                key={variant.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                onClick={() => onVariantSelect?.(variant)}
                className={`rounded-lg p-4 border-2 transition-all cursor-pointer ${
                  isSelected ? 'ring-2' : 'hover:shadow-md'
                }`}
                style={{
                  backgroundColor: isSelected ? colors.cardBackgroundSecondary : colors.cardBackground,
                  borderColor: isSelected ? colors.accent : colors.border,
                  boxShadow: isSelected ? `0 0 0 2px ${colors.accent}40` : 'none',
                }}
              >
                <div className="flex items-start justify-between gap-4">
                  {/* Left: Options & SKU */}
                  <div className="flex-1 space-y-2">
                    {/* SKU */}
                    <div className="flex items-center gap-2">
                      <Hash className="h-4 w-4" style={{ color: colors.textSecondary }} />
                      <span className="text-xs font-semibold" style={{ color: colors.textSecondary }}>
                        SKU:
                      </span>
                      <span className="text-sm font-bold px-2 py-1 rounded" style={{ 
                        backgroundColor: colors.cardBackgroundSecondary,
                        color: colors.text 
                      }}>
                        {variant.sku}
                      </span>
                    </div>

                    {/* Options */}
                    {variantOptions.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {variantOptions.map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="text-xs px-2 py-1"
                            style={{
                              backgroundColor: colors.cardBackgroundSecondary,
                              color: colors.text,
                            }}
                          >
                            {key}: <span className="font-bold ml-1">{value}</span>
                          </Badge>
                        ))}
                      </div>
                    )}

                    {/* Variant-specific specs */}
                    {variant.specs && Object.keys(variant.specs).length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {Object.entries(variant.specs).slice(0, 3).map(([key, value]) => {
                          const displayValue = typeof value === 'object' && value !== null
                            ? (value as any).value && (value as any).unit
                              ? `${(value as any).value} ${(value as any).unit}`
                              : JSON.stringify(value)
                            : String(value)
                          return (
                            <span
                              key={key}
                              className="text-xs px-2 py-1 rounded"
                              style={{
                                backgroundColor: colors.cardBackgroundSecondary,
                                color: colors.textSecondary,
                              }}
                            >
                              {key.replace(/_/g, ' ')}: {displayValue}
                            </span>
                          )
                        })}
                      </div>
                    )}
                  </div>

                  {/* Right: Price & Stock */}
                  <div className="flex flex-col items-end gap-2 min-w-[120px]">
                    {/* Price */}
                    <div className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" style={{ color: colors.accent }} />
                      <span
                        className="text-lg font-bold"
                        style={{ color: colors.accent }}
                      >
                        {formatPrice(displayPrice)}
                      </span>
                    </div>

                    {/* Stock */}
                    <div className="flex items-center gap-1">
                      <Layers className="h-4 w-4" style={{ color: colors.textSecondary }} />
                      <span
                        className={`text-sm font-semibold ${
                          displayStock > 0 ? '' : 'line-through opacity-50'
                        }`}
                        style={{
                          color: displayStock > 0 ? colors.success : colors.error,
                        }}
                      >
                        {displayStock > 0 ? `${displayStock} sản phẩm` : 'Hết hàng'}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </CardContent>
      </Card>
    </motion.div>
  )
}
