/**
 * Address Management Types
 */

export interface Address {
  id: string;
  userId: string;
  recipientName: string;
  recipientPhone: string;
  addressLine: string;
  ward?: string;
  district?: string;
  city?: string;
  nickname?: string;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateAddressRequest {
  recipientName: string;
  recipientPhone: string;
  addressLine: string;
  ward?: string;
  district?: string;
  city?: string;
  nickname?: string;
  isDefault?: boolean;
}

export interface UpdateAddressRequest {
  recipientName?: string;
  recipientPhone?: string;
  addressLine?: string;
  ward?: string;
  district?: string;
  city?: string;
  nickname?: string;
  isDefault?: boolean;
}

export interface AddressResponse {
  success: boolean;
  message: string;
  data: Address;
}

export interface AddressListResponse {
  success: boolean;
  message: string;
  data: Address[];
}

