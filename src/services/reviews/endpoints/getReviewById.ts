import { apiClient } from '@/services/api/apiClient'
import type { Review } from '../review.types'

/**
 * GET /reviews/:id
 * Get review by ID (public endpoint)
 */
export async function getReviewById(id: string): Promise<Review> {
  const response = await apiClient.get<Review>(`/reviews/${id}`)
  return response.data
}
