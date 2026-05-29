type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath: string
}

export default function Pagination({ currentPage, totalPages, basePath }: PaginationProps) {
  if (totalPages <= 1) return null

  function pageUrl(page: number) {
    const separator = basePath.includes('?') ? '&' : '?'
    return `${basePath}${separator}page=${page}`
  }

  const pages: (number | '...')[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - currentPage) <= 2) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== '...') {
      pages.push('...')
    }
  }

  return (
    <nav className="pagination" aria-label="Blog pagination">
      {currentPage > 1 && (
        <a href={pageUrl(currentPage - 1)} className="pagination__prev" aria-label="Previous page">
          ←
        </a>
      )}
      {pages.map((page, i) =>
        page === '...' ? (
          <span key={`ellipsis-${i}`} className="pagination__ellipsis">…</span>
        ) : (
          <a
            key={page}
            href={pageUrl(page)}
            className={`pagination__page${page === currentPage ? ' is-active' : ''}`}
            aria-label={`Page ${page}`}
            aria-current={page === currentPage ? 'page' : undefined}
          >
            {page}
          </a>
        )
      )}
      {currentPage < totalPages && (
        <a href={pageUrl(currentPage + 1)} className="pagination__next" aria-label="Next page">
          →
        </a>
      )}
    </nav>
  )
}
