'use client'

import React from 'react'
import { motion } from 'motion/react'
import { Minus, Plus, Trash2, Heart, Package, Star } from 'lucide-react'
import { CartItem as CartItemType } from '../types/cart.types'
import Image from 'next/image'

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
  onSaveForLater: (id: string) => void
}

const CartItem: React.FC<CartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  onSaveForLater,
}) => {
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= item.maxQuantity) {
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

  const calculateItemTotal = () => {
    return item.price * item.quantity
  }

  const discountPercentage = item.originalPrice
    ? Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)
    : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <div className="flex flex-col lg:flex-row gap-6 p-6 rounded-3xl transition-all duration-300 hover:shadow-2xl bg-card border border-border hover:border-primary hover:bg-card/50">
        {/* Product Image */}
        <div className="relative flex-shrink-0">
          <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-2xl overflow-hidden relative bg-muted shadow-lg">
            <Image
              src={'/images/products/product-1.jpg'}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />

             {/* Discount Badge */}
             {discountPercentage > 0 && (
               <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold bg-destructive text-destructive-foreground shadow-lg">
                 -{discountPercentage}%
               </div>
             )}

            {/* Stock Status */}
            <div className="absolute top-3 right-3">
               <div
                 className={`w-3 h-3 rounded-full shadow-lg ${
                   item.inStock ? 'bg-green-500' : 'bg-destructive'
                 }`}
               />
            </div>
          </div>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-6">
            {/* Left Content */}
            <div className="flex-1">
              {/* Product Name & Rating */}
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold line-clamp-2 text-foreground group-hover:text-primary transition-colors">
                  {item.name}
                </h3>
               <div className="flex items-center gap-1 ml-4">
                 <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                 <span className="text-sm font-medium text-muted-foreground">
                   4.8
                 </span>
               </div>
              </div>

              <p className="text-muted-foreground mb-4 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

               {/* Product Meta */}
               <div className="flex flex-wrap gap-4 text-sm mb-4">
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                   <Package className="w-4 h-4 text-muted-foreground" />
                   <span className="text-foreground font-medium">
                     {item.brand}
                   </span>
                 </div>
                 <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                   <span className="text-foreground font-medium">
                     {item.category}
                   </span>
                 </div>
                 {item.dimensions && (
                   <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-muted">
                     <span className="text-foreground font-medium">
                       {item.dimensions}
                     </span>
                   </div>
                 )}
               </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2 mb-4">
               <div
                 className={`w-2 h-2 rounded-full ${item.inStock ? 'bg-green-500' : 'bg-destructive'}`}
               />
               <span
                 className={`text-sm font-medium ${
                   item.inStock
                     ? 'text-green-600'
                     : 'text-destructive'
                 }`}
               >
                 {item.inStock ? 'Còn hàng' : 'Hết hàng'}
               </span>
               <span className="text-muted-foreground">•</span>
               <span className="text-sm text-muted-foreground">
                 Tối đa {item.maxQuantity} sản phẩm
               </span>
              </div>
            </div>

            {/* Right Content - Price & Controls */}
            <div className="flex flex-col lg:items-end gap-4">
              {/* Price */}
              <div className="text-right">
                 {item.originalPrice && item.originalPrice > item.price && (
                   <div className="text-lg line-through mb-1 text-muted-foreground">
                     {formatPrice(item.originalPrice)}
                   </div>
                 )}
                 <div className="text-2xl font-bold text-primary">{formatPrice(item.price)}</div>
                 <div className="text-lg font-semibold text-muted-foreground mt-1">
                   {formatPrice(calculateItemTotal())}
                 </div>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  disabled={item.quantity <= 1}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105 active:scale-95"
                >
                  <Minus className="w-5 h-5" />
                </button>

                <div className="w-16 h-10 rounded-xl flex items-center justify-center text-lg font-bold bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/30 dark:to-blue-900/30 border border-purple-200 dark:border-purple-700 text-slate-900 dark:text-white">
                  {item.quantity}
                </div>

                <button
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  disabled={item.quantity >= item.maxQuantity}
                  className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-slate-100 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-purple-100 dark:hover:bg-purple-900 hover:border-purple-300 dark:hover:border-purple-600 hover:scale-105 active:scale-95"
                >
                  <Plus className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
            <button
              onClick={() => onSaveForLater(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-slate-600 dark:text-slate-400 bg-transparent border border-slate-200 dark:border-slate-700 hover:bg-purple-50 dark:hover:bg-purple-900/30 hover:border-purple-300 dark:hover:border-purple-600 hover:text-purple-600 dark:hover:text-purple-400 hover:scale-105"
            >
              <Heart className="w-4 h-4" />
              Lưu để mua sau
            </button>

            <button
              onClick={() => onRemoveItem(item.id)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 text-red-600 dark:text-red-400 bg-transparent border border-red-200 dark:border-red-800 hover:bg-red-50 dark:hover:bg-red-900/30 hover:border-red-300 dark:hover:border-red-600 hover:scale-105"
            >
              <Trash2 className="w-4 h-4" />
              Xóa sản phẩm
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem
