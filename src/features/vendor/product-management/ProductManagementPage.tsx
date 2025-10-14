'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Package, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTable, ProductFormDialog } from './components'
import { useProductManagement } from './hooks/useProductManagement'
import { ProductFormData } from './types/product.types'
import { useAuth } from '@/contexts/AuthContext'

export const ProductManagementPage: React.FC = () => {
  const { user } = useAuth()
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
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
            <p className="text-muted-foreground mt-2">Quản lý danh sách sản phẩm của bạn</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-4 w-4" />
            Thêm sản phẩm
          </Button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Sản phẩm trong hệ thống</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Còn hàng</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
            <p className="text-xs text-muted-foreground">Sản phẩm có sẵn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Cần nhập thêm</p>
          </CardContent>
        </Card>
      </motion.div>

      {/* Product Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <CardDescription>Quản lý thông tin và trạng thái sản phẩm</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTable
              products={products || []}
              isLoading={isLoading}
              onEdit={handleEdit}
              onView={handleView}
              onDelete={handleDelete}
            />
          </CardContent>
        </Card>
      </motion.div>

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
  )
}
