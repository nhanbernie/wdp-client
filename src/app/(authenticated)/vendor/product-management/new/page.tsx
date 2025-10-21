'use client'

import { useRouter } from 'next/navigation'
import { ProductFormPage } from '@/features/vendor/product-management'
import { useCreateProductMutation } from '@/services/vendor/vendor.service'
import { ProductFormData } from '@/features/vendor/product-management/types/product.types'
import { toast } from 'sonner'

export default function NewProductPageRoute() {
  const router = useRouter()
  const [createProduct] = useCreateProductMutation()

  const handleSubmit = async (data: ProductFormData) => {
    try {
      const formData = new FormData()

      // Basic required fields
      formData.append('name', data.name)
      formData.append('slug', data.slug || data.name.toLowerCase().replace(/\s+/g, '-'))
      formData.append('categoryId', data.categoryId)
      formData.append('brand', data.brand)
      formData.append('price', data.price.toString())
      formData.append('currency', data.currency || 'VND')
      formData.append('shortDescription', data.shortDescription || '')
      formData.append('description', data.description || '')

      // Stock
      if (data.stock) {
        const stock = {
          quantity: data.stock.quantity || 0,
          unit: data.stock.unit || 'cái',
        }
        formData.append('stock', JSON.stringify(stock))
      }

      // Optional fields
      if (data.salePrice) formData.append('salePrice', data.salePrice.toString())
      if (data.datasheetUrl) formData.append('datasheetUrl', data.datasheetUrl)

      // Thumbnail
      if (data.thumbnail) {
        if (data.thumbnail instanceof File) {
          formData.append('thumbnail', data.thumbnail)
        } else if (typeof data.thumbnail === 'string') {
          formData.append('thumbnailUrl', data.thumbnail)
        }
      }

      // Images
      if (data.images && Array.isArray(data.images)) {
        data.images.forEach((img) => {
          if (img instanceof File) {
            formData.append('images', img)
          }
        })
      }

      // Specs
      if (data.specs && typeof data.specs === 'object' && Object.keys(data.specs).length > 0) {
        formData.append('specs', JSON.stringify(data.specs))
      }

      // Badges
      if (data.badges && Array.isArray(data.badges) && data.badges.length > 0) {
        formData.append('badges', JSON.stringify(data.badges))
      }

      // Options
      if (data.options && Array.isArray(data.options) && data.options.length > 0) {
        const formattedOptions = data.options
          .filter((opt) => opt.name && opt.values && opt.values.length > 0)
          .map((opt) => ({
            name: opt.name,
            displayName: opt.displayName || opt.name,
            values: Array.isArray(opt.values)
              ? opt.values.map((v) => (typeof v === 'string' ? { value: v } : v))
              : [],
          }))
        if (formattedOptions.length > 0) {
          formData.append('options', JSON.stringify(formattedOptions))
        }
      }

      // Variants
      if (data.variants && Array.isArray(data.variants) && data.variants.length > 0) {
        const formattedVariants = data.variants
          .filter((v) => v.price && v.options)
          .map((variant) => {
            const formattedVariant: any = {
              options: variant.options || {},
              price: parseFloat(variant.price?.toString() || '0'),
              stockQty: parseInt((variant.stockQty || variant.stock)?.toString() || '0'),
            }
            if (variant.sku) formattedVariant.sku = variant.sku
            if (variant.specs) formattedVariant.specs = variant.specs
            return formattedVariant
          })
        if (formattedVariants.length > 0) {
          formData.append('variants', JSON.stringify(formattedVariants))
        }
      }

      await createProduct(formData).unwrap()
      toast.success('Tạo sản phẩm thành công!')
      router.push('/vendor/product-management')
    } catch (error: any) {
      if (error?.data?.errors?.validation) {
        toast.error(`Lỗi validation: ${error.data.errors.validation.join(', ')}`)
      } else {
        const errorMessage = error?.data?.message || error?.message || 'Không thể tạo sản phẩm'
        toast.error(errorMessage)
      }
    }
  }

  return <ProductFormPage mode="create" onSubmit={handleSubmit} title="Thêm sản phẩm mới" />
}
