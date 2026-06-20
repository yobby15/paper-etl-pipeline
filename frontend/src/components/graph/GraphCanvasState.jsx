import Spinner from '../ui/Spinner'

export default function GraphCanvasState({ kind, apiUrl }) {
  if (kind === 'loading') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
        <Spinner size="lg" />
        <p className="text-text-secondary">Menyusun peta kolaborasi…</p>
      </div>
    )
  }

  if (kind === 'error') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-6 text-center">
        <p className="text-[15px] font-semibold text-rose">Graph tidak dapat dimuat</p>
        <p className="max-w-[420px] text-[13.5px] text-text-tertiary">
          Pastikan server backend berjalan di {apiUrl}.
        </p>
      </div>
    )
  }

  if (kind === 'empty') {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 p-6 text-center">
        <p className="text-[15px] font-semibold text-text-primary">Belum ada data relasi</p>
        <p className="max-w-[420px] text-[13.5px] text-text-tertiary">
          Jalankan pipeline ETL untuk memuat data penulis dan paper.
        </p>
      </div>
    )
  }

  return null
}
