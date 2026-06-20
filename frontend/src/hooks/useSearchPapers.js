import { useCallback, useState } from 'react'
import { searchPapers } from '../lib/api'

/**
 * Encapsulates semantic search state: the query, results, and request status.
 * status: 'idle' | 'loading' | 'ready' | 'error'
 */
export function useSearchPapers() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(null)
  const [status, setStatus] = useState('idle')

  const search = useCallback((q, limit = 10) => {
    setQuery(q)
    setStatus('loading')
    searchPapers(q, limit)
      .then((data) => {
        setResults(Array.isArray(data) ? data : [])
        setStatus('ready')
      })
      .catch(() => {
        setResults(null)
        setStatus('error')
      })
  }, [])

  return { query, results, status, search }
}
