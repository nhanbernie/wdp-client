export interface Product {
  id: string;
  name: string;
  slug: string;
  thumbnail: string;
  price: number;
  salePrice?: number;
  currency: string;
  stock: {
    quantity: number;
    unit: string;
  };
  badges: string[];
  brand: string;
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
  specsSummary: Record<string, any>;
}
export interface CategoryFilters {
  searchQuery: string;
  selectedCategories: string[];
  selectedBrands: string[];
  selectedMaterials: string[];
  priceRange: [number, number];
  inStock: boolean;
}

export interface Category {
  name: string;
  count: number;
  subcategories: string[];
}
export interface Brand {
  name: string;
  count: number;
}
export interface Material {
  name: string;
  count: number;
}
