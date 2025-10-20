'use client'

export default function ProductCardSkeleton() {
  return (
    <div className="h-96 bg-[var(--card-background)] animate-pulse rounded-xl overflow-hidden">
      {/* Ảnh sản phẩm (phần trên) */}
      <div className="h-3/5 bg-gray-300 dark:bg-gray-700" />

      {/* Phần nội dung */}
      <div className="h-2/5 p-3 space-y-3">
        <div className="w-20 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="w-full h-5 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="w-3/4 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        <div className="flex gap-2 pt-2">
          <div className="w-16 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
          <div className="w-12 h-4 bg-gray-300 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}
