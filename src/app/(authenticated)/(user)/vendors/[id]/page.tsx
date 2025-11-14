'use client'

import React from 'react'
import { useParams, useRouter } from 'next/navigation'
import { VendorShop } from '@/features/vendors'

export default function VendorShopPage() {
  const params = useParams()
  const router = useRouter()
  const vendorId = params.id as string

  const handleOpenProduct = (productId: string) => {
    router.push(`/products/${productId}`)
  }

  const handleChatWithVendor = (vendorId: string) => {
    console.log('Chat with vendor:', vendorId)
    // TODO: Implement chat functionality
  }

  return (
    <VendorShop
      vendorId={vendorId}
      onOpenProduct={handleOpenProduct}
      onChatWithVendor={handleChatWithVendor}
    />
  )
}
