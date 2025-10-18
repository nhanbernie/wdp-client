'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Star, TrendingUp, Zap, ArrowRight } from 'lucide-react'
import { fakeAIRecommendations } from '../data/AiRecommenProducts.data'

interface AIRecommendationSectionProps {
  productId: string
  colors: { background: string; text: string }
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
          <div className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-slate-900">Sản phẩm gợi ý</h2>
            <p className="text-sm text-slate-600 font-medium mt-1">
              Được chọn lọc kỹ càng dành cho bạn
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center py-16 bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 rounded-3xl border border-purple-200">
          {/* AI Brain Animation */}
          <div className="relative mb-8">
            {/* Outer pulse rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 border-4 border-purple-200 rounded-full animate-ping"></div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div
                className="w-28 h-28 border-4 border-pink-200 rounded-full animate-ping"
                style={{ animationDelay: '0.5s' }}
              ></div>
            </div>

            {/* Main icon container */}
            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl shadow-purple-300 animate-pulse">
              <Sparkles
                className="h-12 w-12 text-white animate-spin"
                style={{ animationDuration: '3s' }}
              />
            </div>

            {/* Floating particles */}
            <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 rounded-full animate-bounce"></div>
            <div
              className="absolute -bottom-2 -left-2 w-3 h-3 bg-pink-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.3s' }}
            ></div>
            <div
              className="absolute top-1/2 -right-4 w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
              style={{ animationDelay: '0.6s' }}
            ></div>
          </div>

          {/* Text */}
          <div className="text-center space-y-3">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600">
              AI đang phân tích...
            </h3>
            <p className="text-sm text-slate-600 font-medium max-w-md">
              Chúng tôi đang sử dụng trí tuệ nhân tạo để tìm những sản phẩm phù hợp nhất với bạn
            </p>
          </div>

          {/* Progress bar */}
          <div className="mt-8 w-64 h-2 bg-white rounded-full overflow-hidden shadow-inner">
            <div
              className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-indigo-500 rounded-full animate-pulse"
              style={{ width: '60%' }}
            ></div>
          </div>

          {/* Animated dots */}
          <div className="flex gap-2 mt-6">
            <div className="w-3 h-3 bg-purple-500 rounded-full animate-bounce"></div>
            <div
              className="w-3 h-3 bg-pink-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.1s' }}
            ></div>
            <div
              className="w-3 h-3 bg-indigo-500 rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
          </div>
        </div>
      </section>
    )

  return (
    <section className="mt-24 mb-20">
      {/* Header - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative mb-12"
      >
        {/* Background decoration */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100 rounded-3xl blur-3xl opacity-30"></div>

        <div className="relative flex items-center justify-between flex-wrap gap-6 bg-gradient-to-r from-white via-slate-50 to-white p-8 rounded-3xl border-2 border-slate-200 shadow-2xl">
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
              <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl blur-xl opacity-50"></div>
              <div className="relative p-5 bg-gradient-to-br from-purple-500 via-pink-500 to-indigo-500 rounded-3xl shadow-2xl">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
            </motion.div>

            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-4xl font-black text-slate-900">Sản phẩm gợi ý</h2>
                <div className="px-4 py-1.5 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-black rounded-full shadow-lg animate-pulse">
                  AI POWERED
                </div>
              </div>
              <p className="text-base text-slate-600 font-bold">
                🎯 Được chọn lọc kỹ càng dành riêng cho bạn bởi AI
              </p>
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-2xl shadow-xl transition-all"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </div>
      </motion.div>

      {/* Products Grid - Ultra Premium */}
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
              className="h-full"
            >
              <Card className="relative rounded-3xl overflow-hidden transition-all bg-white border-2 border-slate-200 hover:border-indigo-300 hover:shadow-2xl h-full group">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

                <div className="relative">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 to-slate-100">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={400}
                      height={400}
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Badges on image */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + index * 0.1 }}
                        className="px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs font-black rounded-xl shadow-xl backdrop-blur-sm"
                      >
                        <TrendingUp className="h-3 w-3 inline mr-1" />
                        HOT
                      </motion.div>
                      <motion.div
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.3 + index * 0.1 }}
                        className="px-4 py-2 bg-white/95 backdrop-blur-md text-slate-900 text-xs font-black rounded-xl shadow-lg"
                      >
                        <Zap className="h-3 w-3 inline mr-1 text-amber-500" />
                        Bán chạy
                      </motion.div>
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-2 bg-black/70 backdrop-blur-md rounded-xl">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-white text-sm font-bold">4.5</span>
                    </div>

                    {/* Quick view button */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-900 font-black rounded-2xl shadow-2xl flex items-center gap-2 transition-all hover:scale-105">
                        <span>Xem nhanh</span>
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6 space-y-4">
                    {/* Product name */}
                    <h3 className="text-xl font-black text-slate-900 line-clamp-2 group-hover:text-indigo-600 transition-colors leading-tight">
                      {item.name}
                    </h3>

                    {/* Description */}
                    <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed font-medium">
                      {item.description}
                    </p>

                    {/* Price and action */}
                    <div className="flex items-center justify-between pt-4 border-t-2 border-slate-100">
                      <div className="flex flex-col">
                        <span className="text-xs text-slate-500 font-bold mb-1">Giá chỉ từ</span>
                        <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
                          {item.price.toLocaleString()}
                        </p>
                        <span className="text-xs text-slate-600 font-bold">VND</span>
                      </div>

                      <div className="flex flex-col gap-2">
                        <div className="px-4 py-2 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200 text-emerald-700 text-xs font-black rounded-xl text-center">
                          MỚI 100%
                        </div>
                        <div className="px-4 py-2 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 text-amber-700 text-xs font-black rounded-xl text-center">
                          FREE SHIP
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
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
        <button className="px-10 py-5 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-900 font-black rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-slate-300">
          <div className="flex items-center gap-3">
            <Sparkles className="h-6 w-6" />
            <span className="text-lg">Khám phá thêm sản phẩm</span>
            <ArrowRight className="h-6 w-6" />
          </div>
        </button>
      </motion.div>
    </section>
  )
}
