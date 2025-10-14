import { ProductDto } from '@/services/api/product.type'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  data: ProductDto
}

const SearchItem = ({ data }: Props) => {
  const router = useRouter()

  return (
    <div
      key={data.id}
      className="flex justify-start items-center gap-3 hover:bg-[var(--card)] p-2 cursor-pointer"
      onClick={() => router.push(`/products/${data.id}`)}
    >
      <Search className="text-[var(--foreground)]" size={20} />
      <h1 className="text-[0.9rem] font-bold">{data.name}</h1>
    </div>
  )
}

export default SearchItem
