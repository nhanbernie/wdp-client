'use client'
import { CategoryDto } from '@/services/categories/category.type'
import { useCategories } from '../hooks/useCategories'
import CategoryCard from './CategoryCard'

const CategoryShowcase = () => {
  const { categories, loading } = useCategories({ productCount: true })

  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-[var(--header-horizontal-padding)] py-16">
      {/* Categories title */}
      <div className="text-center mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-3">Khám phá vật liệu xây dựng</h1>
        <p className="text-sm sm:text-lg text-[var(--muted-foreground)]">
          Tìm kiếm trong hàng nghìn sản phẩm chất lượng cao từ các nhà cung cấp uy tín
        </p>
      </div>

      {/* Categories list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
        {!loading
          ? categories.length > 0 &&
            categories.map((cate: CategoryDto) => (
              <div key={cate.id} className="group">
                <CategoryCard data={cate} />
              </div>
            ))
          : Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="w-full aspect-square rounded-xl overflow-hidden relative bg-gray-200 animate-pulse"
              >
                {/* Vùng text giả */}
                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center">
                  <div className="h-3 w-16 bg-gray-300 rounded mb-2" />
                  <div className="h-2 w-12 bg-gray-300 rounded" />
                </div>
              </div>
            ))}
      </div>
    </div>
  )
}

export default CategoryShowcase
