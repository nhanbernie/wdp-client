'use client'

import React from 'react'
import { motion } from 'motion/react'
import { ShoppingBag, ArrowLeft, Package, Sparkles } from 'lucide-react'
import Link from 'next/link'

interface CartEmptyProps {
  onContinueShopping?: () => void
}

const CartEmpty: React.FC<CartEmptyProps> = ({ onContinueShopping }) => {
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
        {/* Main Shopping Bag */}
        <div className="relative w-48 h-48 rounded-3xl flex items-center justify-center bg-white border-2 border-dashed border-gray-300 shadow-2xl">
          <ShoppingBag className="w-20 h-20 text-gray-400" />

          {/* Floating Elements */}
          <motion.div
            animate={{
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-4 -right-4"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center shadow-lg">
              <Package className="w-4 h-4 text-white" />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -12, 0],
              rotate: [0, -8, 8, 0],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 0.5,
            }}
            className="absolute -bottom-4 -left-4"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-orange-500 to-pink-500 flex items-center justify-center shadow-lg">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </motion.div>

          <motion.div
            animate={{
              y: [0, -8, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2.8,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
            className="absolute top-8 -left-8"
          >
            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-teal-500 shadow-lg" />
          </motion.div>
        </div>

        {/* Decorative Background */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-200/50 via-blue-200/50 to-transparent dark:from-purple-800/30 dark:via-blue-800/30"
        />
      </motion.div>

      {/* Empty State Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="max-w-lg mx-auto"
      >
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Giỏ hàng trống</h2>

        <p className="text-xl mb-10 leading-relaxed text-gray-600">
          Bạn chưa có sản phẩm nào trong giỏ hàng. Hãy khám phá các sản phẩm vật liệu xây dựng chất
          lượng cao của chúng tôi!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {onContinueShopping ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onContinueShopping}
              className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl bg-orange-500 text-white hover:bg-orange-600"
            >
              <ShoppingBag className="mr-3 w-6 h-6" />
              Tiếp tục mua sắm
            </motion.button>
          ) : (
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 shadow-xl hover:shadow-2xl bg-orange-500 text-white hover:bg-orange-600"
              >
                <ShoppingBag className="mr-3 w-6 h-6" />
                Tiếp tục mua sắm
              </motion.div>
            </Link>
          )}

          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center justify-center px-10 py-4 font-semibold rounded-2xl transition-all duration-300 bg-white border-2 border-gray-200 text-gray-800 hover:bg-gray-50 hover:border-orange-500"
            >
              <ArrowLeft className="mr-3 w-6 h-6" />
              Về trang chủ
            </motion.div>
          </Link>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default CartEmpty
