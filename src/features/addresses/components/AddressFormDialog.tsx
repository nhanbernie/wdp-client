'use client'

import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useCreateAddressMutation, useUpdateAddressMutation } from '@/services/addresses'
import type { Address, CreateAddressRequest } from '@/services/addresses/types'
import { useTheme } from '@/contexts/ThemeContext'
import { Loader2 } from 'lucide-react'

interface AddressFormDialogProps {
  open: boolean
  onClose: () => void
  address?: Address | null
  onSuccess?: () => void
}

export const AddressFormDialog: React.FC<AddressFormDialogProps> = ({
  open,
  onClose,
  address,
  onSuccess,
}) => {
  const { colors } = useTheme()
  const [createAddress, { isLoading: isCreating }] = useCreateAddressMutation()
  const [updateAddress, { isLoading: isUpdating }] = useUpdateAddressMutation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAddressRequest>({
    defaultValues: {
      recipientName: '',
      recipientPhone: '',
      addressLine: '',
      ward: '',
      district: '',
      city: '',
      nickname: '',
      isDefault: false,
    },
  })

  useEffect(() => {
    if (address) {
      reset({
        recipientName: address.recipientName,
        recipientPhone: address.recipientPhone,
        addressLine: address.addressLine,
        ward: address.ward || '',
        district: address.district || '',
        city: address.city || '',
        nickname: address.nickname || '',
        isDefault: address.isDefault,
      })
    } else {
      reset({
        recipientName: '',
        recipientPhone: '',
        addressLine: '',
        ward: '',
        district: '',
        city: '',
        nickname: '',
        isDefault: false,
      })
    }
  }, [address, reset, open])

  const onSubmit = async (data: CreateAddressRequest) => {
    try {
      if (address) {
        // Update address
        await updateAddress({
          id: address.id,
          data,
        }).unwrap()
      } else {
        // Create address
        await createAddress(data).unwrap()
      }
      onSuccess?.()
      onClose()
      reset()
    } catch (error) {
      console.error('Failed to save address:', error)
    }
  }

  const isLoading = isCreating || isUpdating

  // Helper function to get input styles
  const getInputStyles = (hasError: boolean) => ({
    backgroundColor: colors.cardBackgroundSecondary,
    color: colors.text,
    borderColor: hasError ? colors.error : `${colors.border}30`,
    borderWidth: '1px',
    borderStyle: 'solid',
  })

  // Helper function for input event handlers
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = colors.accent
    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.accent}20`
  }

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>, hasError: boolean) => {
    e.currentTarget.style.borderColor = hasError ? colors.error : `${colors.border}30`
    e.currentTarget.style.boxShadow = 'none'
  }

  return (
    <>
      <style>
        {`
          .address-form-input::placeholder {
            color: ${colors.textSecondary} !important;
          }
        `}
      </style>
      <Dialog open={open} onOpenChange={onClose}>
        <DialogContent
          className="max-w-2xl max-h-[90vh] overflow-y-auto p-0"
          style={{
            backgroundColor: colors.cardBackground,
          }}
        >
          <div className="p-6">
            <DialogHeader className="mb-6">
              <DialogTitle style={{ color: colors.text }} className="text-xl">
                {address ? 'Sửa địa chỉ' : 'Thêm địa chỉ mới'}
              </DialogTitle>
            </DialogHeader>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="recipientName" style={{ color: colors.text }}>
                    Họ và tên người nhận <span style={{ color: colors.error }}>*</span>
                  </Label>
                  <Input
                    id="recipientName"
                    {...register('recipientName', {
                      required: 'Vui lòng nhập họ và tên',
                      maxLength: {
                        value: 100,
                        message: 'Họ và tên không được quá 100 ký tự',
                      },
                    })}
                    placeholder="Nhập họ và tên"
                    className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                    style={getInputStyles(!!errors.recipientName)}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, !!errors.recipientName)}
                  />
                  {errors.recipientName && (
                    <p className="text-sm" style={{ color: colors.error }}>
                      {errors.recipientName.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="recipientPhone" style={{ color: colors.text }}>
                    Số điện thoại <span style={{ color: colors.error }}>*</span>
                  </Label>
                  <Input
                    id="recipientPhone"
                    type="tel"
                    {...register('recipientPhone', {
                      required: 'Vui lòng nhập số điện thoại',
                      maxLength: {
                        value: 20,
                        message: 'Số điện thoại không được quá 20 ký tự',
                      },
                    })}
                    placeholder="Nhập số điện thoại"
                    className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                    style={getInputStyles(!!errors.recipientPhone)}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, !!errors.recipientPhone)}
                  />
                  {errors.recipientPhone && (
                    <p className="text-sm" style={{ color: colors.error }}>
                      {errors.recipientPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="addressLine" style={{ color: colors.text }}>
                  Địa chỉ chi tiết <span style={{ color: colors.error }}>*</span>
                </Label>
                <Input
                  id="addressLine"
                  {...register('addressLine', {
                    required: 'Vui lòng nhập địa chỉ chi tiết',
                    maxLength: {
                      value: 255,
                      message: 'Địa chỉ không được quá 255 ký tự',
                    },
                  })}
                  placeholder="Số nhà, tên đường..."
                  className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                  style={getInputStyles(!!errors.addressLine)}
                  onFocus={handleInputFocus}
                  onBlur={(e) => handleInputBlur(e, !!errors.addressLine)}
                />
                {errors.addressLine && (
                  <p className="text-sm" style={{ color: colors.error }}>
                    {errors.addressLine.message}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ward" style={{ color: colors.text }}>
                    Phường/Xã
                  </Label>
                  <Input
                    id="ward"
                    {...register('ward', {
                      maxLength: {
                        value: 100,
                        message: 'Phường/Xã không được quá 100 ký tự',
                      },
                    })}
                    placeholder="Phường/Xã"
                    className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                    style={getInputStyles(!!errors.ward)}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, !!errors.ward)}
                  />
                  {errors.ward && (
                    <p className="text-sm" style={{ color: colors.error }}>
                      {errors.ward.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="district" style={{ color: colors.text }}>
                    Quận/Huyện
                  </Label>
                  <Input
                    id="district"
                    {...register('district', {
                      maxLength: {
                        value: 100,
                        message: 'Quận/Huyện không được quá 100 ký tự',
                      },
                    })}
                    placeholder="Quận/Huyện"
                    className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                    style={getInputStyles(!!errors.district)}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, !!errors.district)}
                  />
                  {errors.district && (
                    <p className="text-sm" style={{ color: colors.error }}>
                      {errors.district.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="city" style={{ color: colors.text }}>
                    Tỉnh/Thành phố
                  </Label>
                  <Input
                    id="city"
                    {...register('city', {
                      maxLength: {
                        value: 100,
                        message: 'Tỉnh/Thành phố không được quá 100 ký tự',
                      },
                    })}
                    placeholder="Tỉnh/Thành phố"
                    className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                    style={getInputStyles(!!errors.city)}
                    onFocus={handleInputFocus}
                    onBlur={(e) => handleInputBlur(e, !!errors.city)}
                  />
                  {errors.city && (
                    <p className="text-sm" style={{ color: colors.error }}>
                      {errors.city.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname" style={{ color: colors.text }}>
                  Tên gợi nhớ (tùy chọn)
                </Label>
                <Input
                  id="nickname"
                  {...register('nickname', {
                    maxLength: {
                      value: 50,
                      message: 'Tên gợi nhớ không được quá 50 ký tự',
                    },
                  })}
                  placeholder="VD: Nhà riêng, Công ty..."
                  className="!border-0 focus:!ring-0 focus-visible:!ring-0 address-form-input"
                  style={getInputStyles(!!errors.nickname)}
                  onFocus={handleInputFocus}
                  onBlur={(e) => handleInputBlur(e, !!errors.nickname)}
                />
                {errors.nickname && (
                  <p className="text-sm" style={{ color: colors.error }}>
                    {errors.nickname.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDefault"
                  {...register('isDefault')}
                  className="w-4 h-4 rounded"
                  style={{
                    accentColor: colors.accent,
                  }}
                />
                <Label htmlFor="isDefault" style={{ color: colors.text }}>
                  Đặt làm địa chỉ mặc định
                </Label>
              </div>

              <DialogFooter
                className="px-0 pt-4 border-t gap-2"
                style={{
                  borderColor: colors.border,
                }}
              >
                <Button
                  type="button"
                  variant="ghost"
                  onClick={onClose}
                  disabled={isLoading}
                  style={{
                    color: colors.text,
                  }}
                >
                  Hủy
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                  style={{
                    backgroundColor: colors.accent,
                    color: '#fff',
                  }}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Đang lưu...
                    </>
                  ) : address ? (
                    'Cập nhật'
                  ) : (
                    'Thêm địa chỉ'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
