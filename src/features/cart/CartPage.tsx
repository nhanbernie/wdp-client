'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ArrowLeft } from 'lucide-react'
import { SAMPLE_CART_ITEMS, SAMPLE_CART_SUMMARY } from './data/sample-data'
import { CartItem, CartEmpty, CartSummary } from './components'
import { useCart } from './hooks'
import Link from 'next/link'

const CartPage: React.FC = () => {
  const { items, summary, updateQuantity, removeItem, saveForLater, applyCoupon, checkout } =
    useCart(SAMPLE_CART_ITEMS, SAMPLE_CART_SUMMARY)

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
          <div className="flex items-center gap-6 mb-8">
            <Link
              href="/"
              className="p-3 rounded-2xl transition-all duration-200 bg-card border border-border text-foreground hover:bg-muted hover:shadow-lg"
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
