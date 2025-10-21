'use client'

import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { Button } from '@/components/ui/button'
import { Save, X } from 'lucide-react'
import { VendorProfileFormData } from '../types'

interface VendorProfileFormProps {
  onCancel: () => void
  isLoading?: boolean
}

export const VendorProfileForm: React.FC<VendorProfileFormProps> = ({ onCancel, isLoading }) => {

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Thông tin doanh nghiệp</CardTitle>
          <CardDescription>Cập nhật thông tin cơ bản của doanh nghiệp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextField
            name="businessName"
            label="Tên doanh nghiệp"
            placeholder="Nhập tên doanh nghiệp"
            required
          />

          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              name="businessEmail"
              label="Email doanh nghiệp"
              placeholder="contact@company.com"
              type="email"
              required
            />

            <TextField
              name="businessPhone"
              label="Số điện thoại"
              placeholder="0901234567"
              required
            />
          </div>

          <TextField
            name="businessAddress"
            label="Địa chỉ"
            placeholder="123 Nguyễn Văn Linh, Q7, TP.HCM"
            required
          />

          <TextField
            name="taxId"
            label="Mã số thuế"
            placeholder="0123456789"
            required
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Thông tin bổ sung</CardTitle>
          <CardDescription>Mô tả và hình ảnh doanh nghiệp</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <TextAreaField
            name="description"
            label="Mô tả doanh nghiệp"
            placeholder="Nhập mô tả về doanh nghiệp của bạn..."
            rows={5}
          />

          <TextField
            name="logo"
            label="URL Logo"
            placeholder="https://res.cloudinary.com/.../logo.png"
          />
        </CardContent>
      </Card>

      <div className="flex justify-end gap-3">
        <Button type="button" variant="outline" onClick={onCancel} disabled={isLoading}>
          <X className="w-4 h-4 mr-2" />
          Hủy
        </Button>
        <Button type="submit" disabled={isLoading}>
          <Save className="w-4 h-4 mr-2" />
          {isLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
        </Button>
      </div>
    </div>
  )
}
