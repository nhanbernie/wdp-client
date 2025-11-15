'use client'

import React, { useState, useMemo } from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { useGetProductsQuery } from '@/services/products'
import {
  VendorShopHeader,
  VendorProfileCard,
  VendorCategoryTabs,
  VendorProductsSection,
} from './components'

interface Props {
  vendorId: string
  onOpenProduct: (productId: string) => void
  onChatWithVendor: (vendorId: string) => void
}

export const VendorShop: React.FC<Props> = ({ vendorId, onOpenProduct, onChatWithVendor }) => {
  const { colors } = useTheme()
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const pageLimit = 12

  // Fetch ALL products to get vendor info, total count, and all categories
  const { data: allProductsResp } = useGetProductsQuery(
    { vendorId, page: 1, limit: 100 },
    { skip: !vendorId },
  )

  // Fetch paginated products based on selected category
  const { data: productsResp, isLoading: loadingProducts } = useGetProductsQuery(
    {
      vendorId,
      page: currentPage,
      limit: pageLimit,
      categoryId: selectedCategory !== 'all' ? selectedCategory : undefined,
    },
    { skip: !vendorId },
  )

  // Get vendor profile from all products query
  const profile = allProductsResp?.data?.items?.[0]?.vendor
  const allProducts = allProductsResp?.data?.items || []
  const totalAllProducts = allProductsResp?.data?.pagination?.total || 0

  // Get products from paginated query for display
  const products = productsResp?.data?.items || []
  const totalPages = productsResp?.data?.pagination?.totalPages || 1

  // Extract unique categories from ALL products
  const categories = useMemo(() => {
    const categoryMap = new Map<string, { id: string; name: string; count: number }>()

    allProducts.forEach((product: any) => {
      if (product.category) {
        const existing = categoryMap.get(product.category.id)
        if (existing) {
          existing.count++
        } else {
          categoryMap.set(product.category.id, {
            id: product.category.id,
            name: product.category.name,
            count: 1,
          })
        }
      }
    })

    return Array.from(categoryMap.values()).sort((a, b) => b.count - a.count)
  }, [allProducts])

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setCurrentPage(1)
  }

  const handleChatNow = () => {
    onChatWithVendor(vendorId)
  }

  // Loading state
  if (loadingProducts) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <div
            className="w-16 h-16 border-4 rounded-full animate-spin mx-auto mb-4"
            style={{ borderColor: colors.border, borderTopColor: colors.accent }}
          />
          <p style={{ color: colors.textSecondary }}>Đang tải thông tin shop...</p>
        </div>
      </div>
    )
  }

  // No profile state
  if (!profile) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: colors.background }}
      >
        <div className="text-center">
          <p style={{ color: colors.text }}>Không tìm thấy thông tin shop</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.background }}>
      <VendorShopHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VendorProfileCard
          profile={profile}
          totalProducts={totalAllProducts}
          totalCategories={categories.length}
          onChatNow={handleChatNow}
        />

        <VendorCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleCategorySelect}
        />

        <VendorProductsSection
          products={products}
          viewMode={viewMode}
          currentPage={currentPage}
          totalPages={totalPages}
          onChangeViewMode={setViewMode}
          onOpenProduct={onOpenProduct}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  )
}
