'use client'

import React, { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import FormProvider from '@/components/form/FormProvider'
import { ProductFormStepper } from './components/ProductFormStepper'
import { ProductFormData } from './types/product.types'
import { productFormSchema } from './schemas/product.schema'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useTheme } from '@/contexts/ThemeContext'
import { toast } from 'sonner'

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
      // Normalize options data - convert {id, value} format to string format
      const normalizedOptions = data.options?.map((option) => ({
        ...option,
        values: option.values?.map((val) => (typeof val === 'string' ? val : val?.value || '')),
      }))

      // ✅ Auto-calculate product stock from variants (NO VALIDATION, just calculate)
      // Product stock = SUM of all variant stocks (read-only, auto-sync)
      let calculatedProductStock = data.stock?.quantity || 0

      if (data.variants && data.variants.length > 0) {
        calculatedProductStock = data.variants.reduce(
          (sum, variant) => sum + (variant.stockQty || 0),
          0,
        )

      }

      // Add vendorId to the data and handle null values
      const dataWithVendorId = {
        ...data,
        vendorId: (user as any)?.vendorId || user?.id || '',
        salePrice: data.salePrice || undefined,
        // ✅ Override product stock with calculated value from variants
        stock: {
          ...data.stock,
          quantity: calculatedProductStock,
        },
        // ✅ Backend expects arrays, send empty array if no data
        badges: data.badges && data.badges.length > 0 ? data.badges : [],
        specs: data.specs && Object.keys(data.specs).length > 0 ? data.specs : undefined,
        options: normalizedOptions && normalizedOptions.length > 0 ? normalizedOptions : [],
        variants: data.variants && data.variants.length > 0 ? data.variants : [],
        datasheetUrl: data.datasheetUrl || undefined,
      }

      await onSubmit(dataWithVendorId as any)
    } catch (error) {
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

      {/* Form */}
      <FormProvider<ProductFormData>
        defaultValues={
          initialData || {
            name: '',
            slug: '',
            price: undefined,
            currency: 'VND',
            stock: {
              quantity: undefined,
              unit: '',
            },
            categoryId: '',
            brand: '',
            thumbnail: undefined,
            images: [],
            shortDescription: '',
            description: '',
            options: [],
            variants: [],
            specs: {},
            badges: [],
            datasheetUrl: '',
            salePrice: undefined,
          }
        }
        validationSchema={productFormSchema}
        onSubmit={handleFormSubmit}
        mode="onBlur"
      >
        {/* Stepper Form */}
        <ProductFormStepper onCancel={handleCancel} mode={mode} />
      </FormProvider>
    </div>
  )
}
