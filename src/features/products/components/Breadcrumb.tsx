'use client'

import Link from 'next/link'
import { ChevronRight, Home, FolderOpen } from 'lucide-react'
import { motion } from 'framer-motion'

interface BreadcrumbProps {
  category?: string
  productName: string
  colors: any
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ category, productName, colors }) => {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center gap-3 py-8"
    >
      <div 
        className="flex items-center gap-3 px-5 py-3 rounded-2xl border shadow-lg"
        style={{ 
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-bold transition-all duration-200 group"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textSecondary
          }}
        >
          <div 
            className="p-2 rounded-xl transition-all duration-300 group-hover:shadow-md"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.accent}15`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
            }}
          >
            <Home className="h-4 w-4" style={{ color: colors.text }} />
          </div>
          <span className="hidden sm:inline">Trang chủ</span>
        </Link>

        <ChevronRight className="h-4 w-4" style={{ color: colors.textSecondary }} />

        <Link
          href="/categories"
          className="flex items-center gap-2 text-sm font-bold transition-all duration-200 group"
          style={{ color: colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = colors.accent
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = colors.textSecondary
          }}
        >
          <div 
            className="p-2 rounded-xl transition-all duration-300 group-hover:shadow-md"
            style={{ backgroundColor: colors.cardBackgroundSecondary }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.accent}15`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = colors.cardBackgroundSecondary
            }}
          >
            <FolderOpen className="h-4 w-4" style={{ color: colors.text }} />
          </div>
          <span className="hidden sm:inline">{category || 'Danh mục'}</span>
        </Link>

        <ChevronRight className="h-4 w-4" style={{ color: colors.textSecondary }} />

        <div 
          className="flex items-center gap-2 px-3 py-1.5 rounded-xl border"
          style={{ 
            backgroundColor: `${colors.accent}15`,
            borderColor: colors.accent,
          }}
        >
          <span 
            className="text-sm font-black line-clamp-1 max-w-[200px]"
            style={{ color: colors.accent }}
          >
            {productName}
          </span>
        </div>
      </div>
    </motion.nav>
  )
}
