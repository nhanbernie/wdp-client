// DTO cho danh sách sản phẩm (list)
export interface ProductDto {
  id: string;
  name: string;
  slug: string;
  brand?: string;
  thumbnail: string;
  price: number;
  originalPrice?: number;
  currency: string;
  rating?: number;
  reviews?: number;
  inStock?: boolean;
  category?: string;
  createdAt: string;
  updatedAt: string;
}

// Dùng cho gợi ý AI
export interface AIRecommendation {
  id: string;
  name: string;
  reason?: string;
  price?: number;
  image?: string;
}

// Chi tiết hình ảnh sản phẩm
export interface ProductImage {
  id: string;
  url: string;
  position: number;
}

// Chi tiết option (màu, size, ...)
export interface ProductOptionValue {
  id: string;
  value: string;
}

export interface ProductOption {
  id: string;
  name: string;
  displayName: string;
  values: ProductOptionValue[];
}

// Biến thể sản phẩm (SKU riêng, giá riêng)
export interface ProductVariant {
  id: string;
  sku: string;
  price: number;
  stockQty: number;
  options: Record<string, string>;
  specs?: Record<string, any> | null;
}

// Thông số kỹ thuật
export interface ProductSpecs {
  size?: string;
  expiry?: string;
  standard?: string;
  protectionLevel?: string;
  [key: string]: any;
}

// DTO cho chi tiết sản phẩm
export interface ProductDetailDto {
  id: string;
  name: string;
  slug: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  vendor: {
    id: string;
    businessName: string;
    businessEmail: string;
  };
  brand: string;
  thumbnail: string;
  images: ProductImage[];
  price: number;
  salePrice?: number | undefined;
  currency: string;
  stock: {
    quantity: number;
    unit: string;
  };
  badges: string[];
  specs: ProductSpecs;
  options: ProductOption[];
  variants: ProductVariant[];
  shortDescription: string;
  description: string;
  datasheetUrl?: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
