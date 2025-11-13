import { apiClient } from '@/services/api/apiClient'
import type { VendorReviewOverview } from '../review.types'

/**
 * GET /reviews/vendor/:vendorId/overview
 * Get vendor's review overview and statistics (public endpoint)
 *
 * Returns:
 * - Total reviews count
 * - Average rating
 * - Rating distribution (1-5 stars)
 * - Recent reviews (last 5)
 */
export async function getVendorReviewOverview(vendorId: string): Promise<VendorReviewOverview> {
  const response = await apiClient.get<VendorReviewOverview>(`/reviews/vendor/${vendorId}/overview`)
  return response.data
}
