'use client'

import { motion } from 'framer-motion'
import { useTheme } from '@/contexts/ThemeContext'

export default function ProductCardSkeleton() {
  const { colors } = useTheme()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-[420px] animate-pulse rounded-2xl overflow-hidden border shadow-lg"
      style={{
        backgroundColor: colors.cardBackground,
        borderColor: colors.border,
      }}
    >
      {/* Ảnh sản phẩm gradient shimmer */}
      <div
        className="h-3/5 relative overflow-hidden"
        style={{
          background:
            `linear-gradient(135deg, ${colors.cardBackgroundSecondary} 0%, ${colors.hoverBackground} 50%, ${colors.cardBackgroundSecondary} 100%)`,
        }}
      >
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background:
              `linear-gradient(90deg, transparent 0%, ${colors.border}60 50%, transparent 100%)`,
          }}
        />
      </div>

      {/* Phần nội dung */}
      <div className="h-2/5 p-4 space-y-3">
        <div
          className="w-24 h-6 rounded-full"
          style={{
            background: `linear-gradient(90deg, ${colors.cardBackgroundSecondary}, ${colors.hoverBackground})`,
          }}
        />
        <div className="space-y-2">
          <div
            className="w-full h-5 rounded-lg"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          />
          <div
            className="w-4/5 h-5 rounded-lg"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
          />
        </div>
        <div
          className="w-2/3 h-4 rounded-lg"
          style={{
            background: `linear-gradient(90deg, ${colors.cardBackgroundSecondary}, ${colors.hoverBackground})`,
          }}
        />
        <div className="flex gap-2 pt-2">
          <div
            className="w-20 h-6 rounded-full"
            style={{ backgroundColor: `${colors.accent}20` }}
          />
          <div
            className="w-16 h-6 rounded-full"
            style={{ backgroundColor: `${colors.accentSecondary}20` }}
          />
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
