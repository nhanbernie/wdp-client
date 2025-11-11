'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

interface VendorProfileFormProps {
  onCancel: () => void
  isLoading?: boolean
}

export const VendorProfileForm: React.FC<VendorProfileFormProps> = ({ onCancel, isLoading }) => {
  const { colors } = useTheme()

  return (
    <div className="space-y-6">
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardHeader>
          <CardTitle style={{ color: colors.text }}>Thông tin doanh nghiệp</CardTitle>
          <CardDescription style={{ color: colors.textSecondary }}>
            Cập nhật thông tin cơ bản của doanh nghiệp
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextField
            name="businessName"
            label="Tên doanh nghiệp"
            placeholder="Nhập tên doanh nghiệp"
            required
          />

          <TextAreaField
            name="businessDescription"
            label="Mô tả doanh nghiệp"
            placeholder="Nhập mô tả về doanh nghiệp của bạn..."
            rows={4}
            required
          />

          <TextField
            name="businessAddress"
            label="Địa chỉ"
            placeholder="123 Nguyễn Văn Linh, Q7, TP.HCM"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              name="businessPhone"
              label="Số điện thoại"
              placeholder="+84901234567"
              required
            />

            <TextField
              name="businessEmail"
              label="Email doanh nghiệp"
              placeholder="contact@company.com"
              type="email"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              name="businessLicense"
              label="Giấy phép kinh doanh"
              placeholder="BL123456789"
              required
            />

            <TextField name="taxId" label="Mã số thuế" placeholder="TAX123456789" required />
          </div>
        </CardContent>
      </Card>

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
          <X className="w-4 h-4 mr-2" />
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
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </div>
  )
}
