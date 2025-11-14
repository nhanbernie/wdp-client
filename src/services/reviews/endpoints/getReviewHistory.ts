import { apiClient } from '@/services/api/apiClient'
import type { ReviewHistory } from '../review.types'

/**
 * GET /reviews/:id/history
 * Get complete history of changes for a review (public endpoint)
 *
 * Returns:
 * - Current review state
 * - All historical changes
 * - Actor information (customer/vendor)
 * - Timestamps for each change
 */
export async function getReviewHistory(id: string): Promise<ReviewHistory> {
  const response = await apiClient.get<ReviewHistory>(`/reviews/${id}/history`)
  return response.data
}
