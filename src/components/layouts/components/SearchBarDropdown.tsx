import Link from 'next/link'
import { ProductDto } from '@/services/api/product.type'
import SearchItem from './SearchCard'
import { useTheme } from '@/contexts/ThemeContext'

type Props = {
  productList: ProductDto[]
  loading?: boolean
  query: string
  onClose: () => void
}

const SearchBarDropdown = ({ productList, loading, query, onClose }: Props) => {
  const { colors } = useTheme()
  
  return (
    <div 
      className="w-full max-h-96 overflow-y-auto py-2 rounded-lg shadow-2xl backdrop-blur-lg"
      style={{
        backgroundColor: colors.cardBackground,
        border: `1px solid ${colors.border}30`,
      }}
    >
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
            className="block px-4 py-2 text-center text-sm font-medium transition-colors border-t"
            style={{
              color: colors.accent,
              borderColor: `${colors.border}30`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.accent}10`
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent'
            }}
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
