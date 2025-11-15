import {
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react'
import { API_CONFIG, API_ENDPOINTS, PUBLIC_ENDPOINTS } from '@/common/constants/endpoint.constant'
import { StorageService } from '@/services/storage/secureStorage.service'
const getUrlFromArgs = (arg: any) => {
  if (typeof arg === 'string') return arg
  if (typeof arg === 'object' && arg.url) return arg.url
  return ''
}

const redirectToLogin = () => {
  if (typeof window !== 'undefined') {
    window.location.href = '/login'
  }
}

// Check if URL matches a public endpoint more precisely
const isPublicEndpoint = (url: string, method: string = 'GET') => {
  // Remove base URL and query params for comparison
  const cleanUrl = url.split('?')[0].replace(API_CONFIG.BASE_URL, '')

  // Special case: /products is only public for GET requests
  if (cleanUrl === '/products' && method !== 'GET') {
    return false
  }

  const result = PUBLIC_ENDPOINTS.some((ep) => {
    // Exact match
    if (cleanUrl === ep) {
      return true
    }

    // Pattern match for endpoints with :id (e.g., /materials/:id)
    if (ep.includes(':id')) {
      const pattern = ep.replace(':id', '[^/]+')
      const regex = new RegExp(`^${pattern}$`)
      if (regex.test(cleanUrl)) {
        return true
      }
    }

    return false
  })

  return result
}
// Base query with keychain
const baseQuery = fetchBaseQuery({
  baseUrl: `${API_CONFIG.BASE_URL}`,
  prepareHeaders: async (headers, { endpoint, ...rest }) => {
    const url = getUrlFromArgs(rest.arg)
    const method = typeof rest.arg === 'object' && rest.arg.method ? rest.arg.method : 'GET'
    const isPublic = isPublicEndpoint(url, method)

    if (!isPublic) {
      const token = await StorageService.getAccessToken()

      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      } else {
        console.warn('⚠️ No token found in storage!')
      }
    } else {
    }

    // Check if body is FormData, don't set Content-Type for FormData
    const isFormData = rest.arg && typeof rest.arg === 'object' && rest.arg.body instanceof FormData

    if (!isFormData) {
      headers.set('Content-Type', 'application/json')
    }

    headers.set('Accept', 'application/json')
    return headers
  },
})

// Base query with refresh token interceptor
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // Determine if this is a public endpoint
  const url = typeof args === 'string' ? args : args.url
  const method = typeof args === 'object' && args.method ? args.method : 'GET'
  const isPublic = isPublicEndpoint(url, method)
  let result = await baseQuery(args, api, extraOptions)

  // If unauthorized (401), try to refresh token
  if (!isPublic && result.error && result.error.status === 401) {
    const refreshToken = await StorageService.getRefreshToken()

    if (refreshToken) {
      const refreshResult = await baseQuery(
        {
          url: API_ENDPOINTS.AUTH.REFRESH,
          method: 'POST',
          body: { refreshToken: refreshToken },
        },
        api,
        extraOptions,
      )

      if (refreshResult.data) {
        const responseData = refreshResult.data as any
        const newAccessToken = responseData.data?.accessToken || responseData.data?.access_token
        const newRefreshToken = responseData.data?.refreshToken || responseData.data?.refresh_token

        if (newAccessToken) {
          await StorageService.setTokenData({
            access_token: newAccessToken,
            refresh_token: newRefreshToken || refreshToken,
            expires_in: responseData.data?.expires_in || 3600,
          })

          result = await baseQuery(args, api, extraOptions)
        } else {
          // Clear auth data and redirect to login
          await StorageService.clearAuthData()
          redirectToLogin()
        }
      } else {
        await StorageService.clearAuthData()
        redirectToLogin()
      }
    } else {
      await StorageService.clearAuthData()
      redirectToLogin()
    }
  }

  return result
}
