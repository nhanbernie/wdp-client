'use client'

import React from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import FormProvider from '@/components/form/FormProvider'
import { ProductFormLinear } from './ProductFormLinear'
import { ProductFormData } from '../types/product.types'
import { productFormSchema } from '../schemas/product.schema'

interface ProductFormDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  mode: 'create' | 'edit' | 'view'
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
}

export const ProductFormDialog: React.FC<ProductFormDialogProps> = ({
  open,
  onOpenChange,
  mode,
  initialData,
  onSubmit,
}) => {
  const handleCancel = () => {
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' && 'Thêm sản phẩm mới'}
            {mode === 'edit' && 'Chỉnh sửa sản phẩm'}
            {mode === 'view' && 'Xem chi tiết sản phẩm'}
          </DialogTitle>
          <DialogDescription>
            {mode === 'create' && 'Điền thông tin để tạo sản phẩm mới'}
            {mode === 'edit' && 'Cập nhật thông tin sản phẩm'}
            {mode === 'view' && 'Thông tin chi tiết sản phẩm'}
          </DialogDescription>
        </DialogHeader>

        <FormProvider<ProductFormData>
          defaultValues={
            initialData || {
              name: '',
              slug: '',
              price: 0,
              currency: 'VND',
              stock: {
                quantity: 0,
                unit: '',
              },
              categoryId: '',
              brand: '',
              thumbnail: '',
              images: [],
              shortDescription: '',
              description: '',
            }
          }
          validationSchema={productFormSchema}
          onSubmit={onSubmit}
        >
          <ProductFormLinear onCancel={handleCancel} />
        </FormProvider>
      </DialogContent>
    </Dialog>
  )
}
