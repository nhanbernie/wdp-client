'use client'

import React from 'react'
import { Plus, Package, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTable } from './components'
import { useProductManagement } from './hooks/useProductManagement'
import { useRouter } from 'next/navigation'
import { useTheme } from '@/contexts/ThemeContext'

export const ProductListPage: React.FC = () => {
  const router = useRouter()
  const { colors } = useTheme()
  const { products, isLoading, deleteProduct } = useProductManagement()

  const handleCreate = () => {
    router.push('/vendor/product-management/new')
  }

  const handleEdit = (product: any) => {
    router.push(`/vendor/product-management/${product.id}/edit`)
  }

  const handleView = (product: any) => {
    router.push(`/vendor/product-management/${product.id}`)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id)
    }
  }

  // Calculate stats
  const productsList = Array.isArray(products) ? products : []
  const totalProducts = productsList.length || 0
  const inStockProducts = productsList.filter((p: any) => p.stockQty > 0).length || 0
  const lowStockProducts =
    productsList.filter((p: any) => p.stockQty > 0 && p.stockQty < 10).length || 0

  return (
    <div className="container mx-auto py-8 px-4">
      <div>
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold mb-2 flex items-center gap-3"
              style={{ color: colors.text }}
            >
              <Package className="w-8 h-8" style={{ color: colors.accent }} />
              Quản lý danh sách sản phẩm
            </h1>
            <p style={{ color: colors.textSecondary }}>Quản lý và theo dõi sản phẩm của bạn</p>
          </div>
          <Button
            onClick={handleCreate}
            className="gap-2"
            style={{ backgroundColor: colors.accent, color: colors.background }}
          >
            <Plus className="h-5 w-5" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Tổng sản phẩm
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5" style={{ color: colors.accent }} />
                <span className="text-2xl font-bold" style={{ color: colors.text }}>
                  {totalProducts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Còn hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" style={{ color: colors.success }} />
                <span className="text-2xl font-bold" style={{ color: colors.success }}>
                  {inStockProducts}
                </span>
              </div>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium" style={{ color: colors.textSecondary }}>
                Sắp hết hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5" style={{ color: colors.warning }} />
                <span className="text-2xl font-bold" style={{ color: colors.warning }}>
                  {lowStockProducts}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Table */}
        <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Danh sách sản phẩm</CardTitle>
            <CardDescription style={{ color: colors.textSecondary }}>
              Quản lý và theo dõi sản phẩm của bạn
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={productsList}
              isLoading={isLoading}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
