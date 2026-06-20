import StateMessage from '../ui/StateMessage'

export default function SearchEmptyState() {
  return (
    <StateMessage
      icon={
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.5" />
          <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      }
      title="Mulai pencarian semantik"
      subtitle="Ketik topik, metode, atau gagasan penelitian — sistem akan mencocokkan berdasarkan makna, bukan hanya kata kunci yang sama persis."
    />
  )
}
