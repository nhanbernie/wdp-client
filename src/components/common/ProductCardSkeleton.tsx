'use client'

import { motion } from 'framer-motion'

export default function ProductCardSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[420px] bg-white/90 backdrop-blur-sm animate-pulse rounded-2xl overflow-hidden border-2 border-purple-200/50 shadow-lg"
    >
      {/* Ảnh sản phẩm gradient shimmer */}
      <div className="h-3/5 bg-gradient-to-br from-purple-200 via-blue-200 to-pink-200 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
      </div>

      {/* Phần nội dung */}
      <div className="h-2/5 p-4 space-y-3">
        <div className="w-24 h-6 bg-gradient-to-r from-purple-200 to-blue-200 rounded-full" />
        <div className="space-y-2">
          <div className="w-full h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
          <div className="w-4/5 h-5 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg" />
        </div>
        <div className="w-2/3 h-4 bg-gradient-to-r from-blue-200 to-purple-200 rounded-lg" />
        <div className="flex gap-2 pt-2">
          <div className="w-20 h-6 bg-gradient-to-r from-green-200 to-emerald-200 rounded-full" />
          <div className="w-16 h-6 bg-gradient-to-r from-red-200 to-pink-200 rounded-full" />
        </div>
      </div>

      {/* Shimmer animation style */}
      <style jsx>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </motion.div>
  )
}
