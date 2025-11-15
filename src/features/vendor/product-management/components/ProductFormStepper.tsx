'use client'

import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { motion, AnimatePresence } from 'motion/react'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { SelectField } from '@/components/common/SelectField'
import { ImageUpload, MultipleImageUpload } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  List,
  FileText,
  Grid3x3,
  AlertCircle,
  Layers,
  Info,
  ChevronLeft,
  ChevronRight,
  Check,
} from 'lucide-react'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'
import { ProductFormData } from '../types/product.types'
import { ProductOptionsField } from './ProductOptionsField'
import { ProductVariantsField } from './ProductVariantsField'
import { ProductSpecsField } from './ProductSpecsField'
import { ProductBadgesField } from './ProductBadgesField'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductFormStepperProps {
  onCancel: () => void
  mode?: 'create' | 'edit'
}

const STEPS = [
  {
    id: 1,
    title: 'Thông tin cơ bản',
    description: 'Thông tin chính về sản phẩm',
    icon: Package,
  },
  {
    id: 2,
    title: 'Giá & Tồn kho',
    description: 'Giá bán và số lượng',
    icon: DollarSign,
  },
  {
    id: 3,
    title: 'Hình ảnh',
    description: 'Ảnh đại diện và chi tiết',
    icon: ImageIcon,
  },
  {
    id: 4,
    title: 'Mô tả',
    description: 'Mô tả chi tiết sản phẩm',
    icon: FileText,
  },
  {
    id: 5,
    title: 'Thông số kỹ thuật',
    description: 'Specs và nhãn',
    icon: List,
  },
  {
    id: 6,
    title: 'Tùy chọn & Biến thể',
    description: 'Options và variants',
    icon: Grid3x3,
  },
]

export const ProductFormStepper: React.FC<ProductFormStepperProps> = ({
  onCancel,
  mode = 'create',
}) => {
  const { colors } = useTheme()
  const [currentStep, setCurrentStep] = useState(1)
  const {
    control,
    watch,
    setValue,
    trigger,
    formState: { errors, isSubmitting },
  } = useFormContext<ProductFormData>()

  // 🔍 Debug: Log form values when they change
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // ✅ Auto-generate slug from name in CREATE mode only
  useEffect(() => {
    if (mode !== 'create') return

    const subscription = watch((value, { name: fieldName, type }) => {
      // Only auto-generate slug when user types in name field
      if (fieldName === 'name' && type === 'change' && value.name) {
        const autoSlug = value.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
          .replace(/đ/g, 'd')
          .replace(/[^a-z0-9\s-]/g, '') // Remove special chars
          .replace(/\s+/g, '-') // Replace spaces with hyphens
          .replace(/-+/g, '-') // Replace multiple hyphens with single
          .replace(/^-|-$/g, '') // Remove leading/trailing hyphens

        // Only set if slug is empty or hasn't been manually edited
        const currentSlug = value.slug || ''
        if (!currentSlug || currentSlug === '') {
          setValue('slug', autoSlug, { shouldValidate: false, shouldDirty: true })
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [watch, setValue, mode])

  const { data: categoriesData } = useGetCategoriesQuery({})
  const categoriesArray = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : categoriesData?.data?.items || []

  const categoryOptions = categoriesArray.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }))

  const currencyOptions = [
    { value: 'VND', label: 'VND' },
    { value: 'USD', label: 'USD' },
  ]

  // Count errors for each step
  const getStepErrors = (stepId: number): number => {
    let count = 0
    switch (stepId) {
      case 1:
        if (errors.name) count++
        if (errors.slug) count++
        if (errors.categoryId) count++
        if (errors.brand) count++
        if (errors.shortDescription) count++
        break
      case 2:
        if (errors.price) count++
        if (errors.currency) count++
        if (errors.stock) count++
        break
      case 3:
        if (errors.thumbnail) count++
        if (errors.images) count++
        break
      case 4:
        if (errors.description) count++
        break
      case 6:
        if (errors.options) count++
        if (errors.variants) count++
        break
    }
    return count
  }

  const handleNext = async () => {
    // Validate current step fields before proceeding
    let fieldsToValidate: (keyof ProductFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'slug', 'categoryId', 'brand', 'shortDescription']
        break
      case 2:
        fieldsToValidate = ['price', 'currency', 'stock']
        break
      case 3:
        fieldsToValidate = ['thumbnail', 'images']
        break
      case 4:
        fieldsToValidate = ['description']
        break
      case 6:
        fieldsToValidate = ['options', 'variants']
        break
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate as any)
      if (!isValid) {
        return
      }
    }

    if (currentStep < STEPS.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleStepClick = async (stepId: number) => {
    // Allow going back without validation
    if (stepId < currentStep) {
      setCurrentStep(stepId)
      return
    }

    // Going forward - validate current step first
    let fieldsToValidate: (keyof ProductFormData)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ['name', 'slug', 'categoryId', 'brand', 'shortDescription']
        break
      case 2:
        fieldsToValidate = ['price', 'currency', 'stock']
        break
      case 3:
        fieldsToValidate = ['thumbnail', 'images']
        break
      case 4:
        fieldsToValidate = ['description']
        break
      case 6:
        fieldsToValidate = ['options', 'variants']
        break
    }

    if (fieldsToValidate.length > 0) {
      const isValid = await trigger(fieldsToValidate as any)
      if (!isValid) {
        return // Don't allow step change if validation fails
      }
    }

    setCurrentStep(stepId)
  }

  const renderStepContent = () => {
    // ✅ Render ALL steps at once, but hide inactive ones with CSS
    // This prevents React Hook Form from losing field registration
    return (
      <>
        {/* Step 1: Basic Info */}
        <div className={currentStep === 1 ? 'block space-y-4' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField name="name" label="Tên sản phẩm" placeholder="Nhập tên sản phẩm" required />
            <TextField
              name="slug"
              label="Slug (URL-friendly)"
              placeholder="san-pham-moi"
              required
            />
          </div>

          <div
            className="flex items-start gap-2 p-3 rounded-lg text-sm"
            style={{
              backgroundColor: colors.accent + '08',
              border: `1px solid ${colors.accent}20`,
              color: colors.textSecondary,
            }}
          >
            <Info className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: colors.accent }} />
            <span>Slug tự động tạo từ tên sản phẩm khi tạo mới</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="categoryId"
              control={control}
              render={({ field }) => (
                <SelectField
                  name="categoryId"
                  label="Danh mục"
                  options={categoryOptions}
                  required
                />
              )}
            />
            <TextField
              name="brand"
              label="Thương hiệu"
              placeholder="Nhập tên thương hiệu"
              required
            />
          </div>

          <TextAreaField
            name="shortDescription"
            label="Mô tả ngắn"
            placeholder="Mô tả ngắn gọn về sản phẩm (tối đa 500 ký tự)"
            rows={3}
            required
          />
        </div>

        {/* Step 2: Pricing & Stock */}
        <div className={currentStep === 2 ? 'block space-y-4' : 'hidden'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextField
              name="price"
              label="Giá gốc"
              type="number"
              placeholder="Nhập giá sản phẩm"
              required
            />
            <TextField
              name="salePrice"
              label="Giá khuyến mãi"
              type="number"
              placeholder="Nhập giá khuyến mãi (tùy chọn)"
            />
            <Controller
              name="currency"
              control={control}
              render={({ field }) => (
                <SelectField
                  name="currency"
                  label="Đơn vị tiền tệ"
                  options={currencyOptions}
                  required
                />
              )}
            />
          </div>

          <Separator className="my-4" style={{ backgroundColor: colors.border + '50' }} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4" data-field="stock">
            <TextField
              name="stock.quantity"
              label="Số lượng tồn kho"
              type="number"
              placeholder="Nhập số lượng"
              required
            />
            <Controller
              name="stock.unit"
              control={control}
              render={({ field }) => (
                <SelectField
                  name="stock.unit"
                  label="Đơn vị"
                  options={[
                    { value: 'cái', label: 'Cái' },
                    { value: 'bộ', label: 'Bộ' },
                    { value: 'hộp', label: 'Hộp' },
                    { value: 'kg', label: 'Kg' },
                    { value: 'mét', label: 'Mét' },
                    { value: 'thùng', label: 'Thùng' },
                    { value: 'chiếc', label: 'Chiếc' },
                    { value: 'lít', label: 'Lít' },
                  ]}
                  required
                />
              )}
            />
          </div>
        </div>

        {/* Step 3: Images */}
        <div className={currentStep === 3 ? 'block space-y-6' : 'hidden'}>
          <Controller
            name="thumbnail"
            control={control}
            render={({ field }) => (
              <ImageUpload
                value={field.value}
                onChange={field.onChange}
                error={errors.thumbnail?.message}
              />
            )}
          />

          <Separator className="my-6" style={{ backgroundColor: colors.border + '50' }} />

          <Controller
            name="images"
            control={control}
            render={({ field }) => (
              <MultipleImageUpload
                values={field.value || []}
                onChange={field.onChange}
                maxFiles={10}
              />
            )}
          />
          {errors.images && (
            <p className="text-sm mt-2 flex items-center gap-1" style={{ color: colors.error }}>
              <AlertCircle className="h-4 w-4" />
              {errors.images.message}
            </p>
          )}
        </div>

        {/* Step 4: Description */}
        <div className={currentStep === 4 ? 'block space-y-4' : 'hidden'}>
          <TextAreaField
            name="description"
            label="Mô tả sản phẩm"
            placeholder="Nhập mô tả chi tiết về sản phẩm, tính năng, lợi ích..."
            rows={8}
            required
          />
          <TextField
            name="datasheetUrl"
            label="Link Datasheet"
            placeholder="https://example.com/datasheet.pdf (tùy chọn)"
          />
        </div>

        {/* Step 5: Specs & Badges */}
        <div className={currentStep === 5 ? 'block space-y-6' : 'hidden'}>
          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>
              Thông số kỹ thuật
            </h4>
            <ProductSpecsField name="specs" />
          </div>

          <Separator className="my-6" style={{ backgroundColor: colors.border + '50' }} />

          <div>
            <h4 className="text-sm font-semibold mb-4" style={{ color: colors.text }}>
              Nhãn sản phẩm
            </h4>
            <ProductBadgesField name="badges" />
          </div>
        </div>

        {/* Step 6: Options & Variants */}
        <div className={currentStep === 6 ? 'block space-y-6' : 'hidden'}>
          <ProductOptionsField name="options" />
          {errors.options && typeof (errors.options as any).message === 'string' && (
            <div
              className="mt-3 p-3 rounded-lg flex items-center gap-2 text-sm"
              style={{
                backgroundColor: colors.error + '10',
                border: `1px solid ${colors.error}30`,
                color: colors.error,
              }}
            >
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{(errors.options as any).message}</span>
            </div>
          )}

          <Separator className="my-8" style={{ backgroundColor: colors.border + '50' }} />

          <div data-field="variants">
            <ProductVariantsField name="variants" />
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="space-y-6">
      {/* Progress Stepper - Horizontal */}
      <div className="relative px-4 py-6">
        {/* Background glow effect for active step */}
        <motion.div
          className="absolute inset-0 rounded-2xl blur-3xl opacity-20 pointer-events-none"
          animate={{
            background: `radial-gradient(circle at ${(currentStep / STEPS.length) * 100}% 50%, ${
              colors.accent
            }, transparent 70%)`,
          }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        />

        <div className="flex items-center justify-between relative">
          {STEPS.map((step, index) => {
            const isActive = currentStep === step.id
            const isCompleted = currentStep > step.id
            const errorCount = getStepErrors(step.id)
            const isLast = index === STEPS.length - 1

            return (
              <React.Fragment key={step.id}>
                {/* Step Circle */}
                <div className="flex flex-col items-center relative z-10">
                  <motion.button
                    type="button"
                    onClick={() => handleStepClick(step.id)}
                    className="relative"
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                  >
                    {/* Glow effect for active step */}
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        animate={{
                          boxShadow: [
                            `0 0 20px ${colors.accent}40`,
                            `0 0 30px ${colors.accent}60`,
                            `0 0 20px ${colors.accent}40`,
                          ],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                      />
                    )}

                    {/* Circle */}
                    <motion.div
                      className="w-12 h-12 rounded-full flex items-center justify-center relative overflow-hidden"
                      animate={{
                        backgroundColor: isCompleted
                          ? colors.accent
                          : isActive
                          ? colors.cardBackground
                          : colors.cardBackground,
                        borderColor: isActive || isCompleted ? colors.accent : colors.border,
                        scale: isActive ? 1.15 : 1,
                        boxShadow: isActive
                          ? `0 4px 20px ${colors.accent}30, 0 0 0 4px ${colors.accent}10`
                          : isCompleted
                          ? `0 2px 8px ${colors.accent}20`
                          : '0 2px 4px rgba(0,0,0,0.05)',
                      }}
                      transition={{ duration: 0.4, ease: 'easeOut' }}
                      style={{
                        border: `3px solid`,
                      }}
                    >
                      {/* Active step gradient overlay */}
                      {isActive && (
                        <motion.div
                          className="absolute inset-0"
                          animate={{
                            background: `conic-gradient(from 0deg, ${colors.accent}20, transparent, ${colors.accent}20)`,
                            rotate: 360,
                          }}
                          transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: 'linear',
                          }}
                        />
                      )}

                      <AnimatePresence mode="wait">
                        {isCompleted ? (
                          <motion.div
                            key="check"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{
                              duration: 0.5,
                              ease: [0.34, 1.56, 0.64, 1],
                              type: 'spring',
                              stiffness: 300,
                            }}
                          >
                            <Check className="h-6 w-6 text-white" strokeWidth={3} />
                          </motion.div>
                        ) : (
                          <motion.span
                            key="number"
                            className="text-base font-bold relative z-10"
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.5, opacity: 0 }}
                            style={{
                              color: isActive ? colors.accent : colors.textSecondary,
                              textShadow: isActive ? `0 0 10px ${colors.accent}40` : 'none',
                            }}
                            transition={{ duration: 0.3 }}
                          >
                            {step.id}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.div>

                    {/* Error Badge with pulse */}
                    <AnimatePresence>
                      {errorCount > 0 && (
                        <motion.div
                          initial={{ scale: 0, opacity: 0 }}
                          animate={{
                            scale: 1,
                            opacity: 1,
                          }}
                          exit={{ scale: 0, opacity: 0 }}
                          transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                          className="absolute -top-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold"
                          style={{
                            backgroundColor: colors.error,
                            color: '#ffffff',
                            border: `2px solid ${colors.cardBackground}`,
                            boxShadow: `0 2px 8px ${colors.error}40, 0 0 0 3px ${colors.error}10`,
                          }}
                        >
                          <motion.span
                            animate={{ scale: [1, 1.1, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {errorCount}
                          </motion.span>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  {/* Step Label */}
                  <motion.div
                    className="mt-3 text-center max-w-[110px]"
                    animate={{
                      opacity: isActive ? 1 : 0.7,
                      y: isActive ? 0 : 3,
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.p
                      className="text-xs font-semibold truncate"
                      style={{
                        color: isActive ? colors.text : colors.textSecondary,
                      }}
                      animate={{
                        fontWeight: isActive ? 700 : 600,
                      }}
                    >
                      {step.title}
                    </motion.p>
                  </motion.div>
                </div>

                {/* Connector Line with animated progress */}
                {!isLast && (
                  <div className="flex-1 relative mx-3 self-start" style={{ marginTop: '24px' }}>
                    {/* Background line */}
                    <div
                      className="absolute inset-0 rounded-full"
                      style={{
                        backgroundColor: colors.border,
                        opacity: 0.3,
                        height: '3px',
                      }}
                    />

                    {/* Animated progress line */}
                    <motion.div
                      className="absolute inset-0 rounded-full overflow-hidden"
                      initial={{ scaleX: 0 }}
                      animate={{
                        scaleX: isCompleted ? 1 : 0,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.43, 0.13, 0.23, 0.96],
                      }}
                      style={{
                        transformOrigin: 'left',
                        background: `linear-gradient(90deg, ${colors.accent}, ${colors.accent}dd)`,
                        boxShadow: isCompleted ? `0 0 10px ${colors.accent}40` : 'none',
                        height: '3px',
                      }}
                    />

                    {/* Animated shimmer effect when completing */}
                    {isCompleted && (
                      <motion.div
                        className="absolute inset-0 rounded-full"
                        style={{ height: '3px' }}
                        animate={{
                          background: [
                            `linear-gradient(90deg, transparent, ${colors.accent}40, transparent)`,
                            `linear-gradient(90deg, transparent, ${colors.accent}40, transparent)`,
                          ],
                          x: ['-100%', '200%'],
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          repeatDelay: 3,
                          ease: 'easeInOut',
                        }}
                      />
                    )}
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Step Content Card */}
      <Card
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              {React.createElement(STEPS[currentStep - 1].icon, {
                className: 'h-5 w-5',
                style: { color: colors.accent },
              })}
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                {STEPS[currentStep - 1].title}
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                {STEPS[currentStep - 1].description}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">{renderStepContent()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div
        className="flex items-center justify-between p-4 rounded-lg"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <Button
          type="button"
          variant="outline"
          onClick={currentStep === 1 ? onCancel : handleBack}
          className="min-w-[120px] font-medium"
          style={{
            borderColor: colors.border,
            color: colors.text,
            backgroundColor: colors.cardBackground,
          }}
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          {currentStep === 1 ? 'Hủy' : 'Quay lại'}
        </Button>

        <div className="flex gap-3">
          {currentStep < STEPS.length ? (
            <Button
              type="button"
              onClick={handleNext}
              className="min-w-[140px] font-medium"
              style={{
                backgroundColor: colors.accent,
                color: '#ffffff',
                boxShadow: `0 2px 8px ${colors.accent}40`,
              }}
            >
              Tiếp theo
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[140px] font-medium"
              style={{
                backgroundColor: colors.accent,
                color: '#ffffff',
                boxShadow: `0 2px 8px ${colors.accent}40`,
              }}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Đang lưu...
                </span>
              ) : mode === 'create' ? (
                'Tạo sản phẩm'
              ) : (
                'Cập nhật sản phẩm'
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
