import Link from 'next/link'
import { ProductDto } from '@/services/api/product.type'
import SearchItem from './SearchCard'

type Props = {
  productList: ProductDto[]
  loading?: boolean
  query: string
  onClose: () => void
}

const SearchBarDropdown = ({ productList, loading, query, onClose }: Props) => {
  return (
    <div className="w-full max-h-96 overflow-y-auto py-2 bg-[var(--card-background)] border-2 border-[var(--primary)] rounded-lg shadow-2xl backdrop-blur-lg">
      {loading ? (
        <div className="text-sm h-10 text-[var(--foreground)]">
          <div className="h-full flex items-center justify-center">
            <p>Đang tìm kiếm...</p>
          </div>
        </div>
      ) : productList.length > 0 ? (
        <>
          <div className="px-4 py-2 ">
            <p className="text-xs text-[var(--neutral-medium)]">
              Tìm thấy {productList.length} kết quả
            </p>
          </div>
          {productList.map((pro) => {
            return <SearchItem data={pro} key={pro.id} onClose={onClose} />
          })}
          <Link
            href={`/search?q=${encodeURIComponent(query)}`}
            onClick={onClose}
            className="block px-4 py-2 text-center text-sm font-medium text-[var(--primary)] hover:bg-[var(--primary)]/10 transition-colors border-t border-[var(--border)]"
          >
            Xem tất cả kết quả cho &quot;{query}&quot;
          </Link>
        </>
      ) : (
        <div className="text-sm h-10 text-[var(--foreground)]">
          <div className="h-full flex items-center justify-center">
            <p>Không tìm thấy sản phẩm nào</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBarDropdown
