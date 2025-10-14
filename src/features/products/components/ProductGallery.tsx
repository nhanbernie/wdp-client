'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface ProductGalleryProps {
  images?: { id: string; url: string }[]
  thumbnail?: string
  name: string
  colors: any
}

export const ProductGallery: React.FC<ProductGalleryProps> = ({
  images,
  thumbnail,
  name,
  colors,
}) => {
  const [selectedImage, setSelectedImage] = useState(0)

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-4"
    >
      <div className="aspect-square rounded-lg overflow-hidden shadow-lg bg-card border border-border">
        <img
          src={images?.[selectedImage]?.url || thumbnail || '/placeholder.svg'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="grid grid-cols-4 gap-2">
        {images?.map((image, index) => (
          <motion.button
            whileHover={{ scale: 1.05 }}
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className={`aspect-square rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImage === index ? 'border-primary' : 'border-transparent'
            }`}
          >
            <img
              src={image.url || '/placeholder.svg'}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
