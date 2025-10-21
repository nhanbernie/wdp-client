import { VendorProfile } from '@/services/vendor/vendor.types'

export interface VendorProfileFormData {
  businessName: string
  businessEmail: string
  businessPhone: string
  businessAddress: string
  taxId: string
  description?: string
  logo?: string
}

export interface VendorProfileState {
  profile: VendorProfile | null
  loading: boolean
  error: string | null
}
