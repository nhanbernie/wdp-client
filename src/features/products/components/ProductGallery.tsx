'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { ZoomIn, ChevronLeft, ChevronRight } from 'lucide-react'

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
  const [isZoomed, setIsZoomed] = useState(false)

  const handlePrevious = () => {
    if (images && images.length > 0) {
      setSelectedImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))
    }
  }

  const handleNext = () => {
    if (images && images.length > 0) {
      setSelectedImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="space-y-6 sticky top-4"
    >
      {/* Main Image - Ultra Premium Design */}
      <div className="relative group">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>

        <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-white via-slate-50 to-white shadow-2xl ring-2 ring-slate-200 group-hover:ring-indigo-300 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.img
              key={selectedImage}
              initial={{ opacity: 0, scale: 1.1, rotate: 5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: -5 }}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              src={images?.[selectedImage]?.url || thumbnail || '/placeholder.svg'}
              alt={name}
              className="w-full h-full object-cover"
            />
          </AnimatePresence>

          {/* Zoom Icon Indicator with Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="absolute top-6 right-6 flex flex-col gap-2"
          >
            <div className="bg-white/95 backdrop-blur-md p-3 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity border border-slate-200">
              <ZoomIn className="h-6 w-6 text-slate-700" />
            </div>
          </motion.div>

          {/* Navigation arrows - Enhanced */}
          {images && images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md hover:bg-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 border border-slate-200 hover:border-indigo-300"
              >
                <ChevronLeft className="h-6 w-6 text-slate-700" />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-6 top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md hover:bg-white p-4 rounded-2xl shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-125 border border-slate-200 hover:border-indigo-300"
              >
                <ChevronRight className="h-6 w-6 text-slate-700" />
              </button>
            </>
          )}

          {/* Image Counter - Enhanced */}
          {images && images.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 backdrop-blur-md text-white px-6 py-3 rounded-2xl text-sm font-black shadow-2xl border border-white/10">
              <span className="text-lg">{selectedImage + 1}</span>
              <span className="text-slate-400">/</span>
              <span className="text-slate-400">{images.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Grid - Ultra Premium */}
      <div className="grid grid-cols-5 gap-4">
        {images?.map((image, index) => (
          <motion.button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 * index, type: 'spring', stiffness: 200 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className={`relative aspect-square rounded-2xl overflow-hidden transition-all duration-300 shadow-lg hover:shadow-2xl ${
              selectedImage === index
                ? 'ring-4 ring-indigo-500 ring-offset-2 shadow-indigo-300 scale-105'
                : 'ring-2 ring-slate-200 hover:ring-indigo-300'
            }`}
          >
            <img
              src={image.url || '/placeholder.svg'}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Active indicator */}
            {selectedImage === index && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="absolute top-2 right-2 bg-indigo-500 text-white p-1.5 rounded-full shadow-lg"
              >
                <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </motion.div>
            )}

            {/* Overlay on hover */}
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity ${
                selectedImage === index ? 'opacity-0' : ''
              }`}
            ></div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  )
}
