'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Plus, Trash2, X } from 'lucide-react'
import { ProductFormData } from '../types/product.types'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'
import { ImageUpload, MultipleImageUpload } from '@/components/common'
import { useTheme } from '@/contexts/ThemeContext'

const CURRENCY_OPTIONS = ['VND', 'USD']
const UNIT_OPTIONS = ['cái', 'bộ', 'hộp', 'kg', 'mét', 'thùng']
const BADGE_OPTIONS = ['bestseller', 'sale', 'new', 'hot', 'featured']

interface ProductFormProps {
  mode: 'create' | 'edit' | 'view'
  initialData?: Partial<ProductFormData>
  onSubmit: (data: ProductFormData) => Promise<void>
  onCancel: () => void
  isLoading?: boolean
}

export function ProductForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ProductFormProps) {
  const { data: categoriesData } = useGetCategoriesQuery({})
  const categories = categoriesData?.data?.items || []
  const { colors } = useTheme()

  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    defaultValues: initialData || {
      name: '',
      slug: '',
      categoryId: '',
      brand: '',
      thumbnail: '',
      images: [],
      price: 0,
      salePrice: 0,
      currency: 'VND',
      stock: { quantity: 0, unit: 'cái' },
      badges: [],
      specs: {},
      options: [],
      variants: [],
      shortDescription: '',
      description: '',
      datasheetUrl: '',
    },
  })

  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: 'options',
  })

  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: 'variants',
  })

  const [selectedBadges, setSelectedBadges] = useState<string[]>(initialData?.badges || [])
  const [customSpecs, setCustomSpecs] = useState<Record<string, any>>(initialData?.specs || {})
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

  // State for file uploads
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null)
  const [imageFiles, setImageFiles] = useState<File[]>([])

  // Auto-generate slug from name
  const productName = watch('name')
  useEffect(() => {
    if (mode === 'create' && productName) {
      const slug = productName
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
  }, [productName, mode, setValue])

  const handleFormSubmit = async (data: ProductFormData) => {
    const formData: ProductFormData = {
      ...data,
      badges: selectedBadges,
      specs: customSpecs,
      // Add file uploads
      thumbnail: thumbnailFile || data.thumbnail,
      images: imageFiles.length > 0 ? imageFiles : data.images,
    }
    await onSubmit(formData)
  }

  const toggleBadge = (badge: string) => {
    setSelectedBadges((prev) =>
      prev.includes(badge) ? prev.filter((b) => b !== badge) : [...prev, badge],
    )
  }

  const addSpec = () => {
    if (newSpecKey && newSpecValue) {
      setCustomSpecs((prev) => ({ ...prev, [newSpecKey]: newSpecValue }))
      setNewSpecKey('')
      setNewSpecValue('')
    }
  }

  const removeSpec = (key: string) => {
    setCustomSpecs((prev) => {
      const { [key]: _, ...rest } = prev
      return rest
    })
  }

  const isReadOnly = mode === 'view'

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Thông tin cơ bản</TabsTrigger>
          <TabsTrigger value="pricing">Giá & Kho</TabsTrigger>
          <TabsTrigger value="options">Options & Variants</TabsTrigger>
          <TabsTrigger value="media">Media & Docs</TabsTrigger>
        </TabsList>

        {/* Tab 1: Basic Information */}
        <TabsContent value="basic" className="space-y-4">
          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name" style={{ color: colors.text }}>
                  Tên sản phẩm <span style={{ color: colors.error }}>*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Tên sản phẩm là bắt buộc' })}
                  placeholder="Bu lông inox M8"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.name && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug" style={{ color: colors.text }}>
                  Slug <span style={{ color: colors.error }}>*</span>
                </Label>
                <Input
                  id="slug"
                  {...register('slug', { required: 'Slug là bắt buộc' })}
                  placeholder="bu-long-inox-m8"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.slug && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.slug.message}
                  </p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="categoryId" style={{ color: colors.accent }}>
                  Danh mục <span style={{ color: colors.error }}>*</span>
                </Label>
                <Controller
                  name="categoryId"
                  control={control}
                  rules={{ required: 'Danh mục là bắt buộc' }}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        <SelectValue placeholder="Chọn danh mục" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat: any) => (
                          <SelectItem key={cat.id} value={cat.id}>
                            {cat.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.categoryId && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.categoryId.message}
                  </p>
                )}
              </div>

              {/* Brand */}
              <div>
                <Label htmlFor="brand" style={{ color: colors.text }}>
                  Thương hiệu
                </Label>
                <Input
                  id="brand"
                  {...register('brand')}
                  placeholder="Inox Việt"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Short Description */}
              <div>
                <Label htmlFor="shortDescription" style={{ color: colors.text }}>
                  Mô tả ngắn
                </Label>
                <Textarea
                  id="shortDescription"
                  {...register('shortDescription')}
                  placeholder="Mô tả ngắn gọn về sản phẩm"
                  rows={3}
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description" style={{ color: colors.text }}>
                  Mô tả chi tiết
                </Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Mô tả chi tiết về sản phẩm (hỗ trợ HTML)"
                  rows={6}
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Badges */}
              <div>
                <Label style={{ color: colors.text }}>Badges</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {BADGE_OPTIONS.map((badge) => (
                    <Badge
                      key={badge}
                      variant={selectedBadges.includes(badge) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      style={{
                        backgroundImage: 'none',
                        backgroundColor: selectedBadges.includes(badge)
                          ? colors.accent
                          : colors.cardBackgroundSecondary,
                        color: selectedBadges.includes(badge) ? colors.background : colors.text,
                        borderColor: selectedBadges.includes(badge) ? 'transparent' : colors.border,
                      }}
                      onClick={() => !isReadOnly && toggleBadge(badge)}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Custom Specs */}
              <div>
                <Label style={{ color: colors.text }}>Thông số kỹ thuật</Label>
                <div className="space-y-2 mt-2">
                  {Object.entries(customSpecs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Input
                        value={key}
                        disabled
                        className="flex-1"
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                      <Input
                        value={value}
                        disabled
                        className="flex-1"
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                      {!isReadOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeSpec(key)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {!isReadOnly && (
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Tên thông số"
                        value={newSpecKey}
                        onChange={(e) => setNewSpecKey(e.target.value)}
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                      <Input
                        placeholder="Giá trị"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                      <Button
                        type="button"
                        onClick={addSpec}
                        size="icon"
                        style={{
                          backgroundColor: colors.accent,
                          color: colors.background,
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 2: Pricing & Stock */}
        <TabsContent value="pricing" className="space-y-4">
          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Giá & Kho hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Currency */}
              <div>
                <Label htmlFor="currency" style={{ color: colors.text }}>
                  Đơn vị tiền tệ
                </Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {CURRENCY_OPTIONS.map((curr) => (
                          <SelectItem key={curr} value={curr}>
                            {curr}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" style={{ color: colors.text }}>
                  Giá gốc <span style={{ color: colors.error }}>*</span>
                </Label>
                <Input
                  id="price"
                  type="number"
                  {...register('price', {
                    required: 'Giá là bắt buộc',
                    valueAsNumber: true,
                    min: 0,
                  })}
                  placeholder="0"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Sale Price */}
              <div>
                <Label htmlFor="salePrice" style={{ color: colors.text }}>
                  Giá khuyến mãi
                </Label>
                <Input
                  id="salePrice"
                  type="number"
                  {...register('salePrice', { valueAsNumber: true, min: 0 })}
                  placeholder="0"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <Label htmlFor="stock.quantity" style={{ color: colors.text }}>
                  Số lượng tồn kho <span style={{ color: colors.error }}>*</span>
                </Label>
                <Input
                  id="stock.quantity"
                  type="number"
                  {...register('stock.quantity', {
                    required: 'Số lượng là bắt buộc',
                    valueAsNumber: true,
                    min: 0,
                  })}
                  placeholder="0"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>

              {/* Stock Unit */}
              <div>
                <Label htmlFor="stock.unit" style={{ color: colors.text }}>
                  Đơn vị tính
                </Label>
                <Controller
                  name="stock.unit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger
                        style={{
                          backgroundColor: colors.cardBackgroundSecondary,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {UNIT_OPTIONS.map((unit) => (
                          <SelectItem key={unit} value={unit}>
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 3: Options & Variants */}
        <TabsContent value="options" className="space-y-4">
          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>
                Options (Kích thước, Màu sắc, ...)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {optionFields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg p-4 space-y-3"
                  style={{
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.cardBackgroundSecondary,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium" style={{ color: colors.text }}>
                      Option {index + 1}
                    </h4>
                    {!isReadOnly && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label style={{ color: colors.text }}>Tên (key)</Label>
                      <Input
                        {...register(`options.${index}.name` as const)}
                        placeholder="size"
                        disabled={isReadOnly}
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                    <div>
                      <Label style={{ color: colors.text }}>Tên hiển thị</Label>
                      <Input
                        {...register(`options.${index}.displayName` as const)}
                        placeholder="Kích thước"
                        disabled={isReadOnly}
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label style={{ color: colors.text }}>Giá trị (cách nhau bởi dấu phẩy)</Label>
                    <Input
                      placeholder="M8, M10, M12"
                      onChange={(e) => {
                        const values = e.target.value.split(',').map((v) => ({ value: v.trim() }))
                        setValue(`options.${index}.values`, values)
                      }}
                      disabled={isReadOnly}
                      style={{
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                </div>
              ))}
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => appendOption({ name: '', displayName: '', values: [] })}
                  className="w-full"
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Option
                </Button>
              )}
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Variants (Biến thể)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {variantFields.map((field, index) => (
                <div
                  key={field.id}
                  className="rounded-lg p-4 space-y-3"
                  style={{
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.cardBackgroundSecondary,
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium" style={{ color: colors.text }}>
                      Variant {index + 1}
                    </h4>
                    {!isReadOnly && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeVariant(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label style={{ color: colors.text }}>SKU</Label>
                      <Input
                        {...register(`variants.${index}.sku` as const)}
                        placeholder="BOLT-M8-50"
                        disabled={isReadOnly}
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                    <div>
                      <Label style={{ color: colors.text }}>Giá</Label>
                      <Input
                        type="number"
                        {...register(`variants.${index}.price` as const, { valueAsNumber: true })}
                        placeholder="0"
                        disabled={isReadOnly}
                        style={{
                          backgroundColor: colors.cardBackground,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <Label style={{ color: colors.text }}>Số lượng</Label>
                    <Input
                      type="number"
                      {...register(`variants.${index}.stockQty` as const, { valueAsNumber: true })}
                      placeholder="0"
                      disabled={isReadOnly}
                      style={{
                        backgroundColor: colors.cardBackground,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                  </div>
                </div>
              ))}
              {!isReadOnly && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    appendVariant({ sku: '', options: {}, price: 0, stockQty: 0, specs: {} })
                  }
                  className="w-full"
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Variant
                </Button>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Tab 4: Media & Documents */}
        <TabsContent value="media" className="space-y-4">
          <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
            <CardHeader>
              <CardTitle style={{ color: colors.text }}>Hình ảnh & Tài liệu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thumbnail */}
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: 'Ảnh đại diện là bắt buộc' }}
                render={({ field, fieldState }) => (
                  <ImageUpload
                    value={thumbnailFile || field.value}
                    onChange={(file) => {
                      setThumbnailFile(file)
                      if (file) {
                        field.onChange(file)
                      }
                    }}
                    onUrlChange={(url) => {
                      if (!thumbnailFile) {
                        field.onChange(url)
                      }
                    }}
                    label="Ảnh đại diện"
                    error={fieldState.error?.message}
                    disabled={isReadOnly}
                    maxSize={5}
                  />
                )}
              />

              {/* Images */}
              <Controller
                name="images"
                control={control}
                rules={{
                  required: 'Phải có ít nhất 1 ảnh sản phẩm',
                  validate: (value) => {
                    if (imageFiles.length === 0 && (!value || value.length === 0)) {
                      return 'Phải có ít nhất 1 ảnh sản phẩm'
                    }
                    return true
                  },
                }}
                render={({ field, fieldState }) => (
                  <MultipleImageUpload
                    values={imageFiles.length > 0 ? imageFiles : field.value}
                    onChange={(files) => {
                      setImageFiles(files)
                      if (files.length > 0) {
                        field.onChange(files)
                      }
                    }}
                    onUrlsChange={(urls) => {
                      if (imageFiles.length === 0) {
                        field.onChange(urls)
                      }
                    }}
                    label="Ảnh sản phẩm"
                    error={fieldState.error?.message}
                    disabled={isReadOnly}
                    maxSize={5}
                    maxFiles={10}
                  />
                )}
              />

              {/* Datasheet */}
              <div>
                <Label htmlFor="datasheetUrl" style={{ color: colors.text }}>
                  URL Datasheet
                </Label>
                <Input
                  id="datasheetUrl"
                  {...register('datasheetUrl')}
                  placeholder="https://cdn.example.com/datasheet.pdf"
                  disabled={isReadOnly}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      {!isReadOnly && (
        <div className="flex justify-end gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isLoading}
            style={{
              backgroundColor: colors.cardBackground,
              borderColor: colors.border,
              color: colors.text,
            }}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            style={{
              backgroundColor: colors.accent,
              color: colors.background,
            }}
          >
            {isLoading ? 'Đang xử lý...' : mode === 'create' ? 'Tạo sản phẩm' : 'Cập nhật'}
          </Button>
        </div>
      )}
    </form>
  )
}
