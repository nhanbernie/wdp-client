'use client'

import React from 'react'
import { useTheme } from '@/contexts/ThemeContext'
import { VendorProductsGrid } from '../../components/VendorProductsGrid'
import { VendorProductDto } from '../../types/vendors.types'
import { ViewModeToggle } from './ViewModeToggle'
import { Package } from 'lucide-react'

interface Props {
  products: VendorProductDto[]
  viewMode: 'grid' | 'list'
  currentPage: number
  totalPages: number
  onChangeViewMode: (mode: 'grid' | 'list') => void
  onOpenProduct: (id: string) => void
  onPageChange: (page: number) => void
}

export const VendorProductsSection: React.FC<Props> = ({
  products,
  viewMode,
  currentPage,
  totalPages,
  onChangeViewMode,
  onOpenProduct,
  onPageChange,
}) => {
  const { colors } = useTheme()

  return (
    <div>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold" style={{ color: colors.text }}>
          Tất cả sản phẩm
        </h2>

        <ViewModeToggle viewMode={viewMode} onChangeViewMode={onChangeViewMode} />
      </div>

      {/* Products Grid/List */}
      {products.length > 0 ? (
        <>
          <VendorProductsGrid
            products={products}
            onOpenProduct={onOpenProduct}
            viewMode={viewMode}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg font-medium transition-opacity disabled:opacity-30"
                style={{
                  backgroundColor: colors.cardBackground,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                Trước
              </button>

              <span style={{ color: colors.text }}>
                Trang {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg font-medium transition-opacity disabled:opacity-30"
                style={{
                  backgroundColor: colors.cardBackground,
                  color: colors.text,
                  border: `1px solid ${colors.border}`,
                }}
              >
                Sau
              </button>
            </div>
          )}
        </>
      ) : (
        <div
          className="text-center py-16 rounded-xl"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <Package size={64} className="mx-auto mb-4" style={{ color: colors.textSecondary }} />
          <p style={{ color: colors.textSecondary }}>Shop chưa có sản phẩm nào</p>
        </div>
      )}
    </div>
  )
}
