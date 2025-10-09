'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  ShoppingCart,
  Truck,
  Shield,
  CreditCard,
  Tag,
  ChevronDown,
  ChevronUp,
  CheckCircle,
  Sparkles,
  Gift,
} from 'lucide-react'
import { CartSummary as CartSummaryType } from '../types/cart.types'

interface CartSummaryProps {
  summary: CartSummaryType
  onCheckout: () => void
  onApplyCoupon?: (coupon: string) => void
}

const CartSummary: React.FC<CartSummaryProps> = ({ summary, onCheckout, onApplyCoupon }) => {
  const [couponCode, setCouponCode] = useState('')
  const [showCouponForm, setShowCouponForm] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  const handleApplyCoupon = () => {
    if (couponCode.trim() && onApplyCoupon) {
      onApplyCoupon(couponCode.trim())
      setAppliedCoupon(couponCode.trim())
      setCouponCode('')
      setShowCouponForm(false)
    }
  }

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null)
    if (onApplyCoupon) {
      onApplyCoupon('')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-6"
    >
      <div className="rounded-3xl p-8 shadow-2xl cart-card border backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground shadow-lg">
            <ShoppingCart className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground">Tóm tắt đơn hàng</h2>
            <p className="text-muted-foreground">{summary.itemCount} sản phẩm trong giỏ</p>
          </div>
        </div>

        {/* Item Count */}
        <div className="flex items-center justify-between py-3 mb-6">
          <span className="text-sm font-medium text-foreground">Sản phẩm</span>
          <span className="text-sm font-bold text-foreground">{summary.itemCount} món</span>
        </div>

        {/* Order Summary */}
        <div className="space-y-4 mb-8">
          {/* Subtotal */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Tạm tính</span>
            <span className="text-sm font-bold text-foreground">
              {formatPrice(summary.subtotal)}
            </span>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Phí vận chuyển</span>
            <span className="text-sm font-bold text-foreground">
              {summary.shipping === 0 ? 'Miễn phí' : formatPrice(summary.shipping)}
            </span>
          </div>

          {/* Tax */}
          <div className="flex items-center justify-between py-2">
            <span className="text-sm font-medium text-foreground">Thuế VAT</span>
            <span className="text-sm font-bold text-foreground">{formatPrice(summary.tax)}</span>
          </div>

          {/* Discount */}
          {summary.discount > 0 && (
            <div className="flex items-center justify-between py-2">
              <span className="text-sm font-medium text-green-600">Giảm giá</span>
              <span className="text-sm font-bold text-green-600">
                -{formatPrice(summary.discount)}
              </span>
            </div>
          )}
        </div>

        {/* Coupon Section */}
        <div className="mb-8">
          {appliedCoupon ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span className="text-sm font-semibold text-purple-700 dark:text-purple-400">
                  Mã giảm giá: {appliedCoupon}
                </span>
              </div>
              <button
                onClick={handleRemoveCoupon}
                className="text-xs px-3 py-1 rounded-lg text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/30 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                Xóa
              </button>
            </motion.div>
          ) : (
            <div>
              <button
                onClick={() => setShowCouponForm(!showCouponForm)}
                className="flex items-center justify-between w-full p-4 rounded-2xl transition-all duration-200 bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-700 dark:to-slate-600 border border-slate-200 dark:border-slate-600 hover:border-purple-300 dark:hover:border-purple-600 hover:shadow-lg"
              >
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Áp dụng mã giảm giá
                  </span>
                </div>
                {showCouponForm ? (
                  <ChevronUp className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                )}
              </button>

              <AnimatePresence>
                {showCouponForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-4 overflow-hidden"
                  >
                    <div className="flex gap-3">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-4 py-3 rounded-xl text-sm border border-slate-200 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      />
                      <button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        className="px-6 py-3 rounded-xl text-sm font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-lg"
                      >
                        Áp dụng
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="py-4 px-6 rounded-lg mb-6 bg-muted border border-border">
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-foreground">Tổng cộng</span>
            <span className="text-2xl font-bold text-primary">{formatPrice(summary.total)}</span>
          </div>
        </div>

        {/* Checkout Button */}
        <button
          onClick={onCheckout}
          className="w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          <div className="flex items-center justify-center gap-2">
            <CreditCard className="w-5 h-5" />
            Thanh toán ngay
          </div>
        </button>
      </div>
    </motion.div>
  )
}

export default CartSummary
