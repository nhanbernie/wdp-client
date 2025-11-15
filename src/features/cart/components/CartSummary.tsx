'use client'

import React, { useState, useEffect } from 'react'
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
import { useTheme } from '@/contexts/ThemeContext'

interface CartSummaryProps {
  cart?: ApiCart
  summary?: CartSummaryType // Legacy support
  onCheckout?: () => void
  onApplyCoupon?: (coupon: string) => void
  selectedItems?: string[] // Optional: array of selected cart item IDs
}

const CartSummary: React.FC<CartSummaryProps> = ({ cart, summary, onCheckout, onApplyCoupon, selectedItems }) => {
  const router = useRouter()
  const { colors } = useTheme()
  const [couponCode, setCouponCode] = useState('')
  const [showCouponForm, setShowCouponForm] = useState(false)
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null)

  useEffect(() => {
    const styleId = 'cart-summary-placeholder-style'
    let style = document.getElementById(styleId) as HTMLStyleElement

    if (!style) {
      style = document.createElement('style')
      style.id = styleId
      document.head.appendChild(style)
    }

    style.textContent = `
      #cart-coupon-input::placeholder {
        color: ${colors.textSecondary};
      }
    `

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        document.head.removeChild(existingStyle)
      }
    }
  }, [colors.textSecondary])

  // Calculate summary for selected items only if selectedItems is provided
  let itemCount = 0
  let subtotal = 0
  let total = 0

  if (cart) {
    if (selectedItems && selectedItems.length > 0) {
      // Calculate for selected items only
      const selectedCartItems = cart.items.filter((item) => selectedItems.includes(item.id))
      itemCount = selectedCartItems.reduce((sum, item) => sum + item.quantity, 0)
      subtotal = selectedCartItems.reduce((sum, item) => sum + item.totalPrice, 0)
      total = subtotal // Total equals subtotal for now (shipping, tax, discount are 0)
    } else {
      // Use all cart items if no selection
      itemCount = cart.totalQuantity || 0
      subtotal = cart.subtotal || 0
      total = cart.total || 0
    }
  } else {
    // Fallback to legacy summary
    itemCount = summary?.itemCount || 0
    subtotal = summary?.subtotal || 0
    total = summary?.total || 0
  }

  const shipping = subtotal >= 1000000 ? 0 : 30000
  const tax = summary?.tax || 0 // API doesn't provide tax yet
  const discount = summary?.discount || 0 // API doesn't provide discount yet

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
      <div
        className="rounded-3xl p-8 shadow-xl"
        style={{
          backgroundColor: colors.cardBackground,
        }}
      >
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shadow-sm"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          >
            <ShoppingCart className="w-5 h-5" style={{ color: colors.text }} />
          </div>
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              Tóm tắt
            </h2>
            <p
              className="text-sm font-medium mt-0.5"
              style={{ color: colors.textSecondary }}
            >
              {itemCount} sản phẩm
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <div className="space-y-3 mb-6">
          {/* Subtotal */}
          <div
            className="flex items-center justify-between py-2.5 px-3 rounded-lg"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          >
            <span
              className="text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              Tạm tính
            </span>
            <span
              className="text-base font-bold"
              style={{ color: colors.text }}
            >
              {formatPrice(subtotal)}
            </span>
          </div>

          {/* Shipping */}
          <div
            className="flex items-center justify-between py-2.5 px-3 rounded-lg"
            style={{
              backgroundColor: colors.cardBackgroundSecondary,
            }}
          >
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4" style={{ color: colors.textSecondary }} />
              <span
                className="text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                Phí vận chuyển
              </span>
            </div>
            <span
              className="text-base font-bold"
              style={{ color: colors.text }}
            >
              {shipping === 0 ? 'Miễn phí' : formatPrice(shipping)}
            </span>
          </div>

          {/* Tax */}
          {tax > 0 && (
            <div
              className="flex items-center justify-between py-2.5 px-3 rounded-lg"
              style={{ backgroundColor: colors.cardBackgroundSecondary }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                Thuế VAT
              </span>
              <span
                className="text-base font-bold"
                style={{ color: colors.text }}
              >
                {formatPrice(tax)}
              </span>
            </div>
          )}

          {/* Discount */}
          {discount > 0 && (
            <div
              className="flex items-center justify-between py-2.5 px-3 rounded-lg"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
              }}
            >
              <span
                className="text-sm font-medium"
                style={{ color: colors.textSecondary }}
              >
                Giảm giá
              </span>
              <span
                className="text-base font-bold"
                style={{ color: colors.text }}
              >
                -{formatPrice(discount)}
              </span>
            </div>
          )}
        </div>

        {/* Coupon Section */}
        <div className="mb-6">
          {appliedCoupon ? (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center justify-between p-3 rounded-lg shadow-sm"
              style={{
                backgroundColor: colors.cardBackgroundSecondary,
              }}
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" style={{ color: colors.textSecondary }} />
                <span
                  className="text-xs font-medium"
                  style={{ color: colors.text }}
                >
                  Mã: {appliedCoupon}
                </span>
              </div>
              <motion.button
                onClick={handleRemoveCoupon}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shadow-sm"
                style={{ 
                  backgroundColor: colors.error,
                  color: 'white'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${colors.error}dd`
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.error
                }}
              >
                Xóa
              </motion.button>
            </motion.div>
          ) : (
            <div>
              <motion.button
                onClick={() => setShowCouponForm(!showCouponForm)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="flex items-center justify-between w-full p-3 rounded-lg transition-all duration-300"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.hoverBackground
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
                }}
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4" style={{ color: colors.textSecondary }} />
                  <span
                    className="text-sm font-medium"
                    style={{ color: colors.text }}
                  >
                    Áp dụng mã giảm giá
                  </span>
                </div>
                {showCouponForm ? (
                  <ChevronUp className="w-4 h-4" style={{ color: colors.textSecondary }} />
                ) : (
                  <ChevronDown className="w-4 h-4" style={{ color: colors.textSecondary }} />
                )}
              </motion.button>

              <AnimatePresence>
                {showCouponForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 overflow-hidden"
                  >
                    <div className="flex gap-2">
                      <input
                        id="cart-coupon-input"
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Nhập mã giảm giá"
                        className="flex-1 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-1"
                        style={{
                          backgroundColor: colors.cardBackground,
                          color: colors.text,
                        }}
                        onFocus={(e) => {
                          e.currentTarget.style.setProperty('--tw-ring-color', `${colors.border}40`)
                          e.currentTarget.style.setProperty('--tw-ring-offset-color', colors.cardBackground)
                        }}
                        onBlur={(e) => {
                          e.currentTarget.style.setProperty('--tw-ring-color', 'transparent')
                        }}
                      />
                      <motion.button
                        onClick={handleApplyCoupon}
                        disabled={!couponCode.trim()}
                        whileHover={{ scale: couponCode.trim() ? 1.02 : 1 }}
                        whileTap={{ scale: couponCode.trim() ? 0.98 : 1 }}
                        className="px-4 py-2.5 rounded-lg text-sm font-medium text-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
                        style={{ backgroundColor: colors.textSecondary }}
                        onMouseEnter={(e) => {
                          if (couponCode.trim()) {
                            e.currentTarget.style.backgroundColor = colors.text
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (couponCode.trim()) {
                            e.currentTarget.style.backgroundColor = colors.textSecondary
                          }
                        }}
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
        <div
          className="py-4 px-4 rounded-lg mb-6 shadow-sm"
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
          }}
        >
          <div className="flex items-center justify-between mb-1">
            <span
              className="text-sm font-medium"
              style={{ color: colors.textSecondary }}
            >
              Tổng cộng
            </span>
          </div>
          <div
            className="text-2xl font-bold"
            style={{ color: colors.text }}
          >
            {formatPrice(total+shipping)}
          </div>
        </div>

        {/* Checkout Button */}
        <motion.button
          onClick={handleCheckout}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="relative w-full h-12 rounded-lg font-semibold text-base text-white transition-all duration-300 shadow-md"
          style={{ backgroundColor: colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.text
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.textSecondary
          }}
        >
          <div className="relative flex items-center justify-center gap-2">
            <CreditCard className="w-4 h-4" />
            Thanh toán ngay
          </div>
        </motion.button>
      </div>
    </motion.div>
  )
}

export default CartSummary

