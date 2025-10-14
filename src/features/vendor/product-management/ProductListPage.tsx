'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Package, TrendingUp, DollarSign, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTable } from './components'
import { useProductManagement } from './hooks/useProductManagement'
import { useRouter } from 'next/navigation'

export const ProductListPage: React.FC = () => {
  const router = useRouter()
  const { products, isLoading, deleteProduct } = useProductManagement()

  const handleCreate = () => {
    router.push('/vendor/products/new')
  }

  const handleEdit = (product: any) => {
    router.push(`/vendor/products/${product.id}/edit`)
  }

  const handleView = (product: any) => {
    router.push(`/vendor/products/${product.id}`)
  }

  const handleDelete = async (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này?')) {
      await deleteProduct(id)
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
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quản lý sản phẩm</h1>
          <p className="text-muted-foreground mt-2">Quản lý danh sách sản phẩm của bạn</p>
        </div>
        <Button onClick={handleCreate} className="gap-2">
          <Plus className="h-5 w-5" />
          Thêm sản phẩm
        </Button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 md:grid-cols-3"
      >
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tổng sản phẩm</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">Tất cả sản phẩm</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Còn hàng</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{inStockProducts}</div>
            <p className="text-xs text-muted-foreground">Sản phẩm có sẵn</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Sắp hết hàng</CardTitle>
            <AlertCircle className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{lowStockProducts}</div>
            <p className="text-xs text-muted-foreground">Dưới 10 sản phẩm</p>
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
            <CardDescription>Quản lý và theo dõi sản phẩm của bạn</CardDescription>
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
    </div>
  )
}
