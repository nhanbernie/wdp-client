import { VendorProfile } from '@/services/vendor/vendor.types'

export interface VendorProfileFormData {
  businessName: string
  businessDescription: string
  businessAddress: string
  businessPhone: string
  businessEmail: string
  businessLicense: string
  taxId: string
}

export interface VendorProfileState {
  profile: VendorProfile | null
  loading: boolean
  error: string | null
}
