'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { SelectField } from '@/components/common/SelectField'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Plus, Trash2, Package, DollarSign, Image as ImageIcon, List } from 'lucide-react'
import { useGetCategoriesQuery } from '@/services/categories/categories.service'
import { ProductFormData } from '../types/product.types'

interface ProductFormPropsNew {
  onCancel: () => void
}

export const ProductForm: React.FC<ProductFormPropsNew> = ({ onCancel }) => {
  const {
    watch,
    setValue,
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

  const [newImage, setNewImage] = useState('')
  const images = watch('images') || []

  const handleAddImage = () => {
    if (newImage.trim()) {
      setValue('images', [...images, newImage.trim()])
      setNewImage('')
    }
  }

  const handleRemoveImage = (index: number) => {
    setValue(
      'images',
      images.filter((_, i) => i !== index),
    )
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="basic" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
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
              <TextField
                name="thumbnail"
                label="URL ảnh đại diện"
                placeholder="https://example.com/image.jpg"
                required
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thư viện ảnh</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="Nhập URL ảnh"
                  className="flex-1 px-3 py-2 border rounded-md"
                />
                <Button type="button" onClick={handleAddImage} className="gap-2">
                  <Plus className="h-4 w-4" />
                  Thêm
                </Button>
              </div>

              {errors.images && (
                <p className="text-sm text-red-500">{errors.images.message as string}</p>
              )}

              {images.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {images.map((url, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                        <img
                          src={url}
                          alt={`Product ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

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
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Đang lưu...' : 'Lưu sản phẩm'}
        </Button>
      </div>
    </div>
  )
}
