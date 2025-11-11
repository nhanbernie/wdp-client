'use client'

import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Plus, X, Tag } from 'lucide-react'
import { Badge as BadgeUI } from '@/components/ui/badge'
import { useTheme } from '@/contexts/ThemeContext'

interface ProductBadgesFieldProps {
  name?: string
}

const PRESET_BADGES = [
  { value: 'new', label: 'Mới', color: 'bg-blue-100 text-blue-800' },
  { value: 'bestseller', label: 'Bán chạy', color: 'bg-green-100 text-green-800' },
  { value: 'sale', label: 'Giảm giá', color: 'bg-red-100 text-red-800' },
  { value: 'featured', label: 'Nổi bật', color: 'bg-purple-100 text-purple-800' },
  { value: 'hot', label: 'Hot', color: 'bg-orange-100 text-orange-800' },
]

export const ProductBadgesField: React.FC<ProductBadgesFieldProps> = ({ name = 'badges' }) => {
  const { colors } = useTheme()
  const { watch, setValue } = useFormContext()
  const badges: string[] = watch(name) || []

  const [customBadge, setCustomBadge] = useState('')

  const handleToggleBadge = (badge: string) => {
    const updatedBadges = badges.includes(badge)
      ? badges.filter((b) => b !== badge)
      : [...badges, badge]

    setValue(name, updatedBadges, { shouldValidate: true, shouldDirty: true })
  }

  const handleAddCustomBadge = () => {
    if (!customBadge.trim()) return

    const badge = customBadge.trim().toLowerCase()
    if (badges.includes(badge)) {
      setCustomBadge('')
      return
    }

    setValue(name, [...badges, badge], { shouldValidate: true, shouldDirty: true })
    setCustomBadge('')
  }

  const handleRemoveBadge = (badge: string) => {
    setValue(
      name,
      badges.filter((b) => b !== badge),
      { shouldValidate: true, shouldDirty: true },
    )
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleAddCustomBadge()
    }
  }
  return (
    <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
          <Tag className="h-5 w-5" style={{ color: colors.accent }} />
          Nhãn sản phẩm (Badges)
        </CardTitle>
        <CardDescription style={{ color: colors.textSecondary }}>
          Thêm các nhãn để làm nổi bật sản phẩm (VD: Mới, Bán chạy, Giảm giá...)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Preset badges */}
        <div>
          <Label className="mb-2 block" style={{ color: colors.text }}>
            Nhãn có sẵn
          </Label>
          <div className="flex flex-wrap gap-2">
            {PRESET_BADGES.map((preset) => (
              <Button
                key={preset.value}
                type="button"
                variant={badges.includes(preset.value) ? 'default' : 'outline'}
                size="sm"
                onClick={() => handleToggleBadge(preset.value)}
                className="gap-2"
                style={
                  badges.includes(preset.value)
                    ? { backgroundColor: colors.accent, color: colors.background }
                    : { borderColor: colors.border, color: colors.text }
                }
              >
                {badges.includes(preset.value) && <X className="h-3 w-3" />}
                {preset.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Custom badge */}
        <div className="space-y-2">
          <Label htmlFor="custom-badge" style={{ color: colors.text }}>
            Nhãn tùy chỉnh
          </Label>
          <div className="flex gap-2">
            <Input
              id="custom-badge"
              placeholder="VD: premium, eco-friendly..."
              value={customBadge}
              onChange={(e) => setCustomBadge(e.target.value)}
              onKeyDown={handleKeyDown}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            />
            <Button
              type="button"
              variant="outline"
              onClick={handleAddCustomBadge}
              disabled={!customBadge.trim()}
              style={{
                backgroundColor: colors.background,
                borderColor: colors.border,
                color: colors.text,
              }}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Selected badges */}
        {badges.length > 0 && (
          <div>
            <Label className="mb-2 block" style={{ color: colors.text }}>
              Nhãn đã chọn ({badges.length})
            </Label>
            <div className="flex flex-wrap gap-2">
              {badges.map((badge) => {
                const preset = PRESET_BADGES.find((p) => p.value === badge)
                return (
                  <BadgeUI
                    key={badge}
                    variant="secondary"
                    className="gap-2 cursor-pointer"
                    onClick={() => handleRemoveBadge(badge)}
                    style={{
                      backgroundImage: 'none',
                      backgroundColor: colors.accent + '20',
                      color: colors.accent,
                      borderColor: 'transparent',
                    }}
                  >
                    {preset?.label || badge}
                    <X className="h-3 w-3" />
                  </BadgeUI>
                )
              })}
            </div>
          </div>
        )}
        {badges.length === 0 && (
          <div className="text-center py-8" style={{ color: colors.textSecondary }}>
            <Tag className="h-12 w-12 mx-auto mb-2 opacity-20" />
            <p className="text-sm">Chưa có nhãn nào được chọn</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
