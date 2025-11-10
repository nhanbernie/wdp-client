'use client'

import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import FormProvider from '@/components/form/FormProvider'
import { ProductForm } from './components/ProductFormSimple'
import { ProductFormData } from './types/product.types'
import { productFormSchema } from './schemas/product.schema'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { colors } = useTheme()

  const handleCancel = () => {
    router.push('/vendor/product-management')
  }

  const handleFormSubmit = async (data: ProductFormData) => {
    try {
      // Add vendorId to the data and handle null values
      const dataWithVendorId = {
        ...data,
        vendorId: (user as any)?.vendorId || user?.id || '',
        salePrice: data.salePrice || undefined,
        // ✅ Only include if has data (empty array = undefined)
        badges: data.badges && data.badges.length > 0 ? data.badges : undefined,
        specs: data.specs && Object.keys(data.specs).length > 0 ? data.specs : undefined,
        options: data.options && data.options.length > 0 ? data.options : undefined,
        variants: data.variants && data.variants.length > 0 ? data.variants : undefined,
        datasheetUrl: data.datasheetUrl || undefined,
      }

      await onSubmit(dataWithVendorId as any)
    } catch (error) {
      console.error('ProductFormPage - Error in handleFormSubmit:', error)
      throw error // Re-throw to let the caller handle it
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={handleCancel}
          style={{
            backgroundColor: colors.cardBackground,
            borderColor: colors.border,
            color: colors.text,
          }}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold" style={{ color: colors.text }}>
            {title}
          </h1>
          <p className="mt-2" style={{ color: colors.textSecondary }}>
            {mode === 'create' ? 'Thêm sản phẩm mới vào danh sách' : 'Cập nhật thông tin sản phẩm'}
          </p>
        </div>
      </div>

      {/* Form Card */}
      <div>
        <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
          <CardHeader>
            <CardTitle style={{ color: colors.text }}>Thông tin sản phẩm</CardTitle>
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
                    unit: 'cái',
                  },
                  categoryId: '',
                  brand: '',
                  thumbnail: undefined,
                  images: [],
                  shortDescription: '',
                  description: '',
                  options: [], // Keep empty array for useFieldArray
                  variants: [], // Keep empty array for useFieldArray
                  specs: {}, // Keep empty object for field iteration
                  badges: [], // Keep empty array for badges
                  datasheetUrl: '',
                  salePrice: undefined,
                }
              }
              validationSchema={productFormSchema}
              onSubmit={handleFormSubmit}
            >
              <ProductForm onCancel={handleCancel} mode={mode} />
            </FormProvider>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
