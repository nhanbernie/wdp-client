import { useGetProductDetailQuery } from "@/services/products";

export function useProductDetail(id?: string) {
  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductDetailQuery(id as string, {
    skip: !id, // chỉ gọi khi có id
  });

  return {
    product,
    loading: isLoading,
    error: isError ? error : null,
  };
}
