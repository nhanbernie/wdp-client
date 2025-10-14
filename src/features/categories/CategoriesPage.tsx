'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { useCategories } from './hooks'
import { CategoryFilter } from './components/CategoryFilter'
import { ProductGrid } from './components/ProductGrid'
import { PriceFilter } from './components/PriceFilter'
import { ClearFiltersButton } from './components/ClearFiltersButton'

const CategoriesPage: React.FC = () => {
  const { viewMode } = useCategories()

  return (
    <div className="min-h-screen pt-20 bg-background">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-[var(--header-horizontal-padding)] py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="hidden lg:block space-y-4 col-span-1"
          >
            <CategoryFilter />
            <PriceFilter />
            <ClearFiltersButton />
          </motion.aside>

          {/* Product Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="col-span-2"
          >
            <ProductGrid viewMode={viewMode} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default CategoriesPage
