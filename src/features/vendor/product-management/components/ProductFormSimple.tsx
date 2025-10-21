'use client'

import React, { useState, useEffect } from 'react'
import { useFormContext, Controller } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { SelectField } from '@/components/common/SelectField'
import { ImageUpload, MultipleImageUpload } from '@/components/common'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Package, DollarSign, Image as ImageIcon, List, Settings } from 'lucide-react'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'
import { ProductFormData } from '../types/product.types'
import { ProductOptionsField } from './ProductOptionsField'
import { ProductVariantsField } from './ProductVariantsField'
import { ProductSpecsField } from './ProductSpecsField'
import { ProductBadgesField } from './ProductBadgesField'

interface ProductFormPropsNew {
  onCancel: () => void
  mode?: 'create' | 'edit' // Control which tabs to show
}

export const ProductForm: React.FC<ProductFormPropsNew> = ({ onCancel, mode = 'create' }) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    formState: { errors, isSubmitting },
  } = useFormContext<ProductFormData>()

  // Debug logs

  const { data: categoriesData } = useGetCategoriesQuery({})
  const categoriesArray = Array.isArray(categoriesData?.data)
    ? categoriesData.data
    : categoriesData?.data?.items || []

  const categoryOptions = categoriesArray.map((cat: any) => ({
    value: cat.id,
    label: cat.name,
  }))

  // Determine number of columns based on mode
  const tabCount = mode === 'edit' ? 4 : 6
  const gridCols = mode === 'edit' ? 'grid-cols-4' : 'grid-cols-6'

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className={`grid w-full ${gridCols}`}>
          <TabsTrigger value="basic" className="gap-2">
            <Package className="h-4 w-4" />
            Cơ bản
          </TabsTrigger>
          <TabsTrigger value="pricing" className="gap-2">
            <DollarSign className="h-4 w-4" />
            Giá & Kho
          </TabsTrigger>
          <TabsTrigger value="media" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Hình ảnh
          </TabsTrigger>
          {mode === 'create' && (
            <>
              <TabsTrigger value="specs" className="gap-2">
                <Settings className="h-4 w-4" />
                Thông số & Nhãn
              </TabsTrigger>
              <TabsTrigger value="options" className="gap-2">
                <Settings className="h-4 w-4" />
                Tùy chọn
              </TabsTrigger>
            </>
          )}
          <TabsTrigger value="description" className="gap-2">
            <List className="h-4 w-4" />
            Mô tả
          </TabsTrigger>
        </TabsList>

        {/* Basic Information Tab */}
        <TabsContent value="basic" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Thông tin cơ bản</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextField
                name="name"
                label="Tên sản phẩm"
                placeholder="Nhập tên sản phẩm"
                required
              />

              <TextField name="slug" label="Slug (URL)" placeholder="ten-san-pham" required />

              <SelectField name="categoryId" label="Danh mục" options={categoryOptions} required />

              <TextField name="brand" label="Thương hiệu" placeholder="Nhập thương hiệu" required />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Pricing & Stock Tab */}
        <TabsContent value="pricing" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Giá bán</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField name="price" label="Giá gốc" type="number" placeholder="0" required />

                <TextField
                  name="salePrice"
                  label="Giá khuyến mãi"
                  type="number"
                  placeholder="0 (tùy chọn)"
                />
              </div>

              <SelectField
                name="currency"
                label="Đơn vị tiền tệ"
                options={[
                  { value: 'VND', label: 'VND' },
                  { value: 'USD', label: 'USD' },
                ]}
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Kho hàng</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <TextField
                  name="stock.quantity"
                  label="Số lượng"
                  type="number"
                  placeholder="0"
                  required
                />

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
                  ]}
                  required
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Media Tab */}
        <TabsContent value="media" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Ảnh đại diện</CardTitle>
            </CardHeader>
            <CardContent>
              <Controller
                name="thumbnail"
                control={control}
                rules={{ required: 'Ảnh đại diện là bắt buộc' }}
                render={({ field, fieldState }) => (
                  <ImageUpload
                    value={field.value}
                    onChange={(file) => {
                      if (file) {
                        field.onChange(file)
                        // Force update to persist the value
                        setValue('thumbnail', file, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                    }}
                    onUrlChange={(url) => {
                      field.onChange(url)
                      setValue('thumbnail', url, {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }}
                    label="Ảnh đại diện sản phẩm"
                    error={fieldState.error?.message}
                    maxSize={5}
                  />
                )}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thư viện ảnh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Controller
                name="images"
                control={control}
                rules={
                  mode === 'edit'
                    ? {}
                    : {
                        required: 'Phải có ít nhất 1 ảnh sản phẩm',
                        validate: (value) => {
                          if (!value || value.length === 0) {
                            return 'Phải có ít nhất 1 ảnh sản phẩm'
                          }
                          return true
                        },
                      }
                }
                render={({ field, fieldState }) => (
                  <MultipleImageUpload
                    values={field.value || []}
                    onChange={(files) => {
                      if (files.length > 0) {
                        field.onChange(files)
                        // Force update to persist the values
                        setValue('images', files, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                    }}
                    onUrlsChange={(urls) => {
                      if (urls.length > 0) {
                        field.onChange(urls)
                        setValue('images', urls, {
                          shouldValidate: true,
                          shouldDirty: true,
                          shouldTouch: true,
                        })
                      }
                    }}
                    label="Ảnh sản phẩm (tối đa 10 ảnh)"
                    error={fieldState.error?.message}
                    maxSize={5}
                    maxFiles={10}
                  />
                )}
              />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Specs & Badges Tab - Only in create mode */}
        {mode === 'create' && (
          <TabsContent value="specs" className="space-y-6 mt-6">
            <ProductSpecsField name="specs" />
            <ProductBadgesField name="badges" />
          </TabsContent>
        )}

        {/* Options & Variants Tab - Only in create mode */}
        {mode === 'create' && (
          <TabsContent value="options" className="space-y-6 mt-6">
            <Card>
              <CardContent className="pt-6">
                <ProductOptionsField name="options" />
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <ProductVariantsField name="variants" />
              </CardContent>
            </Card>
          </TabsContent>
        )}

        {/* Description Tab */}
        <TabsContent value="description" className="space-y-4 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Mô tả sản phẩm</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <TextAreaField
                name="shortDescription"
                label="Mô tả ngắn"
                placeholder="Nhập mô tả ngắn gọn về sản phẩm"
                rows={3}
                required
              />

              <TextAreaField
                name="description"
                label="Mô tả chi tiết"
                placeholder="Nhập mô tả chi tiết về sản phẩm"
                rows={6}
                required
              />

              <TextField
                name="datasheetUrl"
                label="Link datasheet (tùy chọn)"
                placeholder="https://example.com/datasheet.pdf"
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
          Hủy
        </Button>
        <Button
          type="submit"
          disabled={isSubmitting}
          onClick={() => console.log('Submit button clicked!')}
        >
          {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
        </Button>
      </div>
    </div>
  )
}
