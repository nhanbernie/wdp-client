'use client'

import React, { useState } from 'react'
import { Plus, Package, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTable, ProductFormDialog } from './components'
import { useProductManagement } from './hooks/useProductManagement'
import { ProductFormData } from './types/product.types'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

export const ProductManagementPage: React.FC = () => {
  const { user } = useAuth()
  const { colors } = useTheme()
  const { products, isLoading, createProduct, updateProduct, deleteProduct } =
    useProductManagement()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [mode, setMode] = useState<'create' | 'edit' | 'view'>('create')

  const handleCreate = () => {
    setMode('create')
    setSelectedProduct(null)
    setDialogOpen(true)
  }

  const handleEdit = (product: any) => {
    setMode('edit')
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleView = (product: any) => {
    setMode('view')
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id)
    }
  }

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Add vendorId to the data and handle null values
      const dataWithVendorId = {
        ...data,
        vendorId: (user as any)?.vendorId || user?.id || '',
        salePrice: data.salePrice || undefined,
        badges: data.badges || undefined,
        specs: data.specs || undefined,
        options: data.options || undefined,
        variants: data.variants || undefined,
        datasheetUrl: data.datasheetUrl || undefined,
      }

      if (mode === 'create') {
        await createProduct(dataWithVendorId as any)
      } else if (mode === 'edit' && selectedProduct?.id) {
        await updateProduct(selectedProduct.id, dataWithVendorId as any)
      }
      setDialogOpen(false)
      setSelectedProduct(null)
    } catch (error) {
      // Error handled in hook
    }
  }

  // Calculate stats
  const totalProducts = products?.length || 0
  const inStockProducts = products?.filter((p: any) => p.stock?.quantity > 0).length || 0
  const lowStockProducts =
    products?.filter((p: any) => p.stock?.quantity > 0 && p.stock?.quantity < 10).length || 0

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
        <ProductTable
          products={products || []}
          isLoading={isLoading}
          onEdit={handleEdit}
          onView={handleView}
          onDelete={handleDelete}
        />

        {/* Product Form Dialog */}
        <ProductFormDialog
          open={dialogOpen}
          onOpenChange={(open) => {
            setDialogOpen(open)
            if (!open) setSelectedProduct(null)
          }}
          onSubmit={handleSubmit}
          initialData={selectedProduct}
          mode={mode}
        />
      </div>
    </div>
  )
}
