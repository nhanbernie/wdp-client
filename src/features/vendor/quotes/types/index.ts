export interface QuoteFilters {
  status?: 'pending' | 'quoted' | 'accepted' | 'rejected' | 'expired' | 'cancelled'
}

export interface RespondQuoteFormData {
  responsePrice: number
  responseNotes?: string
  validUntil?: string
}
