'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { useFormContext } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useVendor } from '../hooks/useVendor'
import { CreateVendorRequest } from '@/types/vendor.types'
import { Building2, Mail, Phone, MapPin, FileText, Hash, AlertCircle } from 'lucide-react'

interface VendorFormProps {
  onSuccess?: (vendor: any) => void
  onCancel?: () => void
}

export const VendorForm: React.FC<VendorFormProps> = ({ onSuccess, onCancel }) => {
  const { createVendor, loading, error, clearError } = useVendor()
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useFormContext<CreateVendorRequest>()

  const onSubmit = async (data: CreateVendorRequest) => {
    try {
      const result = await createVendor(data)
      if (result.type.endsWith('/fulfilled')) {
        onSuccess?.(result.payload.data)
      }
    } catch (err) {
      console.error('Failed to create vendor:', err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="cart-card border rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5" />
            Thông tin đăng ký Vendor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Business Name */}
            <div className="space-y-2">
              <Label htmlFor="businessName" className="flex items-center gap-2">
                <Building2 className="h-4 w-4" />
                Tên doanh nghiệp *
              </Label>
              <Input
                id="businessName"
                {...register('businessName')}
                placeholder="Nhập tên doanh nghiệp"
                className="cart-card border"
              />
              {errors.businessName && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessName.message}
                </div>
              )}
            </div>

            {/* Business Description */}
            <div className="space-y-2">
              <Label htmlFor="businessDescription" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Mô tả doanh nghiệp *
              </Label>
              <Textarea
                id="businessDescription"
                {...register('businessDescription')}
                placeholder="Mô tả về doanh nghiệp của bạn"
                rows={3}
                className="cart-card border"
              />
              {errors.businessDescription && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessDescription.message}
                </div>
              )}
            </div>

            {/* Business Address */}
            <div className="space-y-2">
              <Label htmlFor="businessAddress" className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Địa chỉ doanh nghiệp *
              </Label>
              <Input
                id="businessAddress"
                {...register('businessAddress')}
                placeholder="Nhập địa chỉ doanh nghiệp"
                className="cart-card border"
              />
              {errors.businessAddress && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessAddress.message}
                </div>
              )}
            </div>

            {/* Business Phone */}
            <div className="space-y-2">
              <Label htmlFor="businessPhone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Số điện thoại *
              </Label>
              <Input
                id="businessPhone"
                type="tel"
                {...register('businessPhone')}
                placeholder="+84xxxxxxxxx hoặc 0xxxxxxxxx"
                className="cart-card border"
              />
              {errors.businessPhone && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessPhone.message}
                </div>
              )}
            </div>

            {/* Business Email */}
            <div className="space-y-2">
              <Label htmlFor="businessEmail" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                Email doanh nghiệp *
              </Label>
              <Input
                id="businessEmail"
                type="email"
                {...register('businessEmail')}
                placeholder="business@company.com"
                className="cart-card border"
              />
              {errors.businessEmail && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessEmail.message}
                </div>
              )}
            </div>

            {/* Business License */}
            <div className="space-y-2">
              <Label htmlFor="businessLicense" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Số giấy phép kinh doanh *
              </Label>
              <Input
                id="businessLicense"
                {...register('businessLicense')}
                placeholder="BL123456789"
                className="cart-card border"
              />
              {errors.businessLicense && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.businessLicense.message}
                </div>
              )}
            </div>

            {/* Tax ID */}
            <div className="space-y-2">
              <Label htmlFor="taxId" className="flex items-center gap-2">
                <Hash className="h-4 w-4" />
                Mã số thuế *
              </Label>
              <Input
                id="taxId"
                {...register('taxId')}
                placeholder="1234567890"
                className="cart-card border"
              />
              {errors.taxId && (
                <div className="flex items-center gap-2 text-red-500 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {errors.taxId.message}
                </div>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-700 rounded-lg">
                <div className="flex items-center gap-2 text-red-700 dark:text-red-400 text-sm">
                  <AlertCircle className="h-4 w-4" />
                  {error}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {loading ? 'Đang tạo...' : 'Đăng ký Vendor'}
              </Button>
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={onCancel}
                  className="flex-1 cart-card border"
                >
                  Hủy
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
