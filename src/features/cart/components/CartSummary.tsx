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
import { CartSummary as CartSummaryType, ApiCart } from '../types/cart.types'
import { useRouter } from 'next/navigation'

interface CartSummaryProps {
  cart?: ApiCart
  summary?: CartSummaryType // Legacy support
  onCheckout?: () => void
  onApplyCoupon?: (coupon: string) => void
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, summary, onCheckout, onApplyCoupon }) => {
  const router = useRouter()
  const [couponCode, setCouponCode] = useState('')
  const [showCouponForm, setShowCouponForm] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  // Use cart data if available, otherwise fallback to legacy summary
  const itemCount = cart?.totalQuantity || summary?.itemCount || 0
  const subtotal = cart?.subtotal || summary?.subtotal || 0
  const shipping = summary?.shipping || 0 // API doesn't provide shipping fee yet
  const tax = summary?.tax || 0 // API doesn't provide tax yet
  const discount = summary?.discount || 0 // API doesn't provide discount yet
  const total = cart?.total || summary?.total || 0

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout()
    } else {
      // Navigate to checkout page
      router.push('/checkout')
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
      <div className="rounded-3xl p-8 shadow-2xl bg-white border-2 border-slate-200">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-orange-500 to-pink-500 text-white shadow-xl">
            <ShoppingCart className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900">Tóm tắt</h2>
            <p className="text-slate-600 font-bold">{itemCount} sản phẩm</p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-6 mb-8">
          {/* Subtotal */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
            <span className="text-sm font-black text-slate-700">Tạm tính</span>
            <span className="text-xl font-black text-slate-900">{formatPrice(subtotal)}</span>
          </div>

          {/* Shipping */}
          <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
            <div className="flex items-center gap-2">
              <Truck className="w-5 h-5 text-emerald-600" />
              <span className="text-sm font-black text-emerald-900">Phí vận chuyển</span>
            </div>
            <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600">
              {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
            </span>
          </div>

          {/* Tax */}
          {tax > 0 && (
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-slate-50">
              <span className="text-sm font-black text-slate-700">Thuế VAT</span>
              <span className="text-lg font-black text-slate-900">{formatPrice(tax)}</span>
            </div>
          )}

          {/* Discount */}
          {discount > 0 && (
            <div className="flex items-center justify-between py-3 px-4 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
              <span className="text-sm font-black text-green-900">Giảm giá</span>
              <span className="text-lg font-black text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600">
                -{formatPrice(discount)}
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
              className="flex items-center justify-between p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-blue-50 to-indigo-50 border-2 border-purple-200 shadow-lg"
            >
              <div className="flex items-center gap-3">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-black text-purple-900">Mã: {appliedCoupon}</span>
              </div>
              <motion.button
                onClick={handleRemoveCoupon}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-xl text-xs font-black bg-red-500 text-white hover:bg-red-600 transition-colors shadow-lg"
              >
                Xóa
              </motion.button>
            </motion.div>
          ) : (
            <div>
              <motion.button
                onClick={() => setShowCouponForm(!showCouponForm)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-between w-full p-5 rounded-2xl transition-all duration-300 bg-gradient-to-r from-slate-50 to-slate-100 border-2 border-slate-200 hover:border-purple-300 hover:shadow-xl"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-black text-slate-900">Áp dụng mã giảm giá</span>
                </div>
                {showCouponForm ? (
                  <ChevronUp className="w-6 h-6 text-slate-500" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-slate-500" />
                )}
              </motion.button>

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
                        className="flex-1 px-5 py-4 rounded-xl text-sm font-bold border-2 border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-purple-200 focus:border-purple-400 transition-all duration-300"
                      />
                      <motion.button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        whileHover={{ scale: couponCode.trim() ? 1.05 : 1 }}
                        whileTap={{ scale: couponCode.trim() ? 0.95 : 1 }}
                        className="px-8 py-4 rounded-xl text-sm font-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 text-white hover:shadow-xl hover:shadow-purple-500/50"
                      >
                        Áp dụng
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Total */}
        <div className="py-6 px-8 rounded-2xl mb-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 border-2 border-indigo-200 shadow-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-black text-slate-900">Tổng cộng</span>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <div className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
            {formatPrice(total)}
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="flex items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
            <Shield className="w-6 h-6 text-emerald-600 flex-shrink-0" />
            <span className="text-xs font-black text-emerald-900">An toàn</span>
          </div>
          <div className="flex items-center gap-2 p-4 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
            <Gift className="w-6 h-6 text-blue-600 flex-shrink-0" />
            <span className="text-xs font-black text-blue-900">Ưu đãi</span>
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          onClick={handleCheckout}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative w-full h-16 rounded-2xl font-black text-xl transition-all duration-300 bg-gradient-to-r from-orange-500 via-orange-600 to-pink-500 text-white shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 overflow-hidden group"
        >
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{
              x: ['-100%', '100%'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'linear',
              repeatDelay: 1,
            }}
          />

          <div className="relative flex items-center justify-center gap-3">
            <CreditCard className="w-6 h-6" />
            Thanh toán ngay
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CartSummary
