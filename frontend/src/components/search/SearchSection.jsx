import SearchHero from './SearchHero'
import SearchResultsPanel from './SearchResultsPanel'

export default function SearchSection({
  query,
  results,
  status,
  apiUrl,
  onSearch,
  onSelectPaper,
}) {
  return (
    <section>
      <SearchHero onSearch={onSearch} loading={status === 'loading'} defaultValue={query} />
      <div className="mx-auto max-w-[760px] pt-2">
        <SearchResultsPanel
          status={status}
          results={results}
          query={query}
          apiUrl={apiUrl}
          onSelectPaper={onSelectPaper}
        />
      </div>
    </section>
  )
}
