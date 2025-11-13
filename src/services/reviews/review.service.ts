/**
 * Review Service
 * Centralized service for all review-related API operations
 *
 * This service delegates to individual endpoint functions for better organization
 * and follows the same pattern as the vendor service
 */

import * as reviewEndpoints from './endpoints'

class ReviewService {
  // Public endpoints - No authentication required

  /**
   * Get all reviews for a specific product
   */
  async getProductReviews(productId: string) {
    return reviewEndpoints.getProductReviews(productId)
  }

  /**
   * Get review statistics for a product
   */
  async getProductReviewStats(productId: string) {
    return reviewEndpoints.getProductReviewStats(productId)
  }

  /**
   * Get a single review by ID
   */
  async getReviewById(id: string) {
    return reviewEndpoints.getReviewById(id)
  }

  /**
   * Get vendor's review overview and statistics
   */
  async getVendorReviewOverview(vendorId: string) {
    return reviewEndpoints.getVendorReviewOverview(vendorId)
  }

  /**
   * Get complete history of changes for a review
   */
  async getReviewHistory(id: string) {
    return reviewEndpoints.getReviewHistory(id)
  }

  // Customer endpoints - Requires authentication (Customer role)

  /**
   * Create a new review for a product
   * Requires: Order status DELIVERED, Product in order
   */
  async createReview(data: Parameters<typeof reviewEndpoints.createReview>[0]) {
    return reviewEndpoints.createReview(data)
  }

  /**
   * Update an existing review
   * Restrictions: Within 1 month, max 3 edits, owner only
   */
  async updateReview(id: string, data: Parameters<typeof reviewEndpoints.updateReview>[1]) {
    return reviewEndpoints.updateReview(id, data)
  }

  // Vendor endpoints - Requires authentication (Vendor role)

  /**
   * Vendor replies to a customer review
   * Can only reply to reviews of own products
   */
  async vendorReply(id: string, data: Parameters<typeof reviewEndpoints.vendorReply>[1]) {
    return reviewEndpoints.vendorReply(id, data)
  }
}

export const reviewService = new ReviewService()
