'use client'

import React, { useState } from 'react'
import { motion } from 'motion/react'
import { ArrowLeft, Trash2 } from 'lucide-react'
import { SAMPLE_CART_ITEMS, SAMPLE_CART_SUMMARY } from './data/sample-data'
import { CartItem, CartEmpty, CartSummary } from './components'
import { useCart } from './hooks'
import Link from 'next/link'

const CartPage: React.FC = () => {
  const { items, summary, updateQuantity, removeItem, saveForLater, applyCoupon, checkout } =
    useCart(SAMPLE_CART_ITEMS, SAMPLE_CART_SUMMARY)

  const [selectedItems, setSelectedItems] = useState<string[]>([])

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
    selectedItems.forEach((itemId) => removeItem(itemId))
    setSelectedItems([])
  }

  return (
    <div className="min-h-screen pt-20 bg-background">
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
                className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
              >
                <ArrowLeft className="w-6 h-6" />
              </Link>

              <div>
                <h1 className="text-4xl font-bold text-foreground">Giỏ hàng của bạn</h1>
                <p className="text-xl text-muted-foreground mt-2">
                  {summary.itemCount} sản phẩm trong giỏ
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            {items.length > 0 && (
              <div className="flex items-center gap-4">
                <button
                  onClick={handleSelectAll}
                  className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 text-foreground cart-card border hover:shadow-md"
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
                    <CartItem
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemoveItem={removeItem}
                      onSaveForLater={saveForLater}
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
                <CartSummary summary={summary} onCheckout={checkout} onApplyCoupon={applyCoupon} />
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default CartPage
