'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useTransition, useCallback, useRef } from 'react'

const CATEGORIES = ['All', 'Spots & Local Knowledge', 'Tips & Progression', 'Wellness & Moroccan Life', 'Moroccan Trip Tips']

type BlogFiltersProps = {
  currentCategory: string
  currentMonth: string
  currentSearch: string
  availableMonths: string[]
}

export default function BlogFilters({
  currentCategory,
  currentMonth,
  currentSearch,
  availableMonths,
}: BlogFiltersProps) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (!value || value === 'All') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    params.delete('page')
    startTransition(() => {
      router.push(`${pathname}${params.toString() ? `?${params.toString()}` : ''}`)
    })
  }

  const handleSearch = useCallback((value: string) => {
    if (debounceTimer.current) clearTimeout(debounceTimer.current)
    debounceTimer.current = setTimeout(() => {
      updateParam('q', value)
      if (value) window.umami?.track('blog_search', { q: value })
    }, 300)
  }, [searchParams, pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className={`blog-filters${isPending ? ' blog-filters--loading' : ''}`}>
      <div className="blog-filters__search">
        <i className="ti ti-search blog-filters__search-icon" aria-hidden="true" />
        <input
          type="search"
          className="input blog-filters__input"
          placeholder="Search posts…"
          defaultValue={currentSearch}
          onChange={(e) => handleSearch(e.target.value)}
          aria-label="Search blog posts"
        />
      </div>

      <div className="blog-filters__group" role="group" aria-label="Filter by category">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`blog-filter-btn${
              (cat === 'All' && !currentCategory) || cat === currentCategory ? ' is-active' : ''
            }`}
            onClick={() => {
              updateParam('category', cat)
              window.umami?.track('blog_filter_category', { category: cat })
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {availableMonths.length > 0 && (
        <select
          className="select blog-filters__month"
          value={currentMonth || ''}
          onChange={(e) => {
            updateParam('month', e.target.value)
            if (e.target.value) window.umami?.track('blog_filter_month', { month: e.target.value })
          }}
          aria-label="Filter by month"
        >
          <option value="">All months</option>
          {availableMonths.map((m) => (
            <option key={m} value={m}>
              {new Date(m + '-02').toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}
            </option>
          ))}
        </select>
      )}
    </div>
  )
}
