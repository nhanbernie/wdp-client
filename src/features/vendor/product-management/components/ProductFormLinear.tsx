'use client'

import React, { useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { SelectField } from '@/components/common/SelectField'
import { ImageUpload, MultipleImageUpload } from '@/components/common'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Package,
  DollarSign,
  Image as ImageIcon,
  List,
  FileText,
  Grid3x3,
  AlertCircle,
  Info,
} from 'lucide-react'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'
import { ProductFormData } from '../types/product.types'
import { ProductOptionsField } from './ProductOptionsField'
import { ProductVariantsField } from './ProductVariantsField'
import { ProductSpecsField } from './ProductSpecsField'
import { ProductBadgesField } from './ProductBadgesField'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductFormLinearProps {
  onCancel: () => void
  mode?: 'create' | 'edit'
}

export const ProductFormLinear: React.FC<ProductFormLinearProps> = ({
  onCancel,
  mode = 'create',
}) => {
  const { colors } = useTheme()
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext<ProductFormData>()

  const { data: categoriesData } = useGetCategoriesQuery({})
  const categoriesArray = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : categoriesData?.data?.items || []

  const categoryOptions = categoriesArray.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }))

  // Auto-generate slug from name
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === 'name' && value.name && mode === 'create') {
        const slug = value.name
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .replace(/[đĐ]/g, 'd')
          .replace(/[^a-z0-9\s-]/g, '')
          .replace(/\s+/g, '-')
          .replace(/-+/g, '-')
          .trim()
        setValue('slug', slug)
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, setValue, mode])

  // Debug logs
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('🚨 Form Errors:', errors)
    }
  }, [errors])

  const currencyOptions = [
    { value: 'VND', label: 'VND' },
    { value: 'USD', label: 'USD' },
  ]

  const thumbnail = watch('thumbnail')
  const images = watch('images') || []

  return (
    <div className="space-y-6">
      {/* Section 1: Basic Information */}
      <Card
        data-field="name"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <Package className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Thông tin cơ bản
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Thông tin chính về sản phẩm của bạn
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
        </CardContent>
      </Card>

      {/* Section 2: Pricing & Stock */}
      <Card
        data-field="price"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <DollarSign className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Giá & Tồn kho
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Thông tin về giá bán và số lượng tồn kho
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
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
        </CardContent>
      </Card>

      {/* Section 3: Images */}
      <Card
        data-field="thumbnail"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <ImageIcon className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Hình ảnh sản phẩm
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Ảnh đại diện và ảnh chi tiết sản phẩm
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* Section 4: Description */}
      <Card
        data-field="description"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <FileText className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Mô tả chi tiết
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Thông tin chi tiết về sản phẩm của bạn
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
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
        </CardContent>
      </Card>

      {/* Section 5: Specifications */}
      <Card
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <List className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Thông số kỹ thuật
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Các thông số kỹ thuật của sản phẩm
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ProductSpecsField name="specs" />
        </CardContent>
      </Card>

      {/* Section 6: Badges */}
      <Card
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <Package className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Nhãn sản phẩm
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Thêm các nhãn đặc biệt như &quot;Mới&quot;, &quot;Hot&quot;, &quot;Sale&quot;...
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <ProductBadgesField name="badges" />
        </CardContent>
      </Card>

      {/* Section 7: Options & Variants */}
      <Card
        data-field="options"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <CardHeader className="border-b" style={{ borderColor: colors.border }}>
          <div className="flex items-center gap-3">
            <div
              className="p-2.5 rounded-xl"
              style={{
                backgroundColor: colors.accent + '15',
                border: `1px solid ${colors.accent}30`,
              }}
            >
              <Grid3x3 className="h-5 w-5" style={{ color: colors.accent }} />
            </div>
            <div className="flex-1">
              <CardTitle className="text-lg font-semibold" style={{ color: colors.text }}>
                Tùy chọn & Biến thể
              </CardTitle>
              <p className="text-sm mt-1" style={{ color: colors.textSecondary }}>
                Quản lý các tùy chọn và biến thể sản phẩm
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
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
        </CardContent>
      </Card>

      {/* Form Actions - At bottom of form */}
      <div
        className="mt-8 p-4 border-t"
        style={{
          backgroundColor: colors.cardBackground,
          borderColor: colors.border,
        }}
      >
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
            className="min-w-[120px] font-medium"
            style={{
              borderColor: colors.border,
              color: colors.text,
              backgroundColor: colors.cardBackground,
            }}
          >
            Hủy
          </Button>
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
        </div>
      </div>
    </div>
  )
}
