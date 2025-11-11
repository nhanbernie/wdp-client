'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, FileText } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductSpecsFieldProps {
  name?: string
}

export const ProductSpecsField: React.FC<ProductSpecsFieldProps> = ({ name = 'specs' }) => {
  const { colors } = useTheme()
  const { watch, setValue } = useFormContext()
  const specs = watch(name) || {}

  const [newKey, setNewKey] = useState('')
  const [newValue, setNewValue] = useState('')

  const handleAddSpec = () => {
    if (!newKey.trim() || !newValue.trim()) return

    const updatedSpecs = {
      ...specs,
      [newKey.trim()]: newValue.trim(),
    }

    setValue(name, updatedSpecs, { shouldValidate: true, shouldDirty: true })
    setNewKey('')
    setNewValue('')
  }

  const handleRemoveSpec = (key: string) => {
    const updatedSpecs = { ...specs }
    delete updatedSpecs[key]
    setValue(name, updatedSpecs, { shouldValidate: true, shouldDirty: true })
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddSpec()
    }
  }

  const specEntries = Object.entries(specs)

  return (
    <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
          <FileText className="h-5 w-5" style={{ color: colors.accent }} />
          Thông số kỹ thuật
        </CardTitle>
        <CardDescription style={{ color: colors.textSecondary }}>
          Thêm các thông số kỹ thuật của sản phẩm (VD: Chất liệu, Trọng lượng, Xuất xứ, Tiêu
          chuẩn...)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Existing specs */}
        {specEntries.length > 0 && (
          <div className="space-y-2">
            {specEntries.map(([key, value]) => (
              <div
                key={key}
                className="flex items-center gap-2 p-3 rounded-lg"
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  border: `1px solid ${colors.border}`,
                }}
              >
                <div className="flex-1">
                  <div className="font-medium text-sm" style={{ color: colors.text }}>
                    {key}
                  </div>
                  <div className="text-sm" style={{ color: colors.textSecondary }}>
                    {value as string}
                  </div>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleRemoveSpec(key)}
                  className="h-8 w-8"
                  style={{ color: colors.error }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add new spec */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <Label htmlFor="spec-key" style={{ color: colors.text }}>
                Tên thông số
              </Label>
              <Input
                id="spec-key"
                placeholder="VD: material, weight, origin..."
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </div>
            <div>
              <Label htmlFor="spec-value" style={{ color: colors.text }}>
                Giá trị
              </Label>
              <Input
                id="spec-value"
                placeholder="VD: Xi măng Portland, 50kg..."
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
                onKeyDown={handleKeyDown}
                style={{
                  backgroundColor: colors.background,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
            </div>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleAddSpec}
            disabled={!newKey.trim() || !newValue.trim()}
            className="w-full"
            style={{ borderColor: colors.border, color: colors.text }}
          >
            <Plus className="h-4 w-4 mr-2" />
            Thêm thông số
          </Button>
        </div>

        {specEntries.length === 0 && (
          <div className="text-center py-8" style={{ color: colors.textSecondary }}>
            <FileText className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Chưa có thông số kỹ thuật nào</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
