'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TextField } from '@/components/common/TextField'
import { TextAreaField } from '@/components/common/TextAreaField'
import { CreateVendorRequest } from '@/services/vendor/vendor.types'
import { Building2 } from 'lucide-react'

interface VendorFormProps {
  onSuccess?: (vendor: any) => void
  onCancel?: () => void
  loading?: boolean
  error?: string | null
}

export const VendorForm: React.FC<VendorFormProps> = ({
  onSuccess,
  onCancel,
  loading = false,
  error = null,
}) => {
  const {
    formState: { errors, isValid },
  } = useFormContext<CreateVendorRequest>()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="cart-card  border rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Thông tin đăng ký Vendor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Business Name */}
            <TextField
              name="businessName"
              label="Tên doanh nghiệp *"
              type="text"
              placeholder="Nhập tên doanh nghiệp"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Business Description */}
            <TextAreaField
              name="businessDescription"
              label="Mô tả doanh nghiệp *"
              placeholder="Mô tả về doanh nghiệp của bạn"
              rows={3}
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Business Address */}
            <TextField
              name="businessAddress"
              label="Địa chỉ doanh nghiệp *"
              type="text"
              placeholder="Nhập địa chỉ doanh nghiệp"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Business Phone */}
            <TextField
              name="businessPhone"
              label="Số điện thoại *"
              type="text"
              placeholder="+84xxxxxxxxx hoặc 0xxxxxxxxx"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Business Email */}
            <TextField
              name="businessEmail"
              label="Email doanh nghiệp *"
              type="email"
              placeholder="business@company.com"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Business License */}
            <TextField
              name="businessLicense"
              label="Số giấy phép kinh doanh *"
              type="text"
              placeholder="BL123456789"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Tax ID */}
            <TextField
              name="taxId"
              label="Mã số thuế *"
              type="text"
              placeholder="1234567890"
              className="border hover:border-primary focus:border-primary transition-colors"
            />

            {/* Global Error Message */}
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                  {error}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 h-12 bg-gray-800 text-white hover:bg-gray-700 hover:cursor-pointer transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl font-medium"
              >
                {loading ? 'Đang tạo...' : 'Đăng ký Vendor'}
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 h-12 border border-border hover:bg-muted hover:border-primary transition-colors duration-200 rounded-xl font-medium"
                >
                  Hủy
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
