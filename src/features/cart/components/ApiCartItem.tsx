'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, Package, Trash2 } from 'lucide-react'
import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import type { ApiCartItem as ApiCartItemType } from '../types/cart.types'
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
      className="bg-white rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
    >
      <div className="p-8">
        <div className="flex items-start gap-6">
          {/* Checkbox */}
          {onToggleSelect && (
            <div className="flex items-center pt-2">
              <CheckboxPrimitive.Root
                checked={isSelected}
                onCheckedChange={() => onToggleSelect(item.id)}
                className="w-5 h-5 rounded border-2 border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary flex items-center justify-center transition-all duration-200"
              >
                <CheckboxPrimitive.Indicator>
                  <Check className="w-3 h-3 text-white" />
                </CheckboxPrimitive.Indicator>
              </CheckboxPrimitive.Root>
            </div>
          )}

          {/* Product Image */}
          <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-muted/50 flex-shrink-0">
            <Image
              src={getProductImage()}
              alt={item.product.name}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.product.name}
                </h3>

                {/* Variant Info */}
                {getVariantDisplay() && (
                  <p className="text-sm text-muted-foreground mb-2">
                    {getVariantDisplay()}
                  </p>
                )}

                {/* SKU */}
                {item.variant?.sku && (
                  <p className="text-xs text-muted-foreground mb-3">
                    SKU: {item.variant.sku}
                  </p>
                )}

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(item.unitPrice)}
                  </span>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center border-2 border-muted/30 rounded-xl overflow-hidden">
                    <button
                      onClick={() => handleQuantityChange(item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="p-2 hover:bg-muted/50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>

                    <div className="px-4 py-2 min-w-[60px] text-center font-medium bg-muted/20">
                      {item.quantity}
                    </div>

                    <button
                      onClick={() => handleQuantityChange(item.quantity + 1)}
                      className="p-2 hover:bg-muted/50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-sm text-muted-foreground">
                    <Package className="w-4 h-4 inline mr-1" />
                    Có sẵn
                  </div>
                </div>
              </div>

              {/* Total Price & Actions */}
              <div className="text-right flex-shrink-0">
                <div className="text-2xl font-bold text-gray-900 mb-4">
                  {formatPrice(item.totalPrice)}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ApiCartItem