import StateMessage from '../ui/StateMessage'
import MonoBadge from '../ui/MonoBadge'

export default function SearchErrorState({ apiUrl }) {
  return (
    <StateMessage
      tone="error"
      title="Pencarian gagal dijalankan"
      subtitle={
        <>
          Server backend tidak merespons di <MonoBadge>{apiUrl}</MonoBadge>. Pastikan API FastAPI
          sudah berjalan.
        </>
      }
    />
  )
}
