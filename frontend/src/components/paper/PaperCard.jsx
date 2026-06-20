import SimilarityBar from './SimilarityBar'
import { truncate, formatAuthors, formatDate, getSimilarityScore } from '../../lib/formatters'

export default function PaperCard({ paper, onSelect, index }) {
  const score = getSimilarityScore(paper)
  const date = formatDate(paper.tanggal, 'short')

  return (
    <article
      onClick={() => onSelect(paper)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') onSelect(paper)
      }}
      className="flex cursor-pointer flex-wrap items-start gap-3 rounded-card border border-border bg-surface p-4 text-left transition hover:-translate-y-px hover:border-violet-border hover:bg-surface-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-violet sm:flex-nowrap sm:gap-4 sm:p-5"
    >
      <div className="w-[22px] flex-shrink-0 pt-0.5 font-mono text-xs text-text-tertiary">
        {String(index + 1).padStart(2, '0')}
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="mb-1.5 text-base font-semibold leading-snug">
          {paper.judul || paper.judul_bersih}
        </h3>
        <p className="mb-2.5 flex flex-wrap items-center gap-1.5 text-xs text-text-tertiary">
          <span className="text-text-secondary">{formatAuthors(paper.penulis)}</span>
          {date && <span className="opacity-60">·</span>}
          {date && <span>{date}</span>}
        </p>
        <p className="text-[13.5px] leading-relaxed text-text-secondary">
          {truncate(paper.abstrak_bersih || paper.abstrak)}
        </p>
      </div>

      {score !== null && (
        <>
          <div className="w-full flex-shrink-0 pl-[34px] sm:hidden">
            <SimilarityBar score={score} layout="row" />
          </div>
          <div className="hidden flex-shrink-0 pt-1 sm:block">
            <SimilarityBar score={score} layout="column" />
          </div>
        </>
      )}
    </article>
  )
}
