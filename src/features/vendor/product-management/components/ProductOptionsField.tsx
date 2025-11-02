'use client'

import React, { useState } from 'react'
import { useFormContext, useFieldArray } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, Layers } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface ProductOption {
  name: string
  values: string[]
}

interface ProductOptionsFieldProps {
  name?: string
}

export const ProductOptionsField: React.FC<ProductOptionsFieldProps> = ({ name = 'options' }) => {
  const { control, watch } = useFormContext()
  const { fields, append, remove, update } = useFieldArray({
    control,
    name,
  })

  const [newValueInputs, setNewValueInputs] = useState<{ [key: number]: string }>({})

  const handleAddOption = () => {
    append({ name: '', values: [] })
  }

  const handleRemoveOption = (index: number) => {
    remove(index)
    const newInputs = { ...newValueInputs }
    delete newInputs[index]
    setNewValueInputs(newInputs)
  }

  const handleOptionNameChange = (index: number, newName: string) => {
    const currentOption = fields[index] as unknown as ProductOption
    update(index, { ...currentOption, name: newName })
  }

  const handleOptionNameBlur = (index: number, newName: string) => {
    // Only update on blur to prevent losing focus
    const currentOption = fields[index] as unknown as ProductOption
    if (currentOption.name !== newName) {
      update(index, { ...currentOption, name: newName })
    }
  }

  const handleAddValue = (optionIndex: number) => {
    const newValue = newValueInputs[optionIndex]?.trim()
    if (!newValue) return

    const currentOption = fields[optionIndex] as unknown as ProductOption
    const updatedValues = [...(currentOption.values || []), newValue]
    update(optionIndex, { ...currentOption, values: updatedValues })

    // Clear input
    setNewValueInputs({ ...newValueInputs, [optionIndex]: '' })
  }

  const handleRemoveValue = (optionIndex: number, valueIndex: number) => {
    const currentOption = fields[optionIndex] as unknown as ProductOption
    const updatedValues = currentOption.values.filter((_, i) => i !== valueIndex)
    update(optionIndex, { ...currentOption, values: updatedValues })
  }

  const handleValueInputChange = (optionIndex: number, value: string) => {
    setNewValueInputs({ ...newValueInputs, [optionIndex]: value })
  }

  const handleValueInputKeyPress = (
    optionIndex: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddValue(optionIndex)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Layers className="h-5 w-5" />
            Tùy chọn sản phẩm
          </h3>
          <p className="text-sm text-muted-foreground">
            Thêm các tùy chọn như Màu sắc, Kích thước, v.v.
          </p>
        </div>
        <Button
          type="button"
          onClick={handleAddOption}
          variant="outline"
          size="sm"
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Thêm tùy chọn
        </Button>
      </div>

      {fields.length === 0 ? (
        <Card className="border-dashed">
          <CardContent className="flex flex-col items-center justify-center py-8 text-center">
            <Layers className="h-12 w-12 text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Chưa có tùy chọn nào</p>
            <p className="text-sm text-muted-foreground mb-4">
              Thêm tùy chọn để tạo các biến thể sản phẩm
            </p>
            <Button
              type="button"
              onClick={handleAddOption}
              variant="outline"
              size="sm"
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              Thêm tùy chọn đầu tiên
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {fields.map((field, optionIndex) => {
            const option = field as unknown as ProductOption
            return (
              <Card key={field.id}>
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1 mr-4">
                      <Label htmlFor={`option-name-${optionIndex}`}>Tên tùy chọn</Label>
                      <Input
                        id={`option-name-${optionIndex}`}
                        placeholder="VD: Màu sắc, Kích thước, Chất liệu..."
                        defaultValue={option.name}
                        onBlur={(e) => handleOptionNameChange(optionIndex, e.target.value)}
                        className="mt-2"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => handleRemoveOption(optionIndex)}
                      className="text-destructive hover:text-destructive"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <Label htmlFor={`option-value-${optionIndex}`}>Giá trị</Label>
                    <div className="flex gap-2 mt-2">
                      <Input
                        id={`option-value-${optionIndex}`}
                        placeholder="VD: Đỏ, Xanh, Vàng..."
                        value={newValueInputs[optionIndex] || ''}
                        onChange={(e) => handleValueInputChange(optionIndex, e.target.value)}
                        onKeyPress={(e) => handleValueInputKeyPress(optionIndex, e)}
                      />
                      <Button
                        type="button"
                        onClick={() => handleAddValue(optionIndex)}
                        size="sm"
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Thêm
                      </Button>
                    </div>
                  </div>

                  {option.values && option.values.length > 0 && (
                    <div>
                      <Label className="mb-2 block">Các giá trị đã thêm:</Label>
                      <div className="flex flex-wrap gap-2">
                        {option.values.map((value, valueIndex) => (
                          <Badge
                            key={valueIndex}
                            variant="secondary"
                            className="gap-2 pr-1 text-sm group"
                          >
                            {value}
                            <button
                              type="button"
                              onClick={() => handleRemoveValue(optionIndex, valueIndex)}
                              className="ml-1 hover:bg-destructive/20 rounded-full p-0.5 transition-colors"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {(!option.values || option.values.length === 0) && (
                    <p className="text-sm text-muted-foreground italic">
                      Nhấn Enter hoặc click "Thêm" để thêm giá trị
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
