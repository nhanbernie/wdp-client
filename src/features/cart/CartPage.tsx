'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Trash2, ShoppingCart, Sparkles, Package, Shield } from 'lucide-react'
import { CartEmpty, CartSummary } from './components'
import ApiCartItem from './components/ApiCartItem'
import { useCartApi } from './hooks'
import Link from 'next/link'

const CartPage: React.FC = () => {
  const { cart, isLoadingCart, updateQuantity, removeFromCart, clearCart } = useCartApi()

  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const items = cart?.items || []
  const itemCount = cart?.totalQuantity || 0

  const handleToggleSelect = (itemId: string) => {
    setSelectedItems((prev) =>
      prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId],
    )
  }

  const handleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(items.map((item) => item.id))
    }
  }

  const handleDeleteSelected = () => {
    selectedItems.forEach((itemId) => removeFromCart(itemId))
    setSelectedItems([])
  }

  const handleRemoveItem = (itemId: string) => {
    removeFromCart(itemId)
  }

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateQuantity(itemId, quantity)
  }

  // Show loading state
  if (isLoadingCart) {
    return (
      <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col items-center justify-center min-h-[70vh]">
            {/* Animated Loading Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative mb-8"
            >
              {/* Outer rotating circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                className="w-28 h-28 rounded-full border-4 border-transparent border-t-indigo-500 border-r-purple-500"
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 w-20 h-20 rounded-full border-4 border-transparent border-b-pink-500 border-l-purple-500"
              />

              {/* Inner icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-2xl">
                  <ShoppingCart className="w-8 h-8 text-white" />
                </div>
              </motion.div>
            </motion.div>

            {/* Loading text */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-center"
            >
              <h3 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-4">
                Đang tải giỏ hàng...
              </h3>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 rounded-full bg-indigo-500"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-3 h-3 rounded-full bg-purple-500"
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-3 h-3 rounded-full bg-pink-500"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-6">
              <Link href="/">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-4 rounded-2xl bg-white border-2 border-slate-200 text-slate-700 hover:border-indigo-300 hover:shadow-xl transition-all duration-300"
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
              </Link>

              <div>
                <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 mb-2">
                  Giỏ hàng của bạn
                </h1>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg">
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-black text-lg">{itemCount}</span>
                  </div>
                  <p className="text-xl text-slate-600">sản phẩm trong giỏ</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            {items.length > 0 && (
              <div className="flex items-center gap-4">
                <motion.button
                  onClick={handleSelectAll}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 bg-white border-2 border-slate-200 text-slate-800 hover:border-indigo-300 hover:shadow-xl"
                >
                  {selectedItems.length === items.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </motion.button>

                {selectedItems.length > 0 && (
                  <motion.button
                    onClick={handleDeleteSelected}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 bg-gradient-to-r from-red-500 to-pink-500 text-white shadow-xl shadow-red-500/50 hover:shadow-red-500/70"
                  >
                    <Trash2 className="w-5 h-5" />
                    Xóa đã chọn ({selectedItems.length})
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Info cards */}
          {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-emerald-200 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Mua hàng an toàn</h3>
                  <p className="text-sm text-slate-600">Bảo vệ người tiêu dùng</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-blue-200 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center shadow-lg">
                  <Package className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Giao hàng miễn phí</h3>
                  <p className="text-sm text-slate-600">Cho đơn hàng trên 500K</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-6 rounded-2xl bg-white border-2 border-purple-200 shadow-xl">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 text-lg">Ưu đãi đặc biệt</h3>
                  <p className="text-sm text-slate-600">Giảm giá mỗi ngày</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Content */}
        {items.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="space-y-8"
              >
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <ApiCartItem
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemoveItem={handleRemoveItem}
                      isSelected={selectedItems.includes(item.id)}
                      onToggleSelect={handleToggleSelect}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <CartSummary cart={cart} />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
