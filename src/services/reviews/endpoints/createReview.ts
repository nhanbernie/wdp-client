import { apiClient } from '@/services/api/apiClient'
import type { Review, CreateReviewDto } from '../review.types'

/**
 * POST /reviews
 * Create a new review for a product (requires authentication - Customer role)
 *
 * Business rules:
 * - Order must have status DELIVERED
 * - Product must be in the order
 * - Each product can only be reviewed once per order
 * - User must be the owner of the order
 *
 * @param data - Can be CreateReviewDto (JSON) or FormData (for file upload)
 * FormData fields:
 * - productId: UUID (required)
 * - orderId: UUID (required)
 * - rating: number 1-5 (required)
 * - comment: string max 1000 chars (optional)
 * - images: File[] max 5 files, each max 5MB (optional)
 */
export async function createReview(data: CreateReviewDto | FormData): Promise<Review> {
  const response = await apiClient.post<Review>('/reviews', data)
  return response.data
}
