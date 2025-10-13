import { CategoryDto } from '@/services/categories/category.type'
import Image from 'next/image'

type Props = {
  data: CategoryDto
}

const CategoryCard = ({ data }: Props) => {
  return (
    <div className="w-full aspect-square rounded-full overflow-hidden relative bg-gray-400 hover:scale-105 transition-transform cursor-pointer duration-200">
      {data.thumbnail && (
        <Image
          src={data.thumbnail || '/images/placeholders/category-default.png'}
          alt={data?.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 200px"
        />
      )}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center text-white font-bold">
        <h1 className="text-[0.9rem]">{data.name}</h1>
        <p className="text-[0.8rem]">{data.productCount} sản phẩm</p>
      </div>
    </div>
  )
}

export default CategoryCard
