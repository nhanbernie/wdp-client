'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useCategories } from './hooks'
import { CategoryFilter } from './components/CategoryFilter'
import { SearchFilters } from './components/SearchFilters'
import { ProductGrid } from './components/ProductGrid'

const CategoriesPage: React.FC = () => {
  const { viewMode } = useCategories()

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="flex items-center gap-6 mb-8">
            <Link
              href="/"
              className="p-3 rounded-2xl transition-all duration-200 cart-card border text-foreground hover:shadow-lg"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>

            <div>
              <h1 className="text-4xl font-bold text-foreground">Danh mục sản phẩm</h1>
              <p className="text-xl text-muted-foreground mt-2">
                Khám phá các sản phẩm vật liệu xây dựng
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block space-y-4"
          >
            <CategoryFilter />
            <SearchFilters />
          </motion.aside>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <ProductGrid viewMode={viewMode} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
