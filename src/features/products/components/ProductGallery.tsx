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
      className="space-y-4 sticky top-4"
    >
      {/* Main Image */}
      <div className="relative group">
        <div 
          className="relative aspect-square rounded-2xl overflow-hidden shadow-lg transition-all duration-300"
          style={{ 
            backgroundColor: colors.cardBackground,
          }}
        >
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

          {/* Zoom Icon Indicator */}
          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <div 
              className="p-2 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ 
                backgroundColor: colors.cardBackground,
              }}
            >
              <ZoomIn className="h-4 w-4" style={{ color: colors.text }} />
            </div>
          </div>

          {/* Navigation arrows */}
          {images && images.length > 1 && (
            <>
              <button
                onClick={handlePrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: colors.cardBackground,
                }}
              >
                <ChevronLeft className="h-5 w-5" style={{ color: colors.text }} />
              </button>
              <button
                onClick={handleNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200 hover:scale-110"
                style={{ 
                  backgroundColor: colors.cardBackground,
                }}
              >
                <ChevronRight className="h-5 w-5" style={{ color: colors.text }} />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images && images.length > 1 && (
            <div 
              className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold shadow-lg"
              style={{ 
                backgroundColor: colors.text,
                color: colors.background,
              }}
            >
              <span>{selectedImage + 1}</span>
              <span>/</span>
              <span>{images.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-5 gap-3">
        {images?.map((image, index) => (
          <button
            key={image.id}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-square rounded-xl overflow-hidden transition-all duration-200 shadow-sm hover:shadow-md"
            style={{
              backgroundColor: colors.cardBackground,
              boxShadow: selectedImage === index 
                ? `0 0 0 2px ${colors.accent}, 0 0 0 4px ${colors.background}`
                : undefined,
            }}
            onMouseEnter={(e) => {
              if (selectedImage !== index) {
                e.currentTarget.style.boxShadow = `0 0 0 2px ${colors.accent}40`
              }
            }}
            onMouseLeave={(e) => {
              if (selectedImage !== index) {
                e.currentTarget.style.boxShadow = selectedImage === index 
                  ? `0 0 0 2px ${colors.accent}, 0 0 0 4px ${colors.background}`
                  : ''
              }
            }}
          >
            <img
              src={image.url || '/placeholder.svg'}
              alt={`${name} ${index + 1}`}
              className="w-full h-full object-cover"
            />

            {/* Active indicator */}
            {selectedImage === index && (
              <div
                className="absolute top-1.5 right-1.5 text-white p-1 rounded-full shadow-md"
                style={{ backgroundColor: colors.accent }}
              >
                <svg className="h-2.5 w-2.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </button>
        ))}
      </div>
    </motion.div>
  )
}
