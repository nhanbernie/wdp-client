'use client'

import { Badge } from '@/components/ui/badge'
import { Star, Award, TrendingUp, Sparkles, Shield, Zap, Crown } from 'lucide-react'
import { motion } from 'framer-motion'

interface ProductInfoProps {
  category?: string
  name: string
  brand?: string
  price: number
  salePrice?: number
  colors: any
  brandColors: any
}

export const ProductInfo: React.FC<ProductInfoProps> = ({
  category,
  name,
  brand,
  price,
  salePrice,
  colors,
  brandColors,
}) => {
  const discountPercentage = salePrice ? Math.round(((price - salePrice) / price) * 100) : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="space-y-8"
    >
      {/* Category & Badges - Ultra Premium */}
      <div className="flex items-center gap-3 flex-wrap">
        {category && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          >
            <Badge
              variant="outline"
              className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-indigo-50 via-purple-50 to-indigo-50 border-2 border-indigo-200 text-indigo-700 shadow-lg shadow-indigo-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              <Sparkles className="h-4 w-4 mr-2 inline animate-pulse" />
              {category}
            </Badge>
          </motion.div>
        )}
        {salePrice && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200 }}
          >
            <Badge className="px-5 py-2 text-sm font-black bg-gradient-to-r from-red-500 via-pink-500 to-red-500 text-white shadow-xl shadow-red-300 border-0 hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse">
              <TrendingUp className="h-4 w-4 mr-2 inline" />
              GIẢM {discountPercentage}%
            </Badge>
          </motion.div>
        )}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 200 }}
        >
          <Badge className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 border-2 border-emerald-200 text-emerald-700 shadow-lg shadow-emerald-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Shield className="h-4 w-4 mr-2 inline" />
            Chính hãng
          </Badge>
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: 'spring', stiffness: 200 }}
        >
          <Badge className="px-5 py-2 text-sm font-bold bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200 text-amber-700 shadow-lg shadow-amber-100 hover:shadow-xl hover:scale-105 transition-all duration-300">
            <Crown className="h-4 w-4 mr-2 inline" />
            Best Seller
          </Badge>
        </motion.div>
      </div>

      {/* Product Title - Ultra Premium */}
      <motion.div
        className="space-y-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <h1 className="text-4xl lg:text-6xl font-black leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900">
          {name}
        </h1>
        {brand && (
          <div className="flex items-center gap-3 group">
            <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-slate-50 to-slate-100 rounded-xl border border-slate-200 shadow-sm group-hover:shadow-md transition-all">
              <Zap className="h-5 w-5 text-indigo-600" />
              <span className="text-lg text-slate-700 font-bold">Thương hiệu:</span>
              <span className="text-lg text-indigo-600 font-black">{brand}</span>
            </div>
          </div>
        )}
      </motion.div>

      {/* Rating - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="relative group"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 to-orange-100 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
        <div className="relative flex items-center gap-5 bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 px-8 py-5 rounded-3xl border-2 border-amber-200 shadow-xl hover:shadow-2xl transition-all duration-300">
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}
              >
                <Star
                  className={`h-6 w-6 ${
                    i < 4 ? 'fill-amber-400 text-amber-400 drop-shadow-lg' : 'text-slate-300'
                  }`}
                />
              </motion.div>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <span className="text-2xl font-black text-amber-600">4.0</span>
            <div className="h-8 w-px bg-amber-300"></div>
            <div className="flex flex-col">
              <span className="text-sm text-slate-600 font-bold">12 đánh giá</span>
              <span className="text-xs text-slate-500 font-medium">48 lượt mua</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Price - Ultra Premium */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring' }}
        className="relative group"
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity animate-pulse"></div>

        <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl p-8 shadow-2xl border-2 border-slate-700 overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-pink-500/10 to-indigo-500/10 rounded-full blur-3xl"></div>

          <div className="relative">
            <div className="flex items-center gap-2 mb-3">
              <div className="px-3 py-1 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20">
                <span className="text-xs font-bold text-white/80">GIÁ BÁN</span>
              </div>
            </div>

            <div className="flex items-baseline gap-4 mb-3">
              {salePrice ? (
                <>
                  <span className="text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
                    {salePrice.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xl font-bold text-white/90">VND</span>
                  <div className="flex flex-col">
                    <span className="text-lg text-slate-400 line-through font-medium">
                      {price.toLocaleString('vi-VN')} VND
                    </span>
                    <span className="text-xs text-emerald-400 font-bold">
                      Tiết kiệm {(price - salePrice).toLocaleString('vi-VN')} VND
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <span className="text-5xl lg:text-6xl font-black text-white drop-shadow-2xl">
                    {price.toLocaleString('vi-VN')}
                  </span>
                  <span className="text-xl font-bold text-white/90">VND</span>
                </>
              )}
            </div>

            <div className="flex items-center gap-6 pt-4 border-t border-white/10">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span className="text-sm text-slate-300 font-medium">Giá đã bao gồm VAT</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-amber-400" />
                <span className="text-sm text-slate-300 font-medium">Giá tốt nhất</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
