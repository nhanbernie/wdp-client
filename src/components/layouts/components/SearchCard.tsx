import { ProductDto } from '@/services/api/product.type'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'

type Props = {
  data: ProductDto
  onClose?: () => void
}

const SearchItem = ({ data, onClose }: Props) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(`/products/${data.id}`)
    onClose?.()
  }

  return (
    <div
      key={data.id}
      className="flex justify-start items-center gap-3 hover:bg-[var(--card)] p-2 cursor-pointer transition-colors"
      onClick={handleClick}
    >
      <Search className="text-[var(--foreground)]" size={20} />
      <h1 className="text-[0.9rem] font-semibold">{data.name}</h1>
    </div>
  )
}

export default SearchItem
