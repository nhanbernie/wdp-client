import { apiClient } from '@/services/api/apiClient'
import type { Review, VendorReplyDto } from '../review.types'

/**
 * POST /reviews/:id/reply
 * Vendor replies to a customer review (requires authentication - Vendor role)
 *
 * Business rules:
 * - Only vendors can reply to reviews
 * - Can only reply to reviews of products from their own shop
 * - Reply can be updated multiple times
 * - Maximum 500 characters
 */
export async function vendorReply(id: string, data: VendorReplyDto): Promise<Review> {
  const response = await apiClient.post<Review>(`/reviews/${id}/reply`, data)
  return response.data
}
