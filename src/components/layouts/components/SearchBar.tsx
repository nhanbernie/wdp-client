'use client'

import { ReactNode, useEffect, useRef, useState } from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useProducts } from '@/features/categories'
import SearchBarDropdown from './SearchBarDropdown'

export default function SearchBar() {
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement>(null)

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

  return (
    <div className="flex w-full max-w-md mx-auto">
      <div ref={wrapRef} className="relative flex-1">
        <Search
          className={`absolute left-3 top-1/2 -translate-y-1/2 text-[var(--foreground)]`}
          size={20}
        />
        <Input
          id="search"
          placeholder="Searching for materials..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setIsOpen(true)
          }}
          className={`pl-10 rounded-2xl placeholder:text-[0.8rem] focus-visible:ring-[var(--primary)] placeholder:text-[var(--foreground)]`}
        />
        {isOpen && debouncedQuery && (
          <div className="absolute left-0 right-0 top-[calc(100%+10px)]">
            <SearchBarDropdown productList={products} />
          </div>
        )}
      </div>
    </div>
  )
}
