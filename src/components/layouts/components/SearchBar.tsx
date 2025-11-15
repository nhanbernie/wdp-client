'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useProducts } from '@/features/categories'
import SearchBarDropdown from './SearchBarDropdown'

export default function SearchBar() {
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { products, loading } = useProducts(
    debouncedQuery
      ? {
          q: debouncedQuery,
          page: 1,
          limit: 5,
        }
      : undefined,
  )

  useEffect(() => {
    const handleSetTimeout = setTimeout(() => {
      setDebouncedQuery(query)
    }, 400)

    return () => clearTimeout(handleSetTimeout)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      setIsOpen(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="flex w-full">
      <div ref={wrapRef} className="relative flex-1 ">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)] cursor-pointer hover:opacity-70 transition-opacity`}
          size={20}
          onClick={handleSearch}
        />
        <Input
          id="search"
          placeholder="Searching for materials..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          onKeyPress={handleKeyPress}
          className={`pl-10 bg-[var(--card)] shadow-none border-gray-300 hover:border-gray-500 rounded-2xl placeholder:text-[0.8rem]  focus-visible:border-[var(--primary)] focus-visible:ring-2 focus-visible:ring-gray-300/20 placeholder:text-[var(--neutral-medium)]`}
        />
        {isOpen && debouncedQuery && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)] z-[100]">
            <SearchBarDropdown
              productList={products}
              loading={loading}
              query={query}
              onClose={() => setIsOpen(false)}
            />
          </div>
        )}
      </div>
    </div>
  )
}
