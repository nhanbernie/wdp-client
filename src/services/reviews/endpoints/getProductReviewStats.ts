import { apiClient } from '@/services/api/apiClient'
import type { ReviewStats } from '../review.types'

/**
 * GET /reviews/product/:productId/stats
 * Get review statistics for a specific product (public endpoint)
 */
export async function getProductReviewStats(productId: string): Promise<ReviewStats> {
  const response = await apiClient.get<ReviewStats>(`/reviews/product/${productId}/stats`)
  return response.data
}
