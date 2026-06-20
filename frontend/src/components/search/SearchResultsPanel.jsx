import SearchEmptyState from './SearchEmptyState'
import SearchLoadingState from './SearchLoadingState'
import SearchErrorState from './SearchErrorState'
import SearchNoResults from './SearchNoResults'
import SearchResultsList from './SearchResultsList'

/**
 * Renders the correct state component for the current search status.
 * Keeps App.jsx free of branching logic.
 */
export default function SearchResultsPanel({ status, results, query, apiUrl, onSelectPaper }) {
  if (status === 'idle') return <SearchEmptyState />
  if (status === 'loading') return <SearchLoadingState />
  if (status === 'error') return <SearchErrorState apiUrl={apiUrl} />
  if (status === 'ready' && results?.length === 0) return <SearchNoResults query={query} />
  if (status === 'ready' && results?.length > 0) {
    return <SearchResultsList results={results} query={query} onSelectPaper={onSelectPaper} />
  }
  return null
}
