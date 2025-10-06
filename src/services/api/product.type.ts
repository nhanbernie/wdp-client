import { PaginationParams } from "./type";

/**
 * Stock
 */
export interface ProductStock {
  quantity: number;
  unit: string;
}

/**
 * Category
 */
export interface ProductCategory {
  id: string;
  name: string;
  slug: string;
}

/**
 * Vendor
 */
export interface ProductVendor {
  id: string;
  businessName: string;
  businessEmail: string;
}

/**
 * Product Image
 */
export interface ProductImage {
  id: string;
  url: string;
  position: number;
}

/**
 * Product Option & Values
 */
export interface ProductOptionValue {
  id: string;
  value: string;
}

export interface ProductOption {
  id: string;
  name: string; // key: e.g. "color"
  displayName: string; // label: e.g. "Màu sắc"
  values: ProductOptionValue[];
}

/**
 * Product Variant
 */
export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stockQty: number;
  options: Record<string, string>; // e.g. { color: "Đỏ" }
  specs?: Record<string, any> | null;
}

/**
 * ProductDto (dùng cho List)
 * Chỉ chứa thông tin ngắn gọn
 */
export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  currency: string;
  stock: ProductStock;
  badges: string[];
  brand: string;
  category: ProductCategory;
  vendor: ProductVendor;
  specsSummary: Record<string, any>;
}

/**
 * FullProductDto (dùng cho Detail)
 * Kế thừa ProductDto và bổ sung thêm các field chi tiết
 */
export interface FullProductDto extends ProductDto {
  shortDescription: string;
  description: string;
  images: ProductImage[];
  options: ProductOption[];
  variants: ProductVariant[];
  specs: Record<string, any>;
  datasheetUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Search Params cho list
 */
export interface ProductSearchParams extends PaginationParams {
  inStock?: boolean;
  sort?: string;
  withFacets?: boolean;
}
