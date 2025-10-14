'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Plus, Package } from 'lucide-react'
import { ProductTable } from './components/ProductTable'
import { ProductForm } from './components/ProductForm'
import { useProductManagement } from './hooks/useProductManagement'
import { ProductFormData, ProductFormMode } from './types'
import { ProductDto } from '@/services/api/product.type'
import { CreateProductDto, UpdateProductDto } from '@/services/products/product.types'

const ProductManagement = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } =
    useProductManagement()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState<ProductFormMode>('create')
  const [selectedProduct, setSelectedProduct] = useState<ProductDto | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Convert ProductDto to ProductFormData
  const convertToFormData = (product: ProductDto): ProductFormData => {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categoryId: product.category.id,
      brand: product.brand,
      thumbnail: product.thumbnail,
      images: [], // ProductDto doesn't have images array, need to handle
      price: product.price,
      salePrice: product.salePrice,
      currency: product.currency,
      stock: product.stock,
      badges: product.badges,
      specs: product.specsSummary || {},
      options: [],
      variants: [],
      shortDescription: '',
      description: '',
      datasheetUrl: '',
    }
  }

  const handleCreate = () => {
    setFormMode('create')
    setSelectedProduct(null)
    setDialogOpen(true)
  }

  const handleView = (product: ProductDto) => {
    setFormMode('view')
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleEdit = (product: ProductDto) => {
    setFormMode('edit')
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleDeleteClick = (id: string) => {
    setProductToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (productToDelete) {
      try {
        await deleteProduct(productToDelete)
        setDeleteDialogOpen(false)
        setProductToDelete(null)
      } catch (error) {
        // Error handled in hook
      }
    }
  }

  const handleSubmit = async (data: ProductFormData) => {
    try {
      // Get vendorId from auth context or user data
      // For now, using placeholder
      const vendorId = 'current-vendor-id'

      if (formMode === 'create') {
        const createData: CreateProductDto = {
          ...data,
          vendorId,
        }
        await createProduct(createData)
      } else if (formMode === 'edit' && data.id) {
        const updateData: UpdateProductDto = {
          ...data,
          vendorId,
          isActive: true,
        }
        await updateProduct(data.id, updateData)
      }
      setDialogOpen(false)
      setSelectedProduct(null)
    } catch (error) {
      // Error handled in hook
    }
  }

  const handleCancel = () => {
    setDialogOpen(false)
    setSelectedProduct(null)
  }

  const getDialogTitle = () => {
    switch (formMode) {
      case 'create':
        return 'Tạo sản phẩm mới'
      case 'edit':
        return 'Chỉnh sửa sản phẩm'
      case 'view':
        return 'Chi tiết sản phẩm'
    }
  }

  const getDialogDescription = () => {
    switch (formMode) {
      case 'create':
        return 'Điền thông tin để tạo sản phẩm mới'
      case 'edit':
        return 'Cập nhật thông tin sản phẩm'
      case 'view':
        return 'Xem chi tiết thông tin sản phẩm'
    }
  }

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
            Tạo sản phẩm mới
          </Button>
        </div>
      </motion.div>

      {/* Product List */}
      <Card>
        <CardHeader>
          <CardTitle>Danh sách sản phẩm</CardTitle>
          <CardDescription>Tổng số: {products.length} sản phẩm</CardDescription>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            isLoading={isLoading}
          />
        </CardContent>
      </Card>

      {/* Create/Edit/View Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{getDialogTitle()}</DialogTitle>
            <DialogDescription>{getDialogDescription()}</DialogDescription>
          </DialogHeader>
          <ProductForm
            mode={formMode}
            initialData={selectedProduct ? convertToFormData(selectedProduct) : undefined}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isLoading={isLoading}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Xác nhận xóa sản phẩm</AlertDialogTitle>
            <AlertDialogDescription>
              Bạn có chắc chắn muốn xóa sản phẩm này? Hành động này không thể hoàn tác.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Hủy</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Xóa</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}

export default ProductManagement
