import { ProductDto } from '@/services/api/product.type'
import SearchItem from './SearchCard'

type Props = {
  productList: ProductDto[]
}

const SearchBarDropdown = ({ productList }: Props) => {
  return (
    <div className="w-full min-h-24 py-2 bg-[var(--card-background)] border-1 border-[var(--border)]">
      {productList.map((pro) => {
        return <SearchItem data={pro} />
      })}
    </div>
  )
}

export default SearchBarDropdown
