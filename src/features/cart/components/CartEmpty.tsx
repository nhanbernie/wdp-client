'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ShoppingBag, ArrowLeft, Package, Sparkles, TrendingUp } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import Link from 'next/link'

interface CartEmptyProps {
  onContinueShopping?: () => void
}

const CartEmpty: React.FC<CartEmptyProps> = ({ onContinueShopping }) => {
  const { colors } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center justify-center min-h-[70vh] text-center px-4"
    >
      {/* Empty Cart Illustration */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative mb-12"
      >
        {/* Background decoration */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-full blur-3xl"
          style={{ backgroundColor: `${colors.accent}20` }}
        />

        {/* Main Shopping Bag */}
        <div
          className="relative w-56 h-56 rounded-3xl flex items-center justify-center border-2 border-dashed shadow-2xl"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <ShoppingBag className="w-24 h-24" style={{ color: colors.textSecondary }} />

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, 15, -15, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-6 -right-6"
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl border-2"
              style={{
                backgroundColor: colors.accent,
                borderColor: colors.cardBackground,
              }}
            >
              <Package className="w-7 h-7 text-white" />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, -12, 12, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute -bottom-6 -left-6"
          >
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl border-2"
              style={{
                backgroundColor: colors.accentSecondary,
                borderColor: colors.cardBackground,
              }}
            >
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -10, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-12 -left-10"
          >
            <div
              className="w-10 h-10 rounded-xl shadow-2xl border-2 flex items-center justify-center"
              style={{
                backgroundColor: colors.success,
                borderColor: colors.cardBackground,
              }}
            >
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Empty State Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-2xl mx-auto"
      >
        <h2
          className="text-6xl font-black mb-6"
          style={{ color: colors.text }}
        >
          Giỏ hàng trống
        </h2>

        <p
          className="text-2xl mb-12 leading-relaxed font-medium"
          style={{ color: colors.textSecondary }}
        >
          Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm vật liệu xây dựng chất
          lượng cao của chúng tôi!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          {onContinueShopping ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinueShopping}
              className="inline-flex items-center justify-center px-12 py-5 font-black text-xl rounded-2xl text-white transition-all duration-300 shadow-2xl relative overflow-hidden group"
              style={{ backgroundColor: colors.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.accentSecondary
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = colors.accent
              }}
            >
              <ShoppingBag className="mr-3 w-7 h-7 relative z-10" />
              <span className="relative z-10">Tiếp tục mua sắm</span>
            </motion.button>
          ) : (
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-12 py-5 font-black text-xl rounded-2xl text-white transition-all duration-300 shadow-2xl relative overflow-hidden group"
                style={{ backgroundColor: colors.accent }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accentSecondary
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = colors.accent
                }}
              >
                <ShoppingBag className="mr-3 w-7 h-7 relative z-10" />
                <span className="relative z-10">Tiếp tục mua sắm</span>
              </motion.div>
            </Link>
          )}

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-12 py-5 font-black text-xl rounded-2xl transition-all duration-300 border-2"
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
              <ArrowLeft className="mr-3 w-7 h-7" />
              Về trang chủ
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CartEmpty
