'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Upload, X, Image as ImageIcon, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface MultipleImageUploadProps {
  values?: (File | string)[]
  onChange: (files: File[]) => void
  onUrlsChange?: (urls: string[]) => void
  className?: string
  disabled?: boolean
  label?: string
  error?: string
  accept?: string
  maxSize?: number // in MB
  maxFiles?: number
}

export const MultipleImageUpload: React.FC<MultipleImageUploadProps> = ({
  values = [],
  onChange,
  onUrlsChange,
  className,
  disabled = false,
  label,
  error,
  accept = 'image/*',
  maxSize = 5,
  maxFiles = 10,
}) => {
  const [previews, setPreviews] = useState<string[]>([])
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Update previews when values change
  useEffect(() => {
    if (values && values.length > 0) {
      const newPreviews: string[] = []
      let processedCount = 0

      values.forEach((value, index) => {
        if (typeof value === 'string') {
          newPreviews[index] = value
          processedCount++
          if (processedCount === values.length) {
            setPreviews(newPreviews)
          }
        } else if (value instanceof File) {
          const reader = new FileReader()
          reader.onloadend = () => {
            newPreviews[index] = reader.result as string
            processedCount++
            if (processedCount === values.length) {
              setPreviews([...newPreviews])
            }
          }
          reader.readAsDataURL(value)
        }
      })

      // If all are strings, set immediately
      if (processedCount === values.length) {
        setPreviews(newPreviews)
      }
    } else {
      setPreviews([])
    }
  }, [values])

  const handleFilesChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(e.target.files || [])
      if (!newFiles.length) return

      // Get current files from values
      const currentFiles = (values || []).filter((v): v is File => v instanceof File)

      // Validate total number of files
      if (currentFiles.length + newFiles.length > maxFiles) {
        setUploadError(`Chỉ được upload tối đa ${maxFiles} ảnh`)
        return
      }

      // Validate each file
      const validFiles: File[] = []

      for (const file of newFiles) {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          setUploadError(`File ${file.name} vượt quá ${maxSize}MB`)
          continue
        }

        // Validate file type
        if (!file.type.startsWith('image/')) {
          setUploadError(`File ${file.name} không phải là ảnh`)
          continue
        }

        validFiles.push(file)
      }

      if (validFiles.length > 0) {
        setUploadError(null)
        const updatedFiles = [...currentFiles, ...validFiles]
        onChange(updatedFiles)
      }
    },
    [values, onChange, maxSize, maxFiles],
  )

  const handleRemove = useCallback(
    (index: number) => {
      const currentFiles = (values || []).filter((v): v is File => v instanceof File)
      const newFiles = currentFiles.filter((_, i) => i !== index)
      onChange(newFiles)

      if (onUrlsChange) {
        const urls = previews.filter((p, i) => i !== index && p.startsWith('http'))
        onUrlsChange(urls)
      }
    },
    [values, previews, onChange, onUrlsChange],
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (disabled) return

      const droppedFiles = Array.from(e.dataTransfer.files)
      if (!droppedFiles.length) return

      // Create a fake input event
      const input = document.createElement('input')
      input.type = 'file'
      const dataTransfer = new DataTransfer()
      droppedFiles.forEach((file) => dataTransfer.items.add(file))
      input.files = dataTransfer.files

      handleFilesChange({ target: input } as any)
    },
    [disabled, handleFilesChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Existing images */}
        {previews.map((preview, index) => (
          <div key={index} className="relative group">
            <div className="aspect-square border-2 border-border rounded-lg overflow-hidden bg-muted">
              {preview ? (
                <img
                  src={preview}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}
            </div>
            {!disabled && (
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity h-8 w-8"
                onClick={() => handleRemove(index)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}

        {/* Add new image button */}
        {!disabled && previews.length < maxFiles && (
          <div
            className={cn(
              'aspect-square border-2 border-dashed rounded-lg transition-colors cursor-pointer',
              'hover:border-primary/50 border-border',
              error && 'border-destructive',
            )}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <label className="flex flex-col items-center justify-center h-full cursor-pointer">
              <input
                type="file"
                accept={accept}
                multiple
                onChange={handleFilesChange}
                disabled={disabled}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2 text-muted-foreground">
                <Plus className="h-8 w-8" />
                <p className="text-xs text-center px-2">Thêm ảnh</p>
              </div>
            </label>
          </div>
        )}
      </div>

      <p className="text-xs text-muted-foreground">
        Đã chọn {previews.length}/{maxFiles} ảnh. Kích thước tối đa: {maxSize}MB mỗi ảnh.
      </p>

      {(error || uploadError) && <p className="text-sm text-destructive">{error || uploadError}</p>}
    </div>
  )
}
