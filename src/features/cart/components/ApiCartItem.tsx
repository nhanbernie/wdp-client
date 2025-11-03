'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, Package, Trash2, Star, Sparkles } from 'lucide-react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import type { ApiCartItem as ApiCartItemType } from '../types/cart.types'
import { useTheme } from '@/contexts/ThemeContext'
import Image from 'next/image'

interface ApiCartItemProps {
  item: ApiCartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  isSelected?: boolean
  onToggleSelect?: (id: string) => void
}

const ApiCartItem: React.FC<ApiCartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  isSelected = false,
  onToggleSelect,
}) => {
  const { colors } = useTheme()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1) {
      onUpdateQuantity(item.id, newQuantity)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getVariantDisplay = () => {
    if (!item.variant?.optionValues?.length) return null

    return item.variant.optionValues
      .map((option: any) => `${option.optionName}: ${option.value}`)
      .join(' / ')
  }

  const getProductImage = () => {
    return item.product.images?.[0] || '/placeholder.svg'
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className="group"
    >
      <div className="flex items-start gap-6">
        {/* Checkbox */}
        {onToggleSelect && (
          <div className="flex items-center pt-4">
            <CheckboxPrimitive.Root
              checked={isSelected}
              onCheckedChange={() => onToggleSelect(item.id)}
              className="w-5 h-5 rounded-md flex items-center justify-center transition-all duration-300 cursor-pointer shadow-sm"
              style={{
                backgroundColor: isSelected ? colors.accent : colors.cardBackgroundSecondary,
                border: `1.5px solid ${isSelected ? colors.accent : colors.border}`,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.accent
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.borderColor = colors.border
                }
              }}
            >
              <CheckboxPrimitive.Indicator>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                  <Check className="w-4 h-4 text-white stroke-[3]" />
                </motion.div>
              </CheckboxPrimitive.Indicator>
            </CheckboxPrimitive.Root>
          </div>
        )}

        {/* Main Card */}
        <motion.div
          whileHover={{ y: -1 }}
          className="flex-1 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden relative"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >

          <div className="relative flex items-start gap-4">
            {/* Product Image */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 shadow-sm"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
              }}
            >
              <Image
                src={getProductImage()}
                alt={item.product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />
            </motion.div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                  {/* Product Name */}
                  <h3
                    className="text-base font-semibold mb-1 line-clamp-2"
                    style={{ color: colors.text }}
                  >
                    {item.product.name}
                  </h3>

                  {/* Variant Info */}
                  {getVariantDisplay() && (
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className="px-2 py-1 rounded-md"
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                        }}
                      >
                        <p
                          className="text-xs font-medium"
                          style={{ color: colors.textSecondary }}
                        >
                          {getVariantDisplay()}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* SKU */}
                  {item.variant?.sku && (
                    <p
                      className="text-xs font-medium mb-2"
                      style={{ color: colors.textSecondary }}
                    >
                      SKU: {item.variant.sku}
                    </p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-lg font-bold"
                      style={{ color: colors.text }}
                    >
                      {formatPrice(item.unitPrice)}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center rounded-lg overflow-hidden shadow-sm"
                      style={{
                        backgroundColor: colors.cardBackgroundSecondary,
                      }}
                    >
                      <motion.button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        whileHover={{ scale: item.quantity > 1 ? 1.05 : 1 }}
                        whileTap={{ scale: item.quantity > 1 ? 0.95 : 1 }}
                        className="p-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                        style={{ color: colors.text }}
                        onMouseEnter={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.backgroundColor = colors.hoverBackground
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (item.quantity > 1) {
                            e.currentTarget.style.backgroundColor = 'transparent'
                          }
                        }}
                      >
                        <Minus className="w-4 h-4" />
                      </motion.button>

                      <div className="px-4 py-2 min-w-[50px] text-center">
                        <span
                          className="text-base font-bold"
                          style={{ color: colors.text }}
                        >
                          {item.quantity}
                        </span>
                      </div>

                      <motion.button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 transition-all duration-300"
                        style={{ color: colors.text }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.hoverBackground
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent'
                        }}
                      >
                        <Plus className="w-4 h-4" />
                      </motion.button>
                    </div>

                    <div
                      className="flex items-center gap-1.5 px-2 py-1.5 rounded-md"
                      style={{
                        backgroundColor: colors.cardBackgroundSecondary,
                      }}
                    >
                      <Package className="w-3.5 h-3.5" style={{ color: colors.textSecondary }} />
                      <span
                        className="text-xs font-medium"
                        style={{ color: colors.textSecondary }}
                      >
                        Có sẵn
                      </span>
                    </div>
                  </div>
                </div>

                {/* Total Price & Actions */}
                <div className="text-right flex-shrink-0">
                  {/* Total price */}
                  <div className="mb-3">
                    <p
                      className="text-xs font-medium mb-1"
                      style={{ color: colors.textSecondary }}
                    >
                      Tổng cộng
                    </p>
                    <div
                      className="px-3 py-2 rounded-lg shadow-sm"
                      style={{
                        backgroundColor: colors.cardBackgroundSecondary,
                      }}
                    >
                      <p
                        className="text-lg font-bold"
                        style={{ color: colors.text }}
                      >
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Delete button */}
                  <motion.button
                    onClick={() => onRemoveItem(item.id)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg text-white transition-all duration-300 shadow-sm"
                    style={{ backgroundColor: colors.error }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.error}dd`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.error
                    }}
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Xóa
                  </motion.button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}

export default ApiCartItem
