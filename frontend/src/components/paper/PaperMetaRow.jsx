import MonoBadge from '../ui/MonoBadge'

function MetaItem({ label, children }) {
  return (
    <div className="flex flex-col gap-0.5 text-[13.5px]">
      <span className="text-[11px] uppercase tracking-wide text-text-tertiary">{label}</span>
      <span>{children}</span>
    </div>
  )
}

/**
 * Author / date / article-id summary block shown at the top of the detail panel.
 */
export default function PaperMetaRow({ penulis, date, idArtikel }) {
  return (
    <div className="mb-5 flex flex-col gap-3 rounded-card border border-border bg-surface p-4">
      <MetaItem label="Penulis">
        {penulis && penulis !== '-' ? penulis : 'Tidak diketahui'}
      </MetaItem>
      {date && <MetaItem label="Tanggal Terbit">{date}</MetaItem>}
      <MetaItem label="ID Artikel">
        <MonoBadge>{idArtikel}</MonoBadge>
      </MetaItem>
    </div>
  )
}
