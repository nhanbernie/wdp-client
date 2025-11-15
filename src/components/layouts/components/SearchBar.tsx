'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'
import { useProducts } from '@/features/categories'
import { useTheme } from '@/contexts/ThemeContext'
import { getNeumorphismShadow } from '@/common/constants/neumorphism'
import SearchBarDropdown from './SearchBarDropdown'

export default function SearchBar() {
  const [query, setQuery] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { theme } = useTheme()
  const neumorphismShadow = getNeumorphismShadow(theme)
  const buttonBackgroundColor = theme === 'light' ? '#ffffff' : '#2a2a2a'

  // Sync query with URL params when on search page
  useEffect(() => {
    if (pathname === '/search') {
      const urlQuery = searchParams.get('q') || ''
      setQuery(urlQuery)
    }
  }, [pathname, searchParams])

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
      <div ref={wrapRef} className="relative flex-1">
        <Search
          className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 text-foreground cursor-pointer hover:opacity-70 transition-opacity`}
          size={24}
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
          className={`pl-12 py-6 h-16 text-base rounded-xl border-2 transition-all duration-200 placeholder:text-base`}
          style={{
            boxShadow: neumorphismShadow,
            backgroundColor: buttonBackgroundColor,
            borderColor: theme === 'light' ? 'rgba(0, 0, 0, 0.1)' : 'rgba(255, 255, 255, 0.1)',
          }}
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
