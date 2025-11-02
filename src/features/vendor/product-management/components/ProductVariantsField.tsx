'use client'

import React, { useState, useEffect } from 'react'
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, Grid3x3, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProductVariant {
  options: { [key: string]: string }
  sku?: string
  price: number
  stock: number
  image?: string
}

interface ProductOption {
  name: string
  values: string[]
}

interface ProductVariantsFieldProps {
  name?: string
}

export const ProductVariantsField: React.FC<ProductVariantsFieldProps> = ({
  name = 'variants',
}) => {
  const { control, setValue, watch } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  })

  // Watch options to generate variants
  const options = useWatch({
    control,
    name: 'options',
  }) as ProductOption[] | undefined

  const basePrice = watch('price') || 0

  const [showAutoGenerate, setShowAutoGenerate] = useState(false)

  useEffect(() => {
    // Show auto-generate button if options exist
    setShowAutoGenerate(
      Boolean(options && options.length > 0 && options.some((opt) => opt.values?.length > 0)),
    )
  }, [options])

  // Generate all combinations of options
  const generateVariantCombinations = (): { [key: string]: string }[] => {
    if (!options || options.length === 0) return []

    const validOptions = options.filter((opt) => opt.name && opt.values && opt.values.length > 0)
    if (validOptions.length === 0) return []

    const combinations: { [key: string]: string }[] = []

    const generate = (index: number, current: { [key: string]: string }) => {
      if (index === validOptions.length) {
        combinations.push({ ...current })
        return
      }

      const option = validOptions[index]
      for (const value of option.values) {
        generate(index + 1, { ...current, [option.name]: value })
      }
    }

    generate(0, {})
    return combinations
  }

  const handleAutoGenerateVariants = () => {
    const combinations = generateVariantCombinations()

    if (combinations.length === 0) {
      alert('Vui lòng thêm tùy chọn trước khi tạo biến thể')
      return
    }

    // Clear existing variants
    while (fields.length > 0) {
      remove(0)
    }

    // Add new variants based on combinations
    combinations.forEach((combo) => {
      append({
        options: combo,
        sku: '',
        price: basePrice,
        stock: 0,
        image: '',
      })
    })
  }

  const handleAddVariant = () => {
    const defaultOptions: { [key: string]: string } = {}
    if (options && options.length > 0) {
      options.forEach((opt) => {
        if (opt.name && opt.values && opt.values.length > 0) {
          defaultOptions[opt.name] = opt.values[0]
        }
      })
    }

    append({
      options: defaultOptions,
      sku: '',
      price: basePrice,
      stock: 0,
      image: '',
    })
  }

  const handleRemoveVariant = (index: number) => {
    remove(index)
  }

  const handleVariantChange = (
    index: number,
    field: keyof ProductVariant,
    value: string | number | { [key: string]: string },
  ) => {
    const currentVariant = fields[index] as unknown as ProductVariant
    update(index, { ...currentVariant, [field]: value })
  }

  const handleOptionValueChange = (
    variantIndex: number,
    optionName: string,
    optionValue: string,
  ) => {
    const currentVariant = fields[variantIndex] as unknown as ProductVariant
    const updatedOptions = { ...currentVariant.options, [optionName]: optionValue }
    update(variantIndex, { ...currentVariant, options: updatedOptions })
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Grid3x3 className="h-5 w-5" />
            Biến thể sản phẩm
          </h3>
          <p className="text-sm text-muted-foreground">
            Quản lý các phiên bản khác nhau của sản phẩm
          </p>
        </div>
        <div className="flex gap-2">
          {showAutoGenerate && (
            <Button
              type="button"
              onClick={handleAutoGenerateVariants}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Grid3x3 className="h-4 w-4" />
              Tự động tạo
            </Button>
          )}
          <Button
            type="button"
            onClick={handleAddVariant}
            variant="outline"
            size="sm"
            className="gap-2"
          >
            <Plus className="h-4 w-4" />
            Thêm biến thể
          </Button>
        </div>
      </div>

      {!options || options.length === 0 || !options.some((opt) => opt.values?.length > 0) ? (
        <Card className="border-dashed border-orange-500/50 bg-orange-50/50">
          <CardContent className="flex items-start gap-3 py-4">
            <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
            <div>
              <p className="font-semibold text-orange-900">Cần thêm tùy chọn trước</p>
              <p className="text-sm text-orange-700">
                Vui lòng thêm các tùy chọn sản phẩm (Màu sắc, Kích thước...) ở tab trước để tạo biến
                thể tự động
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {fields.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Grid3x3 className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Chưa có biến thể nào</p>
            <p className="text-sm text-muted-foreground mb-4">
              Thêm biến thể thủ công hoặc tự động tạo từ tùy chọn
            </p>
            <div className="flex gap-2">
              {showAutoGenerate && (
                <Button
                  type="button"
                  onClick={handleAutoGenerateVariants}
                  variant="default"
                  size="sm"
                  className="gap-2"
                >
                  <Grid3x3 className="h-4 w-4" />
                  Tự động tạo biến thể
                </Button>
              )}
              <Button
                type="button"
                onClick={handleAddVariant}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Thêm thủ công
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, variantIndex) => {
            const variant = field as unknown as ProductVariant
            return (
              <Card key={field.id}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {variant.options &&
                        Object.entries(variant.options).map(([key, value]) => (
                          <Badge key={key} variant="secondary" className="text-sm">
                            {key}: {value}
                          </Badge>
                        ))}
                      {(!variant.options || Object.keys(variant.options).length === 0) && (
                        <span className="text-sm text-muted-foreground">
                          Biến thể #{variantIndex + 1}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveVariant(variantIndex)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Options Selectors */}
                  {options && options.length > 0 && (
                    <div className="grid grid-cols-2 gap-4">
                      {options.map(
                        (option) =>
                          option.name &&
                          option.values &&
                          option.values.length > 0 && (
                            <div key={option.name}>
                              <Label>{option.name}</Label>
                              <select
                                className="w-full mt-1 px-3 py-2 border border-input bg-background rounded-md text-sm"
                                value={variant.options?.[option.name] || ''}
                                onChange={(e) =>
                                  handleOptionValueChange(variantIndex, option.name, e.target.value)
                                }
                              >
                                {option.values.map((value) => (
                                  <option key={value} value={value}>
                                    {value}
                                  </option>
                                ))}
                              </select>
                            </div>
                          ),
                      )}
                    </div>
                  )}

                  {/* SKU, Price, Stock */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`variant-sku-${variantIndex}`}>SKU (tùy chọn)</Label>
                      <Input
                        id={`variant-sku-${variantIndex}`}
                        type="text"
                        placeholder="VD: PRD-RED-M"
                        defaultValue={variant.sku || ''}
                        onBlur={(e) => handleVariantChange(variantIndex, 'sku', e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`variant-price-${variantIndex}`}>
                        Giá <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`variant-price-${variantIndex}`}
                        type="number"
                        placeholder="0"
                        defaultValue={variant.price || ''}
                        onBlur={(e) =>
                          handleVariantChange(
                            variantIndex,
                            'price',
                            parseFloat(e.target.value) || 0,
                          )
                        }
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor={`variant-stock-${variantIndex}`}>
                        Tồn kho <span className="text-destructive">*</span>
                      </Label>
                      <Input
                        id={`variant-stock-${variantIndex}`}
                        type="number"
                        placeholder="0"
                        defaultValue={variant.stock || ''}
                        onBlur={(e) =>
                          handleVariantChange(variantIndex, 'stock', parseInt(e.target.value) || 0)
                        }
                        className="mt-1"
                      />
                    </div>
                  </div>

                  {/* Image URL */}
                  <div>
                    <Label htmlFor={`variant-image-${variantIndex}`}>URL hình ảnh (tùy chọn)</Label>
                    <Input
                      id={`variant-image-${variantIndex}`}
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      defaultValue={variant.image || ''}
                      onBlur={(e) => handleVariantChange(variantIndex, 'image', e.target.value)}
                      className="mt-1"
                    />
                    {variant.image && (
                      <div className="mt-2">
                        <img
                          src={variant.image}
                          alt="Variant preview"
                          className="w-20 h-20 object-cover rounded border"
                        />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
