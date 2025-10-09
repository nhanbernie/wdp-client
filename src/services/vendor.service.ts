import { Vendor, CreateVendorRequest, VendorResponse } from '../types/vendor.types'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export class VendorService {
  private static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`

    const defaultHeaders = {
      'Content-Type': 'application/json',
    }

    const config: RequestInit = {
      ...options,
      headers: {
        ...defaultHeaders,
        ...options.headers,
      },
    }

    try {
      const response = await fetch(url, config)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error('Vendor API Error:', error)
      throw error
    }
  }

  // Tạo vendor mới
  static async createVendor(vendorData: CreateVendorRequest): Promise<VendorResponse> {
    return this.request<VendorResponse>('/api/vendors', {
      method: 'POST',
      body: JSON.stringify(vendorData),
    })
  }

  // Lấy danh sách vendors
  static async getVendors(params?: {
    page?: number
    limit?: number
    status?: string
    search?: string
  }): Promise<{
    success: boolean
    data: Vendor[]
    pagination: {
      page: number
      limit: number
      total: number
      totalPages: number
    }
  }> {
    const queryParams = new URLSearchParams()
    if (params?.page) queryParams.append('page', params.page.toString())
    if (params?.limit) queryParams.append('limit', params.limit.toString())
    if (params?.status) queryParams.append('status', params.status)
    if (params?.search) queryParams.append('search', params.search)

    const endpoint = `/api/vendors${queryParams.toString() ? `?${queryParams.toString()}` : ''}`
    return this.request(endpoint)
  }

  // Lấy vendor theo ID
  static async getVendorById(id: string): Promise<VendorResponse> {
    return this.request<VendorResponse>(`/api/vendors/${id}`)
  }

  // Cập nhật vendor
  static async updateVendor(
    id: string,
    vendorData: Partial<CreateVendorRequest>,
  ): Promise<VendorResponse> {
    return this.request<VendorResponse>(`/api/vendors/${id}`, {
      method: 'PUT',
      body: JSON.stringify(vendorData),
    })
  }

  // Xóa vendor
  static async deleteVendor(id: string): Promise<{ success: boolean; message: string }> {
    return this.request(`/api/vendors/${id}`, {
      method: 'DELETE',
    })
  }

  // Cập nhật trạng thái vendor
  static async updateVendorStatus(
    id: string,
    status: 'pending' | 'approved' | 'rejected',
  ): Promise<VendorResponse> {
    return this.request<VendorResponse>(`/api/vendors/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
  }
}

export default VendorService
