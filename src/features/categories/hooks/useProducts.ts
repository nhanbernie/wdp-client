"use client";

import { useGetProductsQuery } from "@/services/products";
import { ProductSearchParams } from "@/services/api/product.type";

export function useProducts(filters?: ProductSearchParams) {
  const { data, error, isLoading, isFetching, refetch } = useGetProductsQuery(
    filters || { page: 1, limit: 20 }
  );

  return {
    products: data?.data?.items || [],
    pagination: data?.data?.pagination,
    loading: isLoading || isFetching,
    error,
    refetch,
  };
}
