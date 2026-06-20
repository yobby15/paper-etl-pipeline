import { useEffect, useState } from 'react'
import { getGraphData } from '../lib/api'

/**
 * Fetches and tracks the author-paper collaboration graph for a given limit.
 * status: 'loading' | 'ready' | 'error'
 */
export function useGraphData(limit) {
  const [data, setData] = useState(null)
  const [status, setStatus] = useState('loading')

  useEffect(() => {
    let cancelled = false
    getGraphData(limit)
      .then((res) => {
        if (cancelled) return
        setData(res)
        setStatus('ready')
      })
      .catch(() => {
        if (cancelled) return
        setStatus('error')
      })
    return () => {
      cancelled = true
    }
  }, [limit])

  function markLoading() {
    setStatus('loading')
  }

  return { data, status, markLoading }
}
