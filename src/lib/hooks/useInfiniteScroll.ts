import { useEffect, useRef, useState } from 'react'

export function useInfiniteScroll<T>(
  fetchItems: (page: number) => Promise<T[]>,
  options = { pageSize: 10 }
) {
  const [items, setItems] = useState<T[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const observer = useRef<IntersectionObserver>()

  const lastItemRef = (node: HTMLElement | null) => {
    if (loading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1)
      }
    })

    if (node) observer.current.observe(node)
  }

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true)
      try {
        const newItems = await fetchItems(page)
        setItems(prev => [...prev, ...newItems])
        setHasMore(newItems.length === options.pageSize)
      } catch (error) {
        console.error('Error loading items:', error)
      } finally {
        setLoading(false)
      }
    }

    loadItems()
  }, [page, fetchItems, options.pageSize])

  return { items, loading, hasMore, lastItemRef }
}