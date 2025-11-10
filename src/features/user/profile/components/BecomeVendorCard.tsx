'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Store, Loader2, CheckCircle, Clock, XCircle, AlertCircle } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  vendorRegistrationSchema,
  VendorRegistrationFormData,
} from '../schemas/vendor-registration.schema'
import {
  useCreateVendorMutation,
  useGetVendorApplicationStatusQuery,
} from '@/services/vendor/vendor.service'
import { useToast } from '@/hooks/useToast'
import { useTheme } from '@/contexts/ThemeContext'

export const BecomeVendorCard: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const {
    data: vendorData,
    isLoading: vendorLoading,
    refetch,
  } = useGetVendorApplicationStatusQuery()
  const [createVendor, { isLoading: isCreating }] = useCreateVendorMutation()
  const toast = useToast()
  const { colors } = useTheme()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<VendorRegistrationFormData>({
    resolver: zodResolver(vendorRegistrationSchema),
  })

  const vendorProfile = vendorData?.data

  const onSubmit = async (data: VendorRegistrationFormData) => {
    try {
      await createVendor(data).unwrap()
      toast.success(
        'Thành công',
        'Đăng ký vendor thành công! Vui lòng đợi quản trị viên phê duyệt.',
      )
      setIsDialogOpen(false)
      reset()
      refetch()
    } catch (error: any) {
      toast.error('Lỗi', error?.data?.message || 'Đăng ký vendor thất bại')
    }
  }

  const getStatusConfig = (colors: any) => ({
    pending: {
      label: 'Chờ phê duyệt',
      icon: Clock,
      color: colors.warning,
      description: 'Đơn đăng ký của bạn đang chờ được phê duyệt',
    },
    approved: {
      label: 'Đã phê duyệt',
      icon: CheckCircle,
      color: colors.success,
      description: 'Tài khoản vendor của bạn đã được kích hoạt',
    },
    rejected: {
      label: 'Bị từ chối',
      icon: XCircle,
      color: colors.error,
      description: 'Đơn đăng ký của bạn đã bị từ chối',
    },
    suspended: {
      label: 'Tạm ngưng',
      icon: AlertCircle,
      color: colors.warning,
      description: 'Tài khoản vendor của bạn đang bị tạm ngưng',
    },
  })

  const statusConfig = getStatusConfig(colors)

  if (vendorLoading) {
    return (
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardContent className="py-8 text-center">
          <Loader2 className="w-6 h-6 animate-spin mx-auto" style={{ color: colors.accent }} />
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <Card style={{ backgroundColor: colors.cardBackground, borderColor: colors.border }}>
        <CardHeader style={{ borderColor: colors.border }}>
          <CardTitle className="flex items-center gap-2" style={{ color: colors.text }}>
            <Store className="w-5 h-5" style={{ color: colors.accent }} />
            Tài khoản Vendor
          </CardTitle>
        </CardHeader>
        <CardContent style={{ backgroundColor: colors.cardBackground }}>
          {vendorProfile ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span style={{ color: colors.textSecondary }}>Trạng thái Vendor</span>
                <Badge
                  style={{
                    backgroundColor: `${statusConfig[vendorProfile.status].color}20`,
                    color: statusConfig[vendorProfile.status].color,
                    backgroundImage: 'none',
                    borderColor: 'transparent',
                  }}
                >
                  {statusConfig[vendorProfile.status].label}
                </Badge>
              </div>

              <div
                className="p-4 rounded-lg"
                style={{ backgroundColor: colors.cardBackgroundSecondary }}
              >
                <div className="flex items-start gap-3">
                  {React.createElement(statusConfig[vendorProfile.status].icon, {
                    className: 'w-5 h-5 mt-0.5',
                    style: { color: statusConfig[vendorProfile.status].color },
                  })}
                  <div className="flex-1">
                    <p className="font-medium mb-1" style={{ color: colors.text }}>
                      {vendorProfile.businessName}
                    </p>
                    <p className="text-sm" style={{ color: colors.textSecondary }}>
                      {statusConfig[vendorProfile.status].description}
                    </p>
                  </div>
                </div>
              </div>

              {vendorProfile.status === 'approved' && (
                <Button
                  className="w-full"
                  onClick={() => (window.location.href = '/vendor/dashboard')}
                  style={{
                    backgroundColor: colors.accent,
                    color: colors.background,
                  }}
                >
                  Đi tới Dashboard Vendor
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p style={{ color: colors.textSecondary }}>
                Trở thành vendor để bán sản phẩm của bạn trên nền tảng của chúng tôi
              </p>
              <Button
                className="w-full"
                onClick={() => setIsDialogOpen(true)}
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                <Store className="w-4 h-4 mr-2" />
                Đăng ký làm Vendor
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Registration Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto"
          style={{ backgroundColor: colors.cardBackground }}
        >
          <DialogHeader>
            <DialogTitle style={{ color: colors.text }}>Đăng ký làm Vendor</DialogTitle>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mt-5">
              <Label htmlFor="businessName" style={{ color: colors.text }}>
                Tên doanh nghiệp *
              </Label>
              <Input
                id="businessName"
                {...register('businessName')}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              {errors.businessName && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {errors.businessName.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="businessDescription" style={{ color: colors.text }}>
                Mô tả doanh nghiệp *
              </Label>
              <Textarea
                id="businessDescription"
                {...register('businessDescription')}
                rows={3}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              {errors.businessDescription && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {errors.businessDescription.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="businessAddress" style={{ color: colors.text }}>
                Địa chỉ doanh nghiệp *
              </Label>
              <Input
                id="businessAddress"
                {...register('businessAddress')}
                style={{
                  backgroundColor: colors.cardBackgroundSecondary,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              />
              {errors.businessAddress && (
                <p className="text-sm mt-1" style={{ color: colors.error }}>
                  {errors.businessAddress.message}
                </p>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessPhone" style={{ color: colors.text }}>
                  Số điện thoại *
                </Label>
                <Input
                  id="businessPhone"
                  {...register('businessPhone')}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.businessPhone && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.businessPhone.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="businessEmail" style={{ color: colors.text }}>
                  Email doanh nghiệp *
                </Label>
                <Input
                  id="businessEmail"
                  type="email"
                  {...register('businessEmail')}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.businessEmail && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.businessEmail.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="businessLicense" style={{ color: colors.text }}>
                  Số giấy phép kinh doanh *
                </Label>
                <Input
                  id="businessLicense"
                  {...register('businessLicense')}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.businessLicense && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.businessLicense.message}
                  </p>
                )}
              </div>

              <div>
                <Label htmlFor="taxId" style={{ color: colors.text }}>
                  Mã số thuế *
                </Label>
                <Input
                  id="taxId"
                  {...register('taxId')}
                  style={{
                    backgroundColor: colors.cardBackgroundSecondary,
                    borderColor: colors.border,
                    color: colors.text,
                  }}
                />
                {errors.taxId && (
                  <p className="text-sm mt-1" style={{ color: colors.error }}>
                    {errors.taxId.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setIsDialogOpen(false)
                  reset()
                }}
                style={{
                  backgroundColor: colors.cardBackground,
                  borderColor: colors.border,
                  color: colors.text,
                }}
              >
                Hủy
              </Button>
              <Button
                type="submit"
                disabled={isCreating}
                style={{
                  backgroundColor: colors.accent,
                  color: colors.background,
                }}
              >
                {isCreating ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  'Gửi đăng ký'
                )}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
