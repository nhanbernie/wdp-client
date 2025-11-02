'use client'

import { useParams, useRouter } from 'next/navigation'
import { ProductFormPage } from '@/features/vendor/product-management'
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from '@/services/vendor/vendor.service'
import { ProductFormData } from '@/features/vendor/product-management/types/product.types'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'

export default function EditProductPageRoute() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { user } = useAuth()

  const { data: productData, isLoading, error } = useGetProductDetailQuery(productId)
  const product = productData?.data

  const [updateProduct] = useUpdateProductMutation()

  const handleSubmit = async (data: ProductFormData) => {
    const formData = new FormData()

    try {
      if (product && product.vendorId && (user as any)?.vendorId !== product.vendorId) {
        toast.error('⚠️ Bạn không có quyền chỉnh sửa sản phẩm này!')
        return
      }

      const vendorId = (user as any)?.vendorId || user?.id
      if (vendorId) {
        formData.append('vendorId', vendorId)
      }

      formData.append('name', data.name)
      formData.append('slug', data.slug || data.name.toLowerCase().replace(/\s+/g, '-'))
      formData.append('categoryId', data.categoryId)
      formData.append('brand', data.brand)
      formData.append('price', data.price.toString())
      formData.append('currency', data.currency || 'VND')
      formData.append('shortDescription', data.shortDescription || '')
      formData.append('description', data.description || '')

      if (data.stock) {
        const stock = {
          quantity: data.stock.quantity || 0,
          unit: data.stock.unit || 'cái',
        }
        formData.append('stock', JSON.stringify(stock))
      }

      if (data.salePrice) {
        formData.append('salePrice', data.salePrice.toString())
      }

      if (data.datasheetUrl) {
        formData.append('datasheetUrl', data.datasheetUrl)
      }

      if (data.thumbnail) {
        if (data.thumbnail instanceof File) {
          formData.append('thumbnail', data.thumbnail)
        }
      }

      if (data.images && Array.isArray(data.images) && data.images.length > 0) {
        const newImages = data.images.filter((img) => img instanceof File) as File[]
        if (newImages.length > 0) {
          newImages.forEach((img) => {
            formData.append('images', img)
          })
        }
      }

      await updateProduct({ id: productId, data: formData }).unwrap()
      toast.success('✅ Cập nhật sản phẩm thành công!')
      setTimeout(() => {
        router.push('/vendor/product-management')
      }, 1500)
    } catch (error: any) {
      if (error?.status === 403 || error?.status === 401) {
        toast.error('⚠️ Bạn không có quyền chỉnh sửa sản phẩm này!')
      } else if (error?.status === 404) {
        toast.error('❌ Không tìm thấy sản phẩm!')
      } else if (error?.status === 400) {
        if (error?.data?.errors?.validation) {
          toast.error(`❌ Lỗi validation: ${error.data.errors.validation.join(', ')}`)
        } else if (error?.data?.message) {
          toast.error(`❌ ${error.data.message}`)
        } else {
          toast.error('❌ Dữ liệu không hợp lệ. Vui lòng kiểm tra lại các trường.')
        }
      } else if (error?.data?.errors?.validation) {
        toast.error(`❌ Lỗi validation: ${error.data.errors.validation.join(', ')}`)
      } else if (error?.data?.message) {
        toast.error(`❌ ${error.data.message}`)
      } else {
        const errorMessage = error?.message || 'Không thể cập nhật sản phẩm'
        toast.error(`❌ ${errorMessage}`)
      }
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        <div className="text-muted-foreground">Đang tải thông tin sản phẩm...</div>
      </div>
    )
  }

  if (error || !product) {
    const errorData = error as any
    return (
      <div className="flex flex-col justify-center items-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-destructive">
          {errorData?.status === 403 ? '⚠️ Không có quyền truy cập' : '❌ Không tìm thấy sản phẩm'}
        </h1>
        <p className="text-muted-foreground max-w-md text-center">
          {errorData?.status === 403
            ? 'Bạn không có quyền chỉnh sửa sản phẩm này. Vui lòng kiểm tra lại quyền truy cập.'
            : errorData?.data?.message ||
              'Sản phẩm không tồn tại hoặc đã bị xóa. Vui lòng kiểm tra lại danh sách sản phẩm.'}
        </p>
        <p className="text-sm text-muted-foreground">
          Product ID: <code className="bg-muted px-2 py-1 rounded">{productId}</code>
        </p>
        <button
          onClick={() => router.push('/vendor/product-management')}
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
        >
          Quay lại danh sách sản phẩm
        </button>
      </div>
    )
  }

  const initialData: ProductFormData = {
    name: product.name || '',
    slug: product.slug || '',
    price: Number(product.price) || 0,
    salePrice: product.salePrice ? Number(product.salePrice) : undefined,
    currency: product.currency || 'VND',
    stock: {
      quantity: product.stock?.quantity || product.stockQty || 0,
      unit: product.stock?.unit || product.stockUnit || 'cái',
    },
    categoryId: (product.category as any)?.id || product.categoryId || '',
    brand: product.brand || '',
    thumbnail: product.thumbnail && product.thumbnail.trim() !== '' ? product.thumbnail.trim() : '',
    images: (product.images || [])
      .map((img: any) => img.url)
      .filter((url): url is string => typeof url === 'string' && url.trim() !== ''),
    shortDescription: product.shortDescription || '',
    description: product.description || '',
    datasheetUrl: product.datasheetUrl || undefined,
    specs: product.specs || {},
    badges: product.badges || [],
    options: product.options || [],
    variants:
      product.variants?.map((v) => ({
        sku: v.sku || null,
        options: v.options || {},
        price: Number(v.price) || 0,
        stockQty: v.stockQty || 0,
        specs: v.specs || null,
        image: null,
        stock: undefined,
      })) || [],
  }

  return (
    <ProductFormPage
      mode="edit"
      productId={productId}
      initialData={initialData}
      onSubmit={handleSubmit}
      title="Chỉnh sửa sản phẩm"
    />
  )
}
