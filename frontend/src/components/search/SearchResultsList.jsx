import PaperCard from '../paper/PaperCard'

export default function SearchResultsList({ results, query, onSelectPaper }) {
  return (
    <>
      <p className="mb-4.5 text-[13.5px] text-text-secondary">
        {results.length} paper ditemukan untuk{' '}
        <strong className="text-text-primary">&ldquo;{query}&rdquo;</strong>
      </p>
      <div className="flex flex-col gap-3">
        {results.map((paper, i) => (
          <PaperCard
            key={paper.id_artikel || i}
            paper={paper}
            index={i}
            onSelect={onSelectPaper}
          />
        ))}
      </div>
    </>
  )
}
