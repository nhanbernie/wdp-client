'use client'

import React from 'react'
import { motion } from 'framer-motion'
import FormProvider from '@/components/form/FormProvider'
import { VendorProfileForm, VendorProfileView } from './components'
import { useVendorProfile } from './hooks/useVendorProfile'
import { vendorProfileSchema } from './schemas/vendorProfile.schema'
import { VendorProfileFormData } from './types'
import { Loader2 } from 'lucide-react'

export const VendorProfilePage: React.FC = () => {
  const { profile, isLoading, isEditing, setIsEditing, handleUpdate, isUpdating } =
    useVendorProfile()

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-gray-500">Không tìm thấy thông tin vendor</p>
      </div>
    )
  }

  const defaultValues: VendorProfileFormData = {
    businessName: profile.businessName,
    businessEmail: profile.businessEmail,
    businessPhone: profile.businessPhone,
    businessAddress: profile.businessAddress,
    taxId: profile.taxId,
    description: profile.description || '',
    logo: profile.logo || '',
  }

  const onSubmit = async (data: VendorProfileFormData) => {
    await handleUpdate(data)
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-5xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Thông tin Vendor</h1>
          <p className="text-gray-600">Quản lý thông tin doanh nghiệp của bạn</p>
        </div>

        {isEditing ? (
          <FormProvider<VendorProfileFormData>
            defaultValues={defaultValues}
            validationSchema={vendorProfileSchema}
            onSubmit={onSubmit}
            mode="onChange"
          >
            <VendorProfileForm onCancel={() => setIsEditing(false)} isLoading={isUpdating} />
          </FormProvider>
        ) : (
          <VendorProfileView profile={profile} onEdit={() => setIsEditing(true)} />
        )}
      </motion.div>
    </div>
  )
}
