'use client'

import { useParams, useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ProductFormPage } from '@/features/vendor/product-management'
import {
  useGetProductDetailQuery,
  useUpdateProductMutation,
} from '@/services/vendor/vendor.service'
import { ProductFormData } from '@/features/vendor/product-management/types/product.types'
import { toast } from 'sonner'
import { useAuth } from '@/contexts/AuthContext'
import { CheckCircle2, Sparkles } from 'lucide-react'

export default function EditProductPageRoute() {
  const params = useParams()
  const router = useRouter()
  const productId = params.id as string
  const { user } = useAuth()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const { data: productData, isLoading, error } = useGetProductDetailQuery(productId)
  const product = productData?.data

  const [updateProduct] = useUpdateProductMutation()

  // ✅ useMemo phải được gọi trước các early returns
  const initialData: ProductFormData = useMemo(() => {
    if (!product) {
      return {
        name: '',
        slug: '',
        price: 0,
        salePrice: undefined,
        currency: 'VND',
        stock: {
          quantity: 0,
          unit: 'cái',
        },
        categoryId: '',
        brand: '',
        thumbnail: '',
        images: [],
        shortDescription: '',
        description: '',
        datasheetUrl: undefined,
        specs: {},
        badges: [],
        options: [],
        variants: [],
      }
    }

    return {
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
      thumbnail:
        product.thumbnail && product.thumbnail.trim() !== '' ? product.thumbnail.trim() : '',
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
  }, [product])

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

      // Show success modal with animation
      setShowSuccessModal(true)

      // Navigate after animation
      setTimeout(() => {
        router.push('/vendor/product-management')
      }, 2500)
    } catch (error: any) {
      // Hide success modal if it was showing
      setShowSuccessModal(false)

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

  return (
    <>
      <div className="relative">
        <ProductFormPage
          mode="edit"
          productId={productId}
          initialData={initialData}
          onSubmit={handleSubmit}
          title="Chỉnh sửa sản phẩm"
        />

        {/* Success Animation Modal - Only overlay the form page */}
        <AnimatePresence>
          {showSuccessModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
              style={{ minHeight: '100vh' }}
            >
              {/* Confetti particles */}
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{
                    x: '50%',
                    y: '50%',
                    scale: 0,
                    rotate: 0,
                  }}
                  animate={{
                    x: `${50 + (Math.random() - 0.5) * 80}%`,
                    y: `${50 + (Math.random() - 0.5) * 80}%`,
                    scale: Math.random() * 1.5 + 0.5,
                    rotate: Math.random() * 720 - 360,
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: 2,
                    ease: 'easeOut',
                    delay: i * 0.02,
                  }}
                >
                  <Sparkles
                    className="w-6 h-6"
                    style={{
                      color: ['#22c55e', '#3b82f6', '#a855f7', '#f59e0b', '#ec4899'][i % 5],
                    }}
                  />
                </motion.div>
              ))}

              {/* Success card */}
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 10 }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 20,
                }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-2xl max-w-md mx-4 relative overflow-hidden"
              >
                {/* Animated gradient background */}
                <motion.div
                  className="absolute inset-0 opacity-20"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #22c55e, #3b82f6)',
                      'linear-gradient(45deg, #3b82f6, #a855f7)',
                      'linear-gradient(45deg, #a855f7, #22c55e)',
                    ],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />

                <div className="relative z-10 text-center">
                  {/* Success icon with animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: 'spring',
                      stiffness: 200,
                      damping: 15,
                      delay: 0.2,
                    }}
                    className="mb-4 flex justify-center"
                  >
                    <motion.div
                      animate={{
                        rotate: [0, 10, -10, 10, 0],
                      }}
                      transition={{
                        duration: 0.5,
                        delay: 0.5,
                      }}
                    >
                      <CheckCircle2 className="w-20 h-20 text-green-500" strokeWidth={2} />
                    </motion.div>
                  </motion.div>

                  {/* Success text */}
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-2xl font-bold text-gray-900 dark:text-white mb-2"
                  >
                    Cập nhật thành công!
                  </motion.h2>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="text-gray-600 dark:text-gray-300"
                  >
                    Sản phẩm đã được cập nhật thành công
                  </motion.p>

                  {/* Loading bar */}
                  <motion.div
                    className="mt-6 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-500 to-blue-500"
                      initial={{ width: '0%' }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 2, ease: 'linear', delay: 0.6 }}
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  )
}
