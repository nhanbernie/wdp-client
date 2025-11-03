'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Trash2, ShoppingCart, Sparkles, Package, Shield } from 'lucide-react'
import { CartEmpty, CartSummary } from './components'
import ApiCartItem from './components/ApiCartItem'
import { useCartApi } from './hooks'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

const CartPage: React.FC = () => {
  const { cart, isLoadingCart, updateQuantity, removeFromCart, clearCart } = useCartApi()
  const { colors } = useTheme()

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
      <div
        style={{ backgroundColor: colors.background }}
      >
        <div className="max-w-7xl mx-auto px-4 py-12">
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
                className="w-28 h-28 rounded-full border-4 border-transparent"
                style={{
                  borderTopColor: colors.accent,
                  borderRightColor: colors.accentSecondary,
                }}
              />

              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-2 w-20 h-20 rounded-full border-4 border-transparent"
                style={{
                  borderBottomColor: colors.accentSecondary,
                  borderLeftColor: colors.accent,
                }}
              />

              {/* Inner icon */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{ backgroundColor: colors.accent }}
                >
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
              <h3
                className="text-3xl font-black mb-4"
                style={{ color: colors.text }}
              >
                Đang tải giỏ hàng...
              </h3>
              <div className="flex items-center justify-center gap-2">
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.accentSecondary }}
                />
                <motion.div
                  animate={{ opacity: [0.4, 1, 0.4] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors.accent }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      // className="min-h-screen pt-20"
      style={{ backgroundColor: colors.background }}
    >
      <div className="max-w-7xl mx-auto px-4 py-12">
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
                  className="p-4 rounded-2xl border-2 transition-all duration-300"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border
                  }}
                >
                  <ArrowLeft className="w-6 h-6" />
                </motion.button>
              </Link>

              <div>
                <h1
                  className="text-5xl font-black mb-2"
                  style={{ color: colors.text }}
                >
                  Giỏ hàng của bạn
                </h1>
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-white shadow-lg"
                    style={{ backgroundColor: colors.accent }}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    <span className="font-black text-lg">{itemCount}</span>
                  </div>
                  <p
                    className="text-xl"
                    style={{ color: colors.textSecondary }}
                  >
                    sản phẩm trong giỏ
                  </p>
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
                  className="px-6 py-3 rounded-xl text-sm font-black transition-all duration-300 border-2"
                  style={{
                    backgroundColor: colors.cardBackground,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.accent
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border
                  }}
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
                    className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-white shadow-xl transition-all duration-300"
                    style={{ backgroundColor: colors.error }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = `${colors.error}dd`
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.error
                    }}
                  >
                    <Trash2 className="w-5 h-5" />
                    Xóa đã chọn ({selectedItems.length})
                  </motion.button>
                )}
              </div>
            )}
          </div>

          {/* Info cards */}
          {/* {items.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <div
                className="flex items-center gap-4 p-6 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: colors.cardBackground,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${colors.success}15` }}
                >
                  <Shield className="w-6 h-6" style={{ color: colors.success }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: colors.text }}
                  >
                    Mua hàng an toàn
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Bảo vệ người tiêu dùng
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-4 p-6 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: colors.cardBackground,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accent}15` }}
                >
                  <Package className="w-6 h-6" style={{ color: colors.accent }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: colors.text }}
                  >
                    Giao hàng miễn phí
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Cho đơn hàng trên 500K
                  </p>
                </div>
              </div>

              <div
                className="flex items-center gap-4 p-6 rounded-2xl shadow-lg"
                style={{
                  backgroundColor: colors.cardBackground,
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${colors.accentSecondary}15` }}
                >
                  <Sparkles className="w-6 h-6" style={{ color: colors.accentSecondary }} />
                </div>
                <div>
                  <h3
                    className="font-bold text-base"
                    style={{ color: colors.text }}
                  >
                    Ưu đãi đặc biệt
                  </h3>
                  <p
                    className="text-xs mt-1"
                    style={{ color: colors.textSecondary }}
                  >
                    Giảm giá mỗi ngày
                  </p>
                </div>
              </div>
            </motion.div>
          )} */}
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
