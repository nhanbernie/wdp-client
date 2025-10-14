'use client'

import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { fakeAIRecommendations } from '../data/AiRecommenProducts.data'

interface AIRecommendationSectionProps {
  productId: string
  colors: { background: string; text: string }
}

interface RecommendedProduct {
  id: string
  name: string
  description: string
  image: string
  price: number
}

export const AIRecommendationSection: React.FC<AIRecommendationSectionProps> = ({ productId }) => {
  const [recommendations, setRecommendations] = useState<RecommendedProduct[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Giả lập AI phân tích và gợi ý sản phẩm tương tự
    setTimeout(() => {
      setRecommendations(fakeAIRecommendations)
      setLoading(false)
    }, 1000)
  }, [productId])

  if (loading)
    return (
      <div className="flex justify-center items-center py-10">
        <p className="text-muted-foreground">Đang phân tích AI...</p>
      </div>
    )

  return (
    <section className="mt-16">
      <div className="flex items-center gap-2 mb-6">
        <Sparkles className="text-orange-400" />
        <h2 className="text-2xl font-semibold text-foreground">Sản phẩm AI gợi ý</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendations.map((item) => (
          <motion.div key={item.id} whileHover={{ scale: 1.03 }} transition={{ duration: 0.2 }}>
            <Link href={`/products/${item.id}`}>
              <Card className="rounded-2xl shadow-md overflow-hidden transition bg-card border-border hover:shadow-lg">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={400}
                  height={400}
                  className="w-full h-56 object-cover"
                />
                <CardContent className="p-4">
                  <p className="text-lg font-medium text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                  <span className="block font-semibold text-primary mt-2">
                    {item.price.toLocaleString()}₫
                  </span>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
