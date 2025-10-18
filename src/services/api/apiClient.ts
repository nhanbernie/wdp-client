import { API_CONFIG } from '@/common/constants/endpoint.constant'
import { StorageService } from '@/services/storage/secureStorage.service'

interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
  errors: any
  statusCode: number
}

class ApiClient {
  private baseUrl: string

  constructor() {
    this.baseUrl = API_CONFIG.BASE_URL
  }

  private async getHeaders(isFormData = false): Promise<HeadersInit> {
    const headers: HeadersInit = {
      Accept: 'application/json',
    }

    const token = await StorageService.getAccessToken()
    if (token) {
      headers.Authorization = `Bearer ${token}`
    }

    if (!isFormData) {
      headers['Content-Type'] = 'application/json'
    }

    return headers
  }

  private async handleResponse<T>(response: Response): Promise<T> {
    const data: ApiResponse<T> = await response.json()

    if (!response.ok || !data.success) {
      throw new Error(data.message || 'An error occurred')
    }

    return data.data
  }

  async get<T>(url: string): Promise<{ data: T }> {
    const headers = await this.getHeaders()
    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'GET',
      headers,
    })

    const data = await this.handleResponse<T>(response)
    return { data }
  }

  async post<T>(url: string, body: any): Promise<{ data: T }> {
    const isFormData = body instanceof FormData
    const headers = await this.getHeaders(isFormData)

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'POST',
      headers,
      body: isFormData ? body : JSON.stringify(body),
    })

    const data = await this.handleResponse<T>(response)
    return { data }
  }

  async patch<T>(url: string, body: any): Promise<{ data: T }> {
    const isFormData = body instanceof FormData
    const headers = await this.getHeaders(isFormData)

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PATCH',
      headers,
      body: isFormData ? body : JSON.stringify(body),
    })

    const data = await this.handleResponse<T>(response)
    return { data }
  }

  async put<T>(url: string, body: any): Promise<{ data: T }> {
    const isFormData = body instanceof FormData
    const headers = await this.getHeaders(isFormData)

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'PUT',
      headers,
      body: isFormData ? body : JSON.stringify(body),
    })

    const data = await this.handleResponse<T>(response)
    return { data }
  }

  async delete<T>(url: string): Promise<{ data: T }> {
    const headers = await this.getHeaders()

    const response = await fetch(`${this.baseUrl}${url}`, {
      method: 'DELETE',
      headers,
    })

    const data = await this.handleResponse<T>(response)
    return { data }
  }
}

export const apiClient = new ApiClient()
