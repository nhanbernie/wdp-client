import { apiClient } from '@/services/api/apiClient'
import type { Review } from '../review.types'

/**
 * GET /reviews/product/:productId
 * Get all reviews for a specific product (public endpoint)
 */
export async function getProductReviews(productId: string): Promise<Review[]> {
  const response = await apiClient.get<Review[]>(`/reviews/product/${productId}`)
  return response.data
}
