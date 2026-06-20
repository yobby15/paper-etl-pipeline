import StateMessage from '../ui/StateMessage'

export default function SearchNoResults({ query }) {
  return (
    <StateMessage
      title={`Tidak ada hasil untuk "${query}"`}
      subtitle="Coba gunakan istilah yang lebih umum atau ubah susunan kata kuncinya."
    />
  )
}
