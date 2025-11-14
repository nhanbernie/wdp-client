import { apiClient } from '@/services/api/apiClient'
import type { Review, UpdateReviewDto } from '../review.types'

/**
 * PATCH /reviews/:id
 * Update an existing review (requires authentication - Owner only)
 *
 * Business rules:
 * - Can only edit within 1 month of creation
 * - Maximum 3 edits allowed
 * - Only the review creator can edit
 *
 * @param data - Can be UpdateReviewDto (JSON) or FormData (for file upload)
 * FormData fields (all optional):
 * - rating: number 1-5
 * - comment: string max 1000 chars
 * - images: File[] max 5 files, each max 5MB (replaces all old images)
 */
export async function updateReview(id: string, data: UpdateReviewDto | FormData): Promise<Review> {
  const response = await apiClient.patch<Review>(`/reviews/${id}`, data)
  return response.data
}
