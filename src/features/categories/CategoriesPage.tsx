'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid3x3 } from 'lucide-react'
import { useCategories } from './hooks'
import { CategoryFilter } from './components/CategoryFilter'
import { ProductGrid } from './components/ProductGrid'
import { PriceFilter } from './components/PriceFilter'
import { ClearFiltersButton } from './components/ClearFiltersButton'
import { useTheme } from '@/contexts/ThemeContext'
import SearchBar from '@/components/layouts/components/SearchBar'

const CategoriesPage: React.FC = () => {
  const { viewMode } = useCategories()
  const { colors } = useTheme()

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: colors.background }}>
      {/* Subtle Background Decorative Elements */}
      <div className="absolute inset-0 -z-10">
        <div 
          className="absolute top-20 left-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ backgroundColor: `${colors.accent}15` }}
        />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 rounded-full blur-3xl animate-pulse"
          style={{ 
            backgroundColor: `${colors.accentSecondary}15`,
            animationDelay: '1s'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search Bar - Top of page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-32"
        >
          <div className="w-full max-w-2xl mx-auto">
            <SearchBar />
          </div>
        </motion.div>

        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <div 
            className="rounded-2xl shadow-xl p-6"
            style={{ 
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-4">
              <div 
                className="p-3 rounded-2xl shadow-lg"
                style={{ backgroundColor: colors.accent }}
              >
                <Grid3x3 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 
                  className="text-3xl font-black flex items-center gap-2"
                  style={{ color: colors.text }}
                >
                  Danh mục sản phẩm
                </h1>
                <p 
                  className="mt-1 font-medium"
                  style={{ color: colors.textSecondary }}
                >
                  Khám phá bộ sưu tập đa dạng của chúng tôi
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Modern Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block space-y-5 col-span-1"
          >
            {/* Filter Header */}
            <div 
              className="rounded-3xl shadow-xl p-5"
              style={{ 
                backgroundColor: colors.cardBackground,
                borderColor: colors.border,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div 
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: colors.accent }}
                >
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <h2 
                  className="text-xl font-bold"
                  style={{ color: colors.text }}
                >
                  Bộ lọc
                </h2>
              </div>
              <p 
                className="text-sm"
                style={{ color: colors.textSecondary }}
              >
                Tìm sản phẩm phù hợp với bạn
              </p>
            </div>

            <CategoryFilter />
            <PriceFilter />
            <ClearFiltersButton />
          </motion.aside>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-3"
          >
            <ProductGrid viewMode={viewMode} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
