import { useCallback, useState } from 'react'
import PageShell from '../components/layout/PageShell'
import Topbar from '../components/layout/Topbar'
import SearchSection from '../components/search/SearchSection'
import GraphSection from '../components/graph/GraphSection'
import PaperDetailPanel from '../components/paper/PaperDetailPanel'
import { useSearchPapers } from '../hooks/useSearchPapers'
import { API_BASE_URL } from '../lib/api'

function App() {
  const [activeTab, setActiveTab] = useState('search')
  const [selectedPaper, setSelectedPaper] = useState(null)
  const { query, results, status, search } = useSearchPapers()

  const handleSearch = useCallback((q) => search(q, 10), [search])

  const handleSelectFromGraph = useCallback(
    (paperId) => {
      const found = results?.find((p) => p.id_artikel === paperId)
      setSelectedPaper(found || { id_artikel: paperId, judul: paperId })
    },
    [results]
  )

  return (
    <PageShell>
      <Topbar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="mx-auto w-full max-w-[1180px] px-4 pb-16 sm:px-6">
        {activeTab === 'search' && (
          <SearchSection
            query={query}
            results={results}
            status={status}
            apiUrl={API_BASE_URL}
            onSearch={handleSearch}
            onSelectPaper={setSelectedPaper}
          />
        )}

        {activeTab === 'graph' && <GraphSection onSelectPaper={handleSelectFromGraph} />}
      </main>

      <PaperDetailPanel paper={selectedPaper} onClose={() => setSelectedPaper(null)} />
    </PageShell>
  )
}

export default App
