'use client'

import React, { useEffect, useState } from 'react'
import { useFormContext, useFieldArray, useWatch } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Plus, X, Grid3x3, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useTheme } from '@/contexts/ThemeContext'

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
  const { colors } = useTheme()
  const { control, watch } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  })

  const options = useWatch({
    control,
    name: 'options',
  }) as ProductOption[] | undefined

  const basePrice = watch('price') || 0
  const [showAutoGenerate, setShowAutoGenerate] = useState(false)

  useEffect(() => {
    setShowAutoGenerate(
      Boolean(options && options.length > 0 && options.some((opt) => opt.values?.length > 0)),
    )
  }, [options])

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

    while (fields.length > 0) {
      remove(0)
    }

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
          <h3
            className="text-lg font-semibold flex items-center gap-2"
            style={{ color: colors.text }}
          >
            <Grid3x3 className="h-5 w-5" style={{ color: colors.accent }} />
            Biến thể sản phẩm
          </h3>
          <p className="text-sm" style={{ color: colors.textSecondary }}>
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
        <Card
          className="border-dashed"
          style={{
            backgroundColor: `${colors.warning}10`,
            borderColor: `${colors.warning}80`,
          }}
        >
          <CardContent className="flex items-start gap-3 py-4">
            <AlertCircle className="h-5 w-5 mt-0.5" style={{ color: colors.warning }} />
            <div>
              <p className="font-semibold" style={{ color: colors.text }}>
                Cần thêm tùy chọn trước
              </p>
              <p className="text-sm" style={{ color: colors.textSecondary }}>
                Vui lòng thêm các tùy chọn sản phẩm ở tab trước để tạo biến thể tự động
              </p>
            </div>
          </CardContent>
        </Card>
      ) : null}

      {fields.length === 0 ? (
        <Card
          className="border-dashed"
          style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
        >
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Grid3x3
              className="h-12 w-12 mb-3"
              style={{ color: colors.textSecondary, opacity: 0.5 }}
            />
            <p style={{ color: colors.textSecondary }}>Chưa có biến thể nào</p>
            <p className="text-sm mb-4" style={{ color: colors.textSecondary }}>
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
              <Card
                key={field.id}
                style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-2">
                      {variant.options &&
                        Object.entries(variant.options).map(([key, value]) => (
                          <Badge
                            key={key}
                            variant="secondary"
                            className="text-sm"
                            style={{
                              backgroundImage: 'none',
                              backgroundColor: colors.accent + '20',
                              color: colors.accent,
                              borderColor: 'transparent',
                            }}
                          >
                            {key}: {value}
                          </Badge>
                        ))}
                      {(!variant.options || Object.keys(variant.options).length === 0) && (
                        <span className="text-sm" style={{ color: colors.textSecondary }}>
                          Biến thể #{variantIndex + 1}
                        </span>
                      )}
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveVariant(variantIndex)}
                      style={{ color: colors.error }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
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
                                className="w-full mt-1 px-3 py-2 border rounded-md text-sm"
                                style={{
                                  backgroundColor: colors.cardBackground,
                                  borderColor: colors.border,
                                  color: colors.text,
                                }}
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

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor={`variant-sku-${variantIndex}`} style={{ color: colors.text }}>
                        SKU (tùy chọn)
                      </Label>
                      <Input
                        id={`variant-sku-${variantIndex}`}
                        type="text"
                        placeholder="VD: PRD-RED-M"
                        defaultValue={variant.sku || ''}
                        onBlur={(e) => handleVariantChange(variantIndex, 'sku', e.target.value)}
                        className="mt-1"
                        style={{
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`variant-price-${variantIndex}`}
                        style={{ color: colors.text }}
                      >
                        Giá <span style={{ color: colors.error }}>*</span>
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
                        style={{
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                    <div>
                      <Label
                        htmlFor={`variant-stock-${variantIndex}`}
                        style={{ color: colors.text }}
                      >
                        Tồn kho <span style={{ color: colors.error }}>*</span>
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
                        style={{
                          backgroundColor: colors.background,
                          borderColor: colors.border,
                          color: colors.text,
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`variant-image-${variantIndex}`} style={{ color: colors.text }}>
                      URL hình ảnh (tùy chọn)
                    </Label>
                    <Input
                      id={`variant-image-${variantIndex}`}
                      type="text"
                      placeholder="https://example.com/image.jpg"
                      defaultValue={variant.image || ''}
                      onBlur={(e) => handleVariantChange(variantIndex, 'image', e.target.value)}
                      className="mt-1"
                      style={{
                        backgroundColor: colors.background,
                        borderColor: colors.border,
                        color: colors.text,
                      }}
                    />
                    {variant.image && (
                      <div className="mt-2">
                        <img
                          src={variant.image}
                          alt="Variant preview"
                          className="w-20 h-20 object-cover rounded border"
                          style={{ borderColor: colors.border }}
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
