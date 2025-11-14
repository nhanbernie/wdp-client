// Export all vendor endpoints
export { createVendorEndpoint } from './createVendor'
export { getVendorsEndpoint } from './getVendors'
export { getVendorsByStatusEndpoint } from './getVendorsByStatus'
export { getVendorByIdEndpoint } from './getVendorById'
export { getMyVendorProfileEndpoint } from './getMyVendorProfile'
export { getVendorApplicationStatusEndpoint } from './getVendorApplicationStatus'
export { updateVendorEndpoint } from './updateVendor'
export { deleteVendorEndpoint } from './deleteVendor'
export { approveVendorEndpoint } from './approveVendor'
export { rejectVendorEndpoint } from './rejectVendor'
export { suspendVendorEndpoint } from './suspendVendor'

// Vendor Profile
export { updateMyVendorProfileEndpoint } from './updateMyVendorProfile'

// Products
export { getVendorProductsEndpoint } from './getVendorProducts'
export { createProductEndpoint } from './createProduct'
export { updateProductEndpoint } from './updateProduct'
export { deleteProductEndpoint } from './deleteProduct'
export { getProductDetailEndpoint } from './getProductDetail'

// Quote Requests
export { getVendorQuoteRequestsEndpoint } from './getVendorQuoteRequests'
export { getQuoteRequestDetailEndpoint } from './getQuoteRequestDetail'
export { respondToQuoteEndpoint } from './respondToQuote'

// Orders
export { getVendorOrdersEndpoint } from './getVendorOrders'
export { getOrderDetailEndpoint } from './getOrderDetail'
export { getOrderStatisticsEndpoint } from './getOrderStatistics'
export { updateVendorOrderStatusEndpoint } from './updateVendorOrderStatus'
