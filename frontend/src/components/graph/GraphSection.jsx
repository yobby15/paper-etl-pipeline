import GraphView from './GraphView'

export default function GraphSection({ onSelectPaper }) {
  return (
    <section className="pt-10 sm:pt-12">
      <div className="mb-6">
        <p className="mb-3 font-mono text-xs uppercase tracking-wide text-cyan">
          Jaringan kolaborasi
        </p>
        <h2 className="mb-2 text-2xl">Siapa menulis dengan siapa</h2>
        <p className="max-w-[520px] text-[13.5px] text-text-secondary">
          Setiap titik ungu adalah paper, titik cyan adalah penulis. Klik sebuah paper untuk
          melihat detailnya.
        </p>
      </div>
      <GraphView onSelectPaper={onSelectPaper} />
    </section>
  )
}
