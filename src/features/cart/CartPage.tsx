'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { CartEmpty, CartSummary } from './components'
import ApiCartItem from './components/ApiCartItem'
import { useCartApi } from './hooks'
import Link from 'next/link'

const CartPage: React.FC = () => {
  const { 
    cart, 
    isLoadingCart, 
    updateQuantity, 
    removeFromCart, 
    clearCart
  } = useCartApi()

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
      <div className="min-h-screen pt-20 bg-gray-50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-20 bg-gray-50">
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
              <Link
                href="/"
                className="p-3 rounded-2xl transition-all duration-200 bg-white border border-gray-200 text-gray-800 hover:shadow-lg hover:bg-gray-50"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <div>
                <h1 className="text-4xl font-bold text-gray-900">Giỏ hàng của bạn</h1>
                <p className="text-xl text-gray-600 mt-2">
                  {itemCount} sản phẩm trong giỏ
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {items.length > 0 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-gray-800 bg-white border border-gray-200 hover:shadow-md hover:bg-gray-50"
                >
                  {selectedItems.length === items.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                </button>

                {selectedItems.length > 0 && (
                  <button
                    onClick={handleDeleteSelected}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-destructive bg-destructive/10 border border-destructive/20 hover:bg-destructive/20"
                  >
                    <Trash2 className="w-4 h-4" />
                    Xóa đã chọn ({selectedItems.length})
                  </button>
                )}
              </div>
            )}
          </div>
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
