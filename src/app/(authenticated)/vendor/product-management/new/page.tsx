'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ProductFormPage } from '@/features/vendor/product-management'
import { useCreateProductMutation } from '@/services/vendor/vendor.service'
import { ProductFormData } from '@/features/vendor/product-management/types/product.types'
import { toast } from 'sonner'
import { CheckCircle2, Sparkles } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function NewProductPageRoute() {
  const router = useRouter()
  const { colors } = useTheme()
  const [createProduct] = useCreateProductMutation()
  const [showSuccessModal, setShowSuccessModal] = useState(false)

  const handleSubmit = async (data: ProductFormData) => {
    try {
      console.log('📤 Full form data:', data)
      console.log('📦 Variants data:', data.variants)
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
        console.log('🔍 Raw variants from form:', data.variants)
        const formattedVariants = data.variants
          .filter((v: any) => v.price && v.options)
          .map((variant: any) => {
            const formattedVariant: any = {
              options: variant.options || {},
              price: parseFloat(variant.price?.toString() || '0'),
              stockQty: parseInt(variant.stockQty?.toString() || '0'),
            }
            if (variant.sku) formattedVariant.sku = variant.sku
            if (variant.specs) formattedVariant.specs = variant.specs
            return formattedVariant
          })
        console.log('📦 Formatted variants to send:', formattedVariants)
        if (formattedVariants.length > 0) {
          formData.append('variants', JSON.stringify(formattedVariants))
          console.log('✅ Variants appended to FormData')
        } else {
          console.log('⚠️ No variants to send (filtered out)')
        }
      } else {
        console.log('⚠️ No variants in form data')
      }

      // Debug: Log FormData contents
      console.log('🚀 FormData entries:')
      for (const pair of formData.entries()) {
        console.log(pair[0] + ':', pair[1])
      }

      await createProduct(formData).unwrap()
      
      // Show success modal with animation
      setShowSuccessModal(true)

      // Navigate after animation
      setTimeout(() => {
        router.push('/vendor/product-management')
      }, 2500)
    } catch (error: any) {
      // Hide success modal if it was showing
      setShowSuccessModal(false)
      
      if (error?.data?.errors?.validation) {
        toast.error(`Lỗi validation: ${error.data.errors.validation.join(', ')}`)
      } else {
        const errorMessage = error?.data?.message || error?.message || 'Không thể tạo sản phẩm'
        toast.error(errorMessage)
      }
    }
  }

  return (
    <div className="relative">
      <ProductFormPage mode="create" onSubmit={handleSubmit} title="Thêm sản phẩm mới" />

      {/* Success Animation Modal */}
      <AnimatePresence>
        {showSuccessModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
          >
            {/* Confetti effect */}
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{
                  opacity: 0,
                  scale: 0,
                  x: '50%',
                  y: '50%',
                }}
                animate={{
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                  x: `${50 + (Math.random() - 0.5) * 100}%`,
                  y: `${50 + (Math.random() - 0.5) * 100}%`,
                  rotate: Math.random() * 360,
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.05,
                  ease: 'easeOut',
                }}
                className="absolute"
              >
                <Sparkles
                  className="w-6 h-6"
                  style={{ color: colors.accent }}
                />
              </motion.div>
            ))}

            {/* Success Card */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: 'spring',
                stiffness: 200,
                damping: 20,
              }}
              className="relative z-10 p-8 rounded-2xl shadow-2xl max-w-md w-full mx-4"
              style={{
                backgroundColor: colors.cardBackground,
                border: `2px solid ${colors.accent}`,
              }}
            >
              <motion.div
                animate={{
                  background: [
                    `linear-gradient(45deg, ${colors.accent}20, transparent)`,
                    `linear-gradient(135deg, ${colors.accent}20, transparent)`,
                    `linear-gradient(225deg, ${colors.accent}20, transparent)`,
                    `linear-gradient(315deg, ${colors.accent}20, transparent)`,
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-2xl"
              />

              <div className="relative z-10 text-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: 2,
                  }}
                  className="inline-block mb-4"
                >
                  <CheckCircle2
                    className="w-20 h-20 mx-auto"
                    style={{ color: colors.accent }}
                  />
                </motion.div>

                <h3
                  className="text-2xl font-bold mb-2"
                  style={{ color: colors.text }}
                >
                  Thành công! 🎉
                </h3>
                <p
                  className="text-base mb-6"
                  style={{ color: colors.textSecondary }}
                >
                  Sản phẩm đã được tạo thành công
                </p>

                {/* Progress bar */}
                <div
                  className="h-1 rounded-full overflow-hidden"
                  style={{ backgroundColor: colors.border }}
                >
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 2, ease: 'linear' }}
                    className="h-full"
                    style={{ backgroundColor: colors.accent }}
                  />
                </div>
                <p
                  className="text-sm mt-3"
                  style={{ color: colors.textSecondary }}
                >
                  Đang chuyển hướng...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
