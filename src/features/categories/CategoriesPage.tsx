'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Filter, Grid3x3, Sparkles } from 'lucide-react'
import { useCategories } from './hooks'
import { CategoryFilter } from './components/CategoryFilter'
import { ProductGrid } from './components/ProductGrid'
import { PriceFilter } from './components/PriceFilter'
import { ClearFiltersButton } from './components/ClearFiltersButton'

const CategoriesPage: React.FC = () => {
  const { viewMode } = useCategories()

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 relative overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-pink-400/20 to-orange-400/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      ></div>

      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-xl p-6 border-2 border-purple-200/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Grid3x3 className="h-7 w-7 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
                  Danh mục sản phẩm
                </h1>
                <p className="text-gray-600 mt-1 font-medium">
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
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-xl p-5 border-2 border-purple-200/50">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg">
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Bộ lọc
                </h2>
              </div>
              <p className="text-sm text-gray-600">Tìm sản phẩm phù hợp với bạn</p>
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
