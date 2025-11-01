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
} from '@/ui/alert-dialog'
import { Plus, Package } from 'lucide-react'
import { ProductTable } from './components/ProductTable'
import { ProductForm } from './components/ProductForm'
import { useProductManagement } from './hooks/useProductManagement'
import { ProductFormData, ProductFormMode } from './types'
import { Product, CreateProductRequest, UpdateProductRequest } from '@/services/vendor/vendor.types'

export const ProductManagement = () => {
  const { products, isLoading, createProduct, updateProduct, deleteProduct } =
    useProductManagement()

  const [dialogOpen, setDialogOpen] = useState(false)
  const [formMode, setFormMode] = useState<ProductFormMode>('create')
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  // Convert Product to ProductFormData
  const convertToFormData = (product: Product): ProductFormData => {
    return {
      id: product.id,
      name: product.name,
      slug: product.slug,
      categoryId: product.categoryId,
      brand: product.brand || '',
      thumbnail: product.thumbnail,
      images: product.images || [],
      price: typeof product.price === 'string' ? parseFloat(product.price) : product.price,
      salePrice: product.salePrice
        ? typeof product.salePrice === 'string'
          ? parseFloat(product.salePrice)
          : product.salePrice
        : undefined,
      currency: product.currency,
      stock: product.stock,
      badges: product.badges,
      specs: product.specs || {},
      options:
        product.options?.map((opt) => ({
          name: opt.name,
          displayName: opt.displayName,
          values: opt.values.map((v) => v.value),
        })) || [],
      variants:
        product.variants?.map((v) => ({
          sku: v.sku,
          options: v.options,
          price: typeof v.price === 'string' ? parseFloat(v.price) : v.price,
          stockQty: v.stockQty,
          specs: v.specs,
        })) || [],
      shortDescription: product.shortDescription || '',
      description: product.description || '',
      datasheetUrl: product.datasheetUrl || '',
    }
  }

  const handleCreate = () => {
    setFormMode('create')
    setSelectedProduct(null)
    setDialogOpen(true)
  }

  const handleView = (product: Product) => {
    setFormMode('view')
    setSelectedProduct(product)
    setDialogOpen(true)
  }

  const handleEdit = (product: Product) => {
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
      if (formMode === 'create') {
        const createData: CreateProductRequest = {
          name: data.name,
          categoryId: data.categoryId,
          price: data.price,
          stockQty: data.stock.quantity,
          slug: data.slug,
          brand: data.brand,
          salePrice: data.salePrice,
          currency: data.currency,
          stockUnit: data.stock.unit,
          shortDescription: data.shortDescription,
          description: data.description,
          datasheetUrl: data.datasheetUrl,
          isActive: true,
          isFeatured: false,
          specs: data.specs,
          options: data.options?.map((opt) => ({
            name: opt.name,
            displayName: opt.displayName || opt.name,
            values: Array.isArray(opt.values)
              ? opt.values.map((v) => ({ value: typeof v === 'string' ? v : v.value }))
              : [],
          })),
          variants: data.variants?.map((v) => ({
            sku: v.sku,
            options: v.options,
            price: v.price,
            stockQty: v.stockQty,
            specs: v.specs,
          })),
          badges: data.badges,
          thumbnailUrl: typeof data.thumbnail === 'string' ? data.thumbnail : undefined,
          thumbnail: data.thumbnail instanceof File ? data.thumbnail : undefined,
          images:
            Array.isArray(data.images) && data.images.some((img) => img instanceof File)
              ? data.images.filter((img): img is File => img instanceof File)
              : undefined,
        }
        await createProduct(createData)
      } else if (formMode === 'edit' && data.id) {
        const updateData: UpdateProductRequest = {
          name: data.name,
          categoryId: data.categoryId,
          price: data.price,
          stockQty: data.stock.quantity,
          slug: data.slug,
          brand: data.brand,
          salePrice: data.salePrice,
          currency: data.currency,
          stockUnit: data.stock.unit,
          shortDescription: data.shortDescription,
          description: data.description,
          datasheetUrl: data.datasheetUrl,
          isActive: true,
          specs: data.specs,
          options: data.options?.map((opt) => ({
            name: opt.name,
            displayName: opt.displayName || opt.name,
            values: Array.isArray(opt.values)
              ? opt.values.map((v) => ({ value: typeof v === 'string' ? v : v.value }))
              : [],
          })),
          variants: data.variants?.map((v) => ({
            sku: v.sku,
            options: v.options,
            price: v.price,
            stockQty: v.stockQty,
            specs: v.specs,
          })),
          badges: data.badges,
          thumbnailUrl: typeof data.thumbnail === 'string' ? data.thumbnail : undefined,
          thumbnail: data.thumbnail instanceof File ? data.thumbnail : undefined,
          images:
            Array.isArray(data.images) && data.images.some((img) => img instanceof File)
              ? data.images.filter((img): img is File => img instanceof File)
              : undefined,
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
