'use client'

import { useSearchParams } from 'next/navigation'
import { useProducts } from '../hooks/useProducts'
import { Product } from '../types/categories.types'
import ProductCard from '@/components/common/ProductCard'
import { motion } from 'framer-motion'

interface ProductGridProps {
  viewMode: 'grid' | 'list'
}

export function ProductGrid({ viewMode }: ProductGridProps) {
  const searchParams = useSearchParams()

  const filters = {
    page: Number(searchParams.get('page')) || 1,
    limit: 20,
    categoryId: searchParams.get('categoryId') || undefined,
    minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
    maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
    sort: searchParams.get('sort') || 'newest',
    inStock: true,
    withFacets: true,
  }

  const { products, loading } = useProducts(filters)

  if (loading)
    return (
      <div className="flex justify-center items-center h-60 text-muted-foreground">
        Đang tải sản phẩm...
      </div>
    )

  return (
    <div
      className={
        viewMode === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3' : 'space-y-4'
      }
    >
      {products.map((product: Product) => (
        <motion.div
          key={product.id}
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          <ProductCard data={product} />
        </motion.div>
      ))}
    </div>
  )
}
