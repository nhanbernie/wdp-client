'use client'

import React from 'react'
import FormProvider from '@/components/form/FormProvider'
import { VendorProfileForm, VendorProfileView } from './components'
import { useVendorProfile } from './hooks/useVendorProfile'
import { vendorProfileSchema } from './schemas/vendorProfile.schema'
import { VendorProfileFormData } from './types'
import { Loader2 } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export const VendorProfilePage: React.FC = () => {
  const { colors } = useTheme()
  const { profile, isLoading, isEditing, setIsEditing, handleUpdate, isUpdating } =
    useVendorProfile()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: colors.accent }} />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p style={{ color: colors.textSecondary }}>Không tìm thấy thông tin vendor</p>
      </div>
    )
  }

  const defaultValues: VendorProfileFormData = {
    businessName: profile.businessName,
    businessDescription: profile.businessDescription,
    businessAddress: profile.businessAddress,
    businessPhone: profile.businessPhone,
    businessEmail: profile.businessEmail,
    businessLicense: profile.businessLicense,
    taxId: profile.taxId,
    bankName: profile.bankName || '',
    bankAccountNumber: profile.bankAccountNumber || '',
    accountHolderName: profile.accountHolderName || '',
    bankBranch: profile.bankBranch || '',
  }

  const onSubmit = async (data: VendorProfileFormData) => {
    try {
      await handleUpdate(data)
    } catch (error) {}
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <div>
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.text }}>
            Thông tin Vendor
          </h1>
          <p style={{ color: colors.textSecondary }}>Quản lý thông tin doanh nghiệp của bạn</p>
        </div>

        {isEditing ? (
          <FormProvider<VendorProfileFormData>
            key={`edit-${profile.id}-${profile.updatedAt}`}
            defaultValues={defaultValues}
            validationSchema={vendorProfileSchema}
            onSubmit={onSubmit}
            mode="onChange"
          >
            <VendorProfileForm onCancel={() => setIsEditing(false)} isLoading={isUpdating} />
          </FormProvider>
        ) : (
          <VendorProfileView
            key={`view-${profile.id}-${profile.updatedAt}`}
            profile={profile}
            onEdit={() => setIsEditing(true)}
          />
        )}
      </div>
    </div>
  )
}
