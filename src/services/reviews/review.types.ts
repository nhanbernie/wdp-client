export interface ReviewUser {
  id: string
  firstName: string
  lastName: string
  avatar?: string
}

export interface ReviewProduct {
  id: string
  name: string
  thumbnail?: string
}

export interface Review {
  id: string
  userId: string
  productId: string
  orderId: string
  rating: number
  comment?: string
  images: string[]
  vendorReply?: string
  vendorReplyAt?: string
  isApproved: boolean
  editCount: number
  createdAt: string
  updatedAt: string
  user?: ReviewUser
  product?: ReviewProduct
}

export interface CreateReviewDto {
  productId: string
  orderId: string
  rating: number
  comment?: string
  images?: string[]
}

export interface UpdateReviewDto {
  rating?: number
  comment?: string
  images?: string[]
}

export interface VendorReplyDto {
  vendorReply: string
}

export interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
}

export interface VendorReviewOverview {
  totalReviews: number
  averageRating: number
  ratingDistribution: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  recentReviews: Review[]
}

export interface ReviewHistoryItem {
  id: string
  type: 'review_created' | 'review_updated' | 'vendor_replied' | 'vendor_reply_updated'
  actorType: 'customer' | 'vendor'
  actorId: string
  actorName: string
  rating?: number
  content?: string
  images?: string[]
  createdAt: string
}

export interface ReviewHistory {
  reviewId: string
  currentRating: number
  currentComment?: string
  currentVendorReply?: string
  totalChanges: number
  history: ReviewHistoryItem[]
}
