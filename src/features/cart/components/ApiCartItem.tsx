'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, Package, Trash2, Star, Sparkles } from 'lucide-react'
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
              className="w-6 h-6 rounded-lg border-2 border-slate-300 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-indigo-500 data-[state=checked]:to-purple-500 data-[state=checked]:border-transparent flex items-center justify-center transition-all duration-300 hover:border-indigo-400 cursor-pointer"
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
          whileHover={{ y: -2 }}
          className="flex-1 rounded-3xl border-2 border-slate-200 bg-white p-8 shadow-xl hover:shadow-2xl hover:border-indigo-200 transition-all duration-300 overflow-hidden relative"
        >
          {/* Gradient background on hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-indigo-50/50 group-hover:via-purple-50/50 group-hover:to-pink-50/50 transition-all duration-500 pointer-events-none" />

          <div className="relative flex items-start gap-6">
            {/* Product Image */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="relative w-32 h-32 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border-2 border-white shadow-xl"
            >
              <Image
                src={getProductImage()}
                alt={item.product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                unoptimized
              />

              {/* Shine effect overlay */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ['-100%', '100%'],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                  repeatDelay: 2,
                }}
              />
            </motion.div>

            {/* Product Details */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-start gap-6">
                <div className="flex-1">
                  {/* Product Name */}
                  <h3 className="text-2xl font-black text-slate-900 mb-3 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-indigo-600 group-hover:via-purple-600 group-hover:to-pink-600 transition-all duration-300">
                    {item.product.name}
                  </h3>

                  {/* Variant Info */}
                  {getVariantDisplay() && (
                    <div className="flex items-center gap-2 mb-3">
                      <div className="px-4 py-2 rounded-xl bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-200">
                        <p className="text-sm font-black text-slate-700">{getVariantDisplay()}</p>
                      </div>
                    </div>
                  )}

                  {/* SKU */}
                  {item.variant?.sku && (
                    <p className="text-xs font-bold text-slate-500 mb-4">SKU: {item.variant.sku}</p>
                  )}

                  {/* Price */}
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                      {formatPrice(item.unitPrice)}
                    </span>
                    <div className="px-3 py-1 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-black shadow-lg">
                      <Sparkles className="w-3 h-3 inline mr-1" />
                      GIÁ TỐT
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-6">
                    <div className="flex items-center border-2 border-slate-200 rounded-2xl overflow-hidden bg-white shadow-lg">
                      <motion.button
                        onClick={() => handleQuantityChange(item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        whileHover={{ scale: item.quantity > 1 ? 1.1 : 1 }}
                        whileTap={{ scale: item.quantity > 1 ? 0.9 : 1 }}
                        className="p-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <Minus className="w-5 h-5 text-slate-700" />
                      </motion.button>

                      <div className="px-8 py-4 min-w-[80px] text-center">
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">
                          {item.quantity}
                        </span>
                      </div>

                      <motion.button
                        onClick={() => handleQuantityChange(item.quantity + 1)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="p-4 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300"
                      >
                        <Plus className="w-5 h-5 text-slate-700" />
                      </motion.button>
                    </div>

                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
                      <Package className="w-5 h-5 text-emerald-600" />
                      <span className="text-sm font-black text-emerald-900">Có sẵn</span>
                    </div>
                  </div>
                </div>

                {/* Total Price & Actions */}
                <div className="text-right flex-shrink-0">
                  {/* Total price */}
                  <div className="mb-6">
                    <p className="text-sm font-bold text-slate-600 mb-2">Tổng cộng</p>
                    <div className="px-6 py-4 rounded-2xl bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 shadow-xl">
                      <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                        {formatPrice(item.totalPrice)}
                      </p>
                    </div>
                  </div>

                  {/* Delete button */}
                  <motion.button
                    onClick={() => onRemoveItem(item.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 text-sm font-black rounded-2xl transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 text-white hover:shadow-xl hover:shadow-red-500/50"
                  >
                    <Trash2 className="w-5 h-5" />
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
