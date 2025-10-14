'use client'

import React, { useState, useEffect } from 'react'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/common/TextAreaField'
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
import { ProductFormProps, ProductFormData } from '../types'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'

const CURRENCY_OPTIONS = ['VND', 'USD']
const UNIT_OPTIONS = ['cái', 'bộ', 'hộp', 'kg', 'mét', 'thùng']
const BADGE_OPTIONS = ['bestseller', 'sale', 'new', 'hot', 'featured']

export function ProductForm({
  mode,
  initialData,
  onSubmit,
  onCancel,
  isLoading,
}: ProductFormProps) {
  const { data: categoriesData } = useGetCategoriesQuery({})
  const categories = categoriesData?.data?.items || []

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

  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || [])

  const [selectedBadges, setSelectedBadges] = useState<string[]>(initialData?.badges || [])
  const [customSpecs, setCustomSpecs] = useState<Record<string, any>>(initialData?.specs || {})
  const [newSpecKey, setNewSpecKey] = useState('')
  const [newSpecValue, setNewSpecValue] = useState('')

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
    const formData = {
      ...data,
      badges: selectedBadges,
      specs: customSpecs,
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
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Name */}
              <div>
                <Label htmlFor="name">
                  Tên sản phẩm <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  {...register('name', { required: 'Tên sản phẩm là bắt buộc' })}
                  placeholder="Bu lông inox M8"
                  disabled={isReadOnly}
                />
                {errors.name && (
                  <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Slug */}
              <div>
                <Label htmlFor="slug">
                  Slug <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="slug"
                  {...register('slug', { required: 'Slug là bắt buộc' })}
                  placeholder="bu-long-inox-m8"
                  disabled={isReadOnly}
                />
                {errors.slug && (
                  <p className="text-sm text-destructive mt-1">{errors.slug.message}</p>
                )}
              </div>

              {/* Category */}
              <div>
                <Label htmlFor="categoryId">
                  Danh mục <span className="text-destructive">*</span>
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
                      <SelectTrigger>
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
                  <p className="text-sm text-destructive mt-1">{errors.categoryId.message}</p>
                )}
              </div>

              {/* Brand */}
              <div>
                <Label htmlFor="brand">Thương hiệu</Label>
                <Input
                  id="brand"
                  {...register('brand')}
                  placeholder="Inox Việt"
                  disabled={isReadOnly}
                />
              </div>

              {/* Short Description */}
              <div>
                <Label htmlFor="shortDescription">Mô tả ngắn</Label>
                <Textarea
                  id="shortDescription"
                  {...register('shortDescription')}
                  placeholder="Mô tả ngắn gọn về sản phẩm"
                  rows={3}
                  disabled={isReadOnly}
                />
              </div>

              {/* Description */}
              <div>
                <Label htmlFor="description">Mô tả chi tiết</Label>
                <Textarea
                  id="description"
                  {...register('description')}
                  placeholder="Mô tả chi tiết về sản phẩm (hỗ trợ HTML)"
                  rows={6}
                  disabled={isReadOnly}
                />
              </div>

              {/* Badges */}
              <div>
                <Label>Badges</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {BADGE_OPTIONS.map((badge) => (
                    <Badge
                      key={badge}
                      variant={selectedBadges.includes(badge) ? 'default' : 'outline'}
                      className="cursor-pointer"
                      onClick={() => !isReadOnly && toggleBadge(badge)}
                    >
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Custom Specs */}
              <div>
                <Label>Thông số kỹ thuật</Label>
                <div className="space-y-2 mt-2">
                  {Object.entries(customSpecs).map(([key, value]) => (
                    <div key={key} className="flex items-center gap-2">
                      <Input value={key} disabled className="flex-1" />
                      <Input value={value} disabled className="flex-1" />
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
                      />
                      <Input
                        placeholder="Giá trị"
                        value={newSpecValue}
                        onChange={(e) => setNewSpecValue(e.target.value)}
                      />
                      <Button type="button" onClick={addSpec} size="icon">
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
          <Card>
            <CardHeader>
              <CardTitle>Giá & Kho hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Currency */}
              <div>
                <Label htmlFor="currency">Đơn vị tiền tệ</Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger>
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
                <Label htmlFor="price">
                  Giá gốc <span className="text-destructive">*</span>
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
                />
              </div>

              {/* Sale Price */}
              <div>
                <Label htmlFor="salePrice">Giá khuyến mãi</Label>
                <Input
                  id="salePrice"
                  type="number"
                  {...register('salePrice', { valueAsNumber: true, min: 0 })}
                  placeholder="0"
                  disabled={isReadOnly}
                />
              </div>

              {/* Stock Quantity */}
              <div>
                <Label htmlFor="stock.quantity">
                  Số lượng tồn kho <span className="text-destructive">*</span>
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
                />
              </div>

              {/* Stock Unit */}
              <div>
                <Label htmlFor="stock.unit">Đơn vị tính</Label>
                <Controller
                  name="stock.unit"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      disabled={isReadOnly}
                    >
                      <SelectTrigger>
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
          <Card>
            <CardHeader>
              <CardTitle>Options (Kích thước, Màu sắc, ...)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {optionFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Option {index + 1}</h4>
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
                      <Label>Tên (key)</Label>
                      <Input
                        {...register(`options.${index}.name` as const)}
                        placeholder="size"
                        disabled={isReadOnly}
                      />
                    </div>
                    <div>
                      <Label>Tên hiển thị</Label>
                      <Input
                        {...register(`options.${index}.displayName` as const)}
                        placeholder="Kích thước"
                        disabled={isReadOnly}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Giá trị (cách nhau bởi dấu phẩy)</Label>
                    <Input
                      placeholder="M8, M10, M12"
                      onChange={(e) => {
                        const values = e.target.value.split(',').map((v) => ({ value: v.trim() }))
                        setValue(`options.${index}.values`, values)
                      }}
                      disabled={isReadOnly}
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
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Thêm Option
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Variants (Biến thể)</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {variantFields.map((field, index) => (
                <div key={field.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">Variant {index + 1}</h4>
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
                      <Label>SKU</Label>
                      <Input
                        {...register(`variants.${index}.sku` as const)}
                        placeholder="BOLT-M8-50"
                        disabled={isReadOnly}
                      />
                    </div>
                    <div>
                      <Label>Giá</Label>
                      <Input
                        type="number"
                        {...register(`variants.${index}.price` as const, { valueAsNumber: true })}
                        placeholder="0"
                        disabled={isReadOnly}
                      />
                    </div>
                  </div>
                  <div>
                    <Label>Số lượng</Label>
                    <Input
                      type="number"
                      {...register(`variants.${index}.stockQty` as const, { valueAsNumber: true })}
                      placeholder="0"
                      disabled={isReadOnly}
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
          <Card>
            <CardHeader>
              <CardTitle>Hình ảnh & Tài liệu</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Thumbnail */}
              <div>
                <Label htmlFor="thumbnail">
                  Ảnh đại diện <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="thumbnail"
                  {...register('thumbnail', { required: 'Ảnh đại diện là bắt buộc' })}
                  placeholder="https://cdn.example.com/thumb.jpg"
                  disabled={isReadOnly}
                />
              </div>

              {/* Images */}
              <div>
                <Label>Ảnh sản phẩm</Label>
                <div className="space-y-2 mt-2">
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input
                        value={url}
                        onChange={(e) => {
                          const newUrls = [...imageUrls]
                          newUrls[index] = e.target.value
                          setImageUrls(newUrls)
                          setValue('images', newUrls)
                        }}
                        placeholder={`https://cdn.example.com/${index + 1}.jpg`}
                        disabled={isReadOnly}
                      />
                      {!isReadOnly && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            const newUrls = imageUrls.filter((_, i) => i !== index)
                            setImageUrls(newUrls)
                            setValue('images', newUrls)
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                  {!isReadOnly && (
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        const newUrls = [...imageUrls, '']
                        setImageUrls(newUrls)
                        setValue('images', newUrls)
                      }}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Thêm ảnh
                    </Button>
                  )}
                </div>
              </div>

              {/* Datasheet */}
              <div>
                <Label htmlFor="datasheetUrl">URL Datasheet</Label>
                <Input
                  id="datasheetUrl"
                  {...register('datasheetUrl')}
                  placeholder="https://cdn.example.com/datasheet.pdf"
                  disabled={isReadOnly}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      {!isReadOnly && (
        <div className="flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
            Hủy
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Đang xử lý...' : mode === 'create' ? 'Tạo sản phẩm' : 'Cập nhật'}
          </Button>
        </div>
      )}
    </form>
  )
}
