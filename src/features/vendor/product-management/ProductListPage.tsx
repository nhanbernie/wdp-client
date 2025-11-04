'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Plus, Package, TrendingUp, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ProductTable } from './components'
import { useProductManagement } from './hooks/useProductManagement'
import { useRouter } from 'next/navigation'

export const ProductListPage: React.FC = () => {
  const router = useRouter()
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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
              <Package className="w-8 h-8 text-blue-600" />
              Quản lý sản phẩm
            </h1>
            <p className="text-gray-600">Quản lý danh sách sản phẩm của bạn</p>
          </div>
          <Button onClick={handleCreate} className="gap-2">
            <Plus className="h-5 w-5" />
            Thêm sản phẩm
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Tổng sản phẩm</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <Package className="w-5 h-5 text-blue-600" />
                <span className="text-2xl font-bold">{totalProducts}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Còn hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <span className="text-2xl font-bold text-green-600">{inStockProducts}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-gray-600">Sắp hết hàng</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-orange-600" />
                <span className="text-2xl font-bold text-orange-600">{lowStockProducts}</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Product Table */}
        <Card>
          <CardHeader>
            <CardTitle>Danh sách sản phẩm</CardTitle>
            <CardDescription>Quản lý và theo dõi sản phẩm của bạn</CardDescription>
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
      </motion.div>
    </div>
  )
}
