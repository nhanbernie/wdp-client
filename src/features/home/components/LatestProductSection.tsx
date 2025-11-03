'use client'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/navigation'
import { useProducts } from '@/features/categories'
import ProductCard from '@/components/common/ProductCard'

const LatestProductSection = () => {
  const { products, loading } = useProducts({ limit: 8 })

  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)
  const swiperRef = useRef<any>(null)

  const [isHovered, setIsHovered] = useState(false)

  // Khởi tạo lại navigation sau khi mount
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      const swiper = swiperRef.current
      swiper.params.navigation.prevEl = prevRef.current
      swiper.params.navigation.nextEl = nextRef.current
      swiper.navigation.destroy()
      swiper.navigation.init()
      swiper.navigation.update()
    }
  }, [products])

  return (
    <div className="px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-center text-foreground">Sản phẩm mới nhất</h1>
          <p className="text-lg text-muted-foreground">
            Các sản phẩm mới nhất từ các nhà cung cấp uy tín
          </p>
        </div>

      {/* Thay group bằng onMouseEnter / onMouseLeave */}
      <div
        className="w-full relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Add padding for shadows without breaking responsive */}
        <div className="px-8 sm:px-10 lg:px-12">
          <Swiper
            modules={[Navigation]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            spaceBetween={20}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
            loop
          >
            {!loading &&
              products.map((product) => (
                <SwiperSlide key={product.id} className="!h-auto !flex">
                  <div className="py-4 px-2 w-full h-full flex">
                    <ProductCard data={product} />
                  </div>
                </SwiperSlide>
              ))}
          </Swiper>
        </div>

        {/* Nút điều hướng */}
        <button
          ref={prevRef}
          className={`absolute cursor-pointer top-1/2 left-0 sm:left-2 -translate-y-1/2 bg-accent-primary text-white p-2 sm:p-3 rounded-full hover:bg-accent-secondary
                      transition-all duration-300 z-20 shadow-lg
                      ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-3'}`}
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>

        <button
          ref={nextRef}
          className={`absolute cursor-pointer top-1/2 right-0 sm:right-2 -translate-y-1/2 bg-accent-primary text-white p-2 sm:p-3 rounded-full hover:bg-accent-secondary
                      transition-all duration-300 z-20 shadow-lg
                      ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-3'}`}
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
        </button>
      </div>
      </div>
    </div>
  )
}

export default LatestProductSection
