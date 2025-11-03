'use client'

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Star, ArrowRight, Zap } from 'lucide-react'
import { fakeAIRecommendations } from '../data/AiRecommenProducts.data'
import { useTheme } from '@/contexts/ThemeContext'

interface AIRecommendationSectionProps {
  productId: string
}

interface RecommendedProduct {
  id: string
  name: string
  description: string
  image: string
  price: number
}

export const AIRecommendationSection: React.FC<AIRecommendationSectionProps> = ({ productId }) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { colors } = useTheme()

  useEffect(() => {
    // Giả lập AI phân tích và gợi ý sản phẩm tương tự
    setTimeout(() => {
      setRecommendations(fakeAIRecommendations)
      setLoading(false)
    }, 1000)
  }, [productId])

  if (loading)
    return (
      <section className="mt-20 mb-16">
        <div className="flex items-center gap-3 mb-8">
          <div
            className="p-3 rounded-2xl shadow-lg"
            style={{ backgroundColor: colors.accent }}
          >
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2
              className="text-3xl font-bold"
              style={{ color: colors.text }}
            >
              Sản phẩm gợi ý
            </h2>
            <p
              className="text-sm font-medium mt-1"
              style={{ color: colors.textSecondary }}
            >
              Được chọn lọc kỹ càng dành cho bạn
            </p>
          </div>
        </div>

        <div
          className="flex flex-col items-center justify-center py-16 rounded-3xl border"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          {/* AI Brain Animation */}
          <div className="relative mb-8">
            {/* Outer pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-32 h-32 border-4 rounded-full animate-ping"
                style={{ borderColor: `${colors.accent}40` }}
              ></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-28 h-28 border-4 rounded-full animate-ping"
                style={{
                  borderColor: `${colors.accentSecondary}40`,
                  animationDelay: '0.5s',
                }}
              ></div>
            </div>

            {/* Main icon container */}
            <div
              className="relative w-24 h-24 rounded-2xl flex items-center justify-center shadow-2xl animate-pulse"
              style={{ backgroundColor: colors.accent }}
            >
              <Sparkles
                className="h-12 w-12 text-white animate-spin"
                style={{ animationDuration: '3s' }}
              />
            </div>

            {/* Floating particles */}
            <div
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full animate-bounce"
              style={{ backgroundColor: colors.accent }}
            ></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.accentSecondary,
                animationDelay: '0.3s',
              }}
            ></div>
            <div
              className="absolute top-1/2 -right-4 w-2 h-2 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.accent,
                animationDelay: '0.6s',
              }}
            ></div>
          </div>

          {/* Text */}
          <div className="text-center space-y-3">
            <h3
              className="text-2xl font-bold"
              style={{ color: colors.text }}
            >
              AI đang phân tích...
            </h3>
            <p
              className="text-sm font-medium max-w-md"
              style={{ color: colors.textSecondary }}
            >
              Chúng tôi đang sử dụng trí tuệ nhân tạo để tìm những sản phẩm phù hợp nhất với bạn
            </p>
          </div>

          {/* Progress bar */}
          <div
            className="mt-8 w-64 h-2 rounded-full overflow-hidden shadow-inner"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          >
            <div
              className="h-full rounded-full animate-pulse"
              style={{
                backgroundColor: colors.accent,
                width: '60%',
              }}
            ></div>
          </div>

          {/* Animated dots */}
          <div className="flex gap-2 mt-6">
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{ backgroundColor: colors.accent }}
            ></div>
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.accentSecondary,
                animationDelay: '0.1s',
              }}
            ></div>
            <div
              className="w-3 h-3 rounded-full animate-bounce"
              style={{
                backgroundColor: colors.accent,
                animationDelay: '0.2s',
              }}
            ></div>
          </div>
        </div>
      </section>
    )

  return (
    <section className="mt-24 mb-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12"
      >
        <div
          className="relative flex items-center justify-between flex-wrap gap-6 p-8 rounded-3xl shadow-2xl"
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
          }}
        >
          <div className="flex items-center gap-5">
            {/* Icon with animation */}
            <motion.div
              animate={{
                rotate: [0, 5, -5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
              className="relative"
            >
              <div
                className="relative p-5 rounded-3xl shadow-2xl"
                style={{ backgroundColor: colors.accent }}
              >
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <div className="">
              <div className="flex items-center gap-3 mb-2">
                <h2
                  className="text-4xl font-black"
                  style={{ color: colors.text }}
                >
                  Sản phẩm gợi ý
                </h2>
                <div
                  className="px-4 py-1.5 text-white text-xs font-black rounded-full shadow-lg animate-pulse"
                  style={{ backgroundColor: colors.accent }}
                >
                  AI POWERED
                </div>
              </div>
              <p
                className="text-base font-bold"
                style={{ color: colors.textSecondary }}
              >
                Được chọn lọc kỹ càng dành riêng cho bạn bởi AI
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 text-white font-bold rounded-2xl shadow-xl transition-all"
            style={{ backgroundColor: colors.accent }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = colors.accentSecondary
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.accent
            }}
          >
            <span>Xem tất cả</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recommendations.map((item, index) => (
          <Link key={item.id} href={`/products/${item.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: index * 0.1,
                type: 'spring',
                stiffness: 100,
              }}
              whileHover={{ y: -8 }}
              className="w-full h-full min-h-[420px] cursor-pointer rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 group relative flex flex-col"
              style={{
                backgroundColor: colors.cardBackground,
              }}
            >
              {/* Image Container */}
              <div className="flex-shrink-0 h-[252px] relative overflow-hidden rounded-t-2xl">
                {/* AI Badge */}
                <div
                  className="absolute z-20 top-4 left-4 rounded-full px-3 py-1.5 text-white shadow-lg"
                  style={{ backgroundColor: colors.error }}
                >
                  <div className="flex items-center gap-1">
                    <Zap className="h-3.5 w-3.5" fill="currentColor" />
                    <p className="text-xs font-bold">AI</p>
                  </div>
                </div>

                {/* Product Image */}
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 300px"
                />
              </div>

              {/* Content Container */}
              <div
                className="flex-1 min-h-0 p-5 flex flex-col justify-between rounded-b-3xl"
                style={{ backgroundColor: colors.cardBackground }}
              >
                <div className="space-y-2.5 flex-shrink-0">
                  {/* Product Name */}
                  <h2
                    className="font-semibold text-base line-clamp-2 transition-colors duration-200"
                    style={{ color: colors.text }}
                  >
                    {item.name}
                  </h2>

                  {/* Description */}
                  <p
                    className="text-sm line-clamp-2 leading-relaxed"
                    style={{ color: colors.textSecondary }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Price Container */}
                <div className="flex items-end justify-between pt-3 mt-auto flex-shrink-0">
                  <div className="flex flex-col gap-0.5 min-w-0 flex-1">
                    <span className="text-xs font-medium" style={{ color: colors.textSecondary }}>
                      Giá chỉ từ
                    </span>
                    <span className="text-xl font-bold" style={{ color: colors.accent }}>
                      {item.price.toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>

      {/* View more section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <button
          className="px-10 py-5 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 "
          style={{
            backgroundColor: colors.cardBackgroundSecondary,
            borderColor: colors.border,
            color: colors.text,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = colors.hoverBackground
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
          }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" style={{ color: colors.accent }} />
            <span className="text-lg">Khám phá thêm sản phẩm</span>
            <ArrowRight className="h-6 w-6" />
          </div>
        </button>
      </motion.div>
    </section>
  )
}
