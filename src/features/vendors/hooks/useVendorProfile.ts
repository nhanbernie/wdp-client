'use client'

import { useGetProductsQuery } from '@/services/products'
import { VendorProfileDto, VendorProductsListDto } from '../types/vendors.types'

export function useVendorProfile(vendorId?: string) {
  // Only fetch products by vendorId (public endpoint that works)
  const {
    data: productsResp,
    isLoading: loadingProducts,
    error: productsError,
  } = useGetProductsQuery({ vendorId, page: 1, limit: 12 }, { skip: !vendorId })

  // Extract vendor info from the first product (all products have same vendor)
  const firstProduct = productsResp?.data?.items?.[0]
  const profile: VendorProfileDto | undefined = firstProduct?.vendor
    ? {
        id: firstProduct.vendor.id,
        businessName: firstProduct.vendor.businessName,
        businessEmail: firstProduct.vendor.businessEmail,
        // Optional fields that might not exist in product.vendor
        phoneNumber: undefined,
        description: undefined,
        address: undefined,
        logo: undefined,
        rating: undefined,
        totalReviews: undefined,
        totalProducts: productsResp?.data?.pagination?.total,
        totalSold: undefined,
        responseRate: undefined,
        responseTime: undefined,
        isVerified: undefined,
        joinedDate: undefined,
      }
    : undefined

  const products: VendorProductsListDto | undefined = productsResp
    ? {
        products: (productsResp.data.items || []) as any,
        total: productsResp.data.pagination?.total || 0,
        page: productsResp.data.pagination?.page || 1,
        limit: productsResp.data.pagination?.limit || 12,
      }
    : undefined

  console.log('useVendorProfile:', {
    vendorId,
    profile,
    products,
    loading: loadingProducts,
    error: productsError,
  })

  return {
    profile,
    products,
    loading: loadingProducts,
    error: productsError,
  }
}
