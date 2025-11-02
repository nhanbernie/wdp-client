'use client'

import React, { useState, useCallback, useEffect } from 'react'
import { Upload, X, Image as ImageIcon, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: File | string
  onChange: (file: File | null) => void
  onUrlChange?: (url: string) => void
  className?: string
  disabled?: boolean
  label?: string
  error?: string
  accept?: string
  maxSize?: number // in MB
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onUrlChange,
  className,
  disabled = false,
  label,
  error,
  accept = 'image/*',
  maxSize = 5,
}) => {
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState<string | null>(null)

  // Update preview when value changes
  useEffect(() => {
    if (value) {
      if (typeof value === 'string') {
        setPreview(value)
      } else if (value instanceof File) {
        // Create preview from File
        const reader = new FileReader()
        reader.onloadend = () => {
          setPreview(reader.result as string)
        }
        reader.readAsDataURL(value)
      }
    } else {
      setPreview(null)
    }
  }, [value])

  const handleFileChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0]
      if (!file) return

      // Validate file size
      if (file.size > maxSize * 1024 * 1024) {
        setUploadError(`Kích thước file không được vượt quá ${maxSize}MB`)
        return
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        setUploadError('Chỉ chấp nhận file ảnh')
        return
      }

      setUploadError(null)

      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(file)

      // Pass file to parent
      onChange(file)
    },
    [onChange, maxSize],
  )

  const handleRemove = useCallback(() => {
    setPreview(null)
    setUploadError(null)
    onChange(null)
    if (onUrlChange) {
      onUrlChange('')
    }
  }, [onChange, onUrlChange])

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      if (disabled) return

      const file = e.dataTransfer.files?.[0]
      if (!file) return

      // Create a fake input event
      const input = document.createElement('input')
      input.type = 'file'
      const dataTransfer = new DataTransfer()
      dataTransfer.items.add(file)
      input.files = dataTransfer.files

      handleFileChange({ target: input } as any)
    },
    [disabled, handleFileChange],
  )

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }, [])

  return (
    <div className={cn('space-y-2', className)}>
      {label && <label className="text-sm font-medium text-foreground">{label}</label>}

      <div
        className={cn(
          'relative border-2 border-dashed rounded-lg transition-colors',
          preview ? 'border-primary' : 'border-border hover:border-primary/50',
          disabled && 'opacity-50 cursor-not-allowed',
          error && 'border-destructive',
        )}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        {preview ? (
          <div className="relative group">
            {preview && (
              <img src={preview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
            )}
            {!disabled && (
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <Button type="button" variant="destructive" size="sm" onClick={handleRemove}>
                  <X className="h-4 w-4 mr-2" />
                  Xóa ảnh
                </Button>
              </div>
            )}
          </div>
        ) : (
          <label
            className={cn(
              'flex flex-col items-center justify-center h-48 cursor-pointer',
              disabled && 'cursor-not-allowed',
            )}
          >
            <input
              type="file"
              accept={accept}
              onChange={handleFileChange}
              disabled={disabled}
              className="hidden"
            />
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              {uploading ? (
                <Loader2 className="h-10 w-10 animate-spin" />
              ) : (
                <ImageIcon className="h-10 w-10" />
              )}
              <div className="text-sm text-center">
                <p className="font-medium">{uploading ? 'Đang tải lên...' : 'Nhấp để chọn ảnh'}</p>
                <p className="text-xs">hoặc kéo thả file vào đây</p>
                <p className="text-xs mt-1">Chấp nhận: JPG, PNG, GIF (Max: {maxSize}MB)</p>
              </div>
            </div>
          </label>
        )}
      </div>

      {(error || uploadError) && <p className="text-sm text-destructive">{error || uploadError}</p>}
    </div>
  )
}
