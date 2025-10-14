'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormProvider from '@/components/form/FormProvider'
import { ProductForm } from './components/ProductFormSimple'
import { ProductFormData } from './types/product.types'
import { productFormSchema } from './schemas/product.schema'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'

interface ProductFormPageProps {
  mode: 'create' | 'edit'
  productId?: string
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
  title: string
}

export const ProductFormPage: React.FC<ProductFormPageProps> = ({
  mode,
  productId,
  initialData,
  onSubmit,
  title,
}) => {
  const router = useRouter()
  const { user } = useAuth()

  const handleCancel = () => {
    router.push('/vendor/products')
  }

  const handleFormSubmit = async (data: ProductFormData) => {
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

    await onSubmit(dataWithVendorId as any)
    router.push('/vendor/products')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button variant="outline" size="icon" onClick={handleCancel}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          <p className="text-muted-foreground mt-2">
            {mode === 'create' ? 'Thêm sản phẩm mới vào danh sách' : 'Cập nhật thông tin sản phẩm'}
          </p>
        </div>
      </motion.div>

      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Thông tin sản phẩm</CardTitle>
          </CardHeader>
          <CardContent>
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
              onSubmit={handleFormSubmit}
            >
              <ProductForm onCancel={handleCancel} />
            </FormProvider>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
