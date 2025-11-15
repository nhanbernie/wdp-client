'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Search, Filter } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import { useProducts } from '@/features/categories/hooks'
import { CategoryFilter } from '@/features/categories/components/CategoryFilter'
import { PriceFilter } from '@/features/categories/components/PriceFilter'
import { ClearFiltersButton } from '@/features/categories/components/ClearFiltersButton'
import ProductCard from '@/components/common/ProductCard'
import ProductCardSkeleton from '@/components/common/ProductCardSkeleton'
import { useTheme } from '@/contexts/ThemeContext'
import { Product } from '@/features/categories/types/categories.types'
import SearchBar from '@/components/layouts/components/SearchBar'

const SearchPage: React.FC = () => {
  const searchParams = useSearchParams()
  const keyword = searchParams.get('q') || ''
  const { colors } = useTheme()

  const filters = {
    q: keyword || undefined,
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    categoryId: searchParams.get('categoryId') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sort: searchParams.get('sort') || 'newest',
    inStock: true,
    withFacets: true,
  }

  const { products, loading, pagination } = useProducts(filters)

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ backgroundColor: colors.background }}
    >
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
            animationDelay: '1s',
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Search Bar - Top of page */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
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
          className="mb-8"
        >
          <div
            className="rounded-2xl shadow-xl p-6"
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
            }}
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-2xl shadow-lg" style={{ backgroundColor: colors.accent }}>
                <Search className="h-7 w-7 text-white" />
              </div>
              <div className="flex-1">
                <h1
                  className="text-3xl font-black flex items-center gap-2"
                  style={{ color: colors.text }}
                >
                  Kết quả tìm kiếm
                </h1>
                <p className="mt-1 font-medium" style={{ color: colors.textSecondary }}>
                  {keyword ? (
                    <>
                      Tìm kiếm cho:{' '}
                      <span className="font-bold" style={{ color: colors.accent }}>
                        &quot;{keyword}&quot;
                      </span>
                      {pagination && (
                        <span className="ml-2">- Tìm thấy {pagination.totalItems} sản phẩm</span>
                      )}
                    </>
                  ) : (
                    'Nhập từ khóa để tìm kiếm sản phẩm'
                  )}
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
                <div className="p-2 rounded-xl" style={{ backgroundColor: colors.accent }}>
                  <Filter className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-xl font-bold" style={{ color: colors.text }}>
                  Bộ lọc
                </h2>
              </div>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
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
            {keyword ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {loading
                  ? Array.from({ length: 6 }).map((_, i) => <ProductCardSkeleton key={i} />)
                  : products.map((product: Product) => (
                      <motion.div
                        key={product.id}
                        whileHover={{ y: -6 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                      >
                        <ProductCard data={product} />
                      </motion.div>
                    ))}
              </div>
            ) : (
              <div
                className="rounded-2xl shadow-xl p-12 text-center"
                style={{
                  backgroundColor: colors.cardBackground,
                }}
              >
                <Search
                  className="h-16 w-16 mx-auto mb-4"
                  style={{ color: colors.textSecondary }}
                />
                <h3 className="text-xl font-bold mb-2" style={{ color: colors.text }}>
                  Bắt đầu tìm kiếm
                </h3>
                <p style={{ color: colors.textSecondary }}>
                  Sử dụng thanh tìm kiếm phía trên để tìm kiếm sản phẩm bạn muốn
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default SearchPage
