import { useEffect } from 'react'
import SimilarityBar from './SimilarityBar'
import PaperMetaRow from './PaperMetaRow'
import KeywordChip from './KeywordChip'
import { formatDate, parseKeywords, getSimilarityScore } from '../../lib/formatters'

export default function PaperDetailPanel({ paper, onClose }) {
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  if (!paper) return null

  const score = getSimilarityScore(paper)
  const date = formatDate(paper.tanggal, 'long')
  const keywords = parseKeywords(paper.keywords)

  return (
    <>
      <div
        className="fixed inset-0 z-30 animate-[fadeIn_0.2s_ease] bg-black/60 backdrop-blur-[2px]"
        onClick={onClose}
      />
      <aside
        role="dialog"
        aria-label="Detail paper"
        className="fixed right-0 top-0 z-40 h-svh w-full max-w-[480px] animate-[slideIn_0.25s_ease] overflow-y-auto border-l border-outline bg-bg-elevated p-7 pb-10 sm:w-[480px]"
      >
        <button
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full border border-border bg-surface text-text-secondary transition hover:bg-surface-hover hover:text-text-primary"
        >
          ✕
        </button>

        <div className="mt-2 mb-3 font-mono text-[11.5px] uppercase tracking-wide text-violet">
          Detail Paper
        </div>
        <h2 className="mb-5 pr-8 text-xl font-semibold leading-snug">
          {paper.judul || paper.judul_bersih}
        </h2>

        <PaperMetaRow penulis={paper.penulis} date={date} idArtikel={paper.id_artikel} />

        {score !== null && (
          <div className="mb-5 flex items-center justify-between rounded-card border border-violet-border bg-violet-dim px-4 py-3.5">
            <span className="text-[11px] uppercase tracking-wide text-text-secondary">
              Kemiripan dengan kueri
            </span>
            <SimilarityBar score={score} className="w-[100px]" />
          </div>
        )}

        {keywords.length > 0 && (
          <div className="mb-6 flex flex-wrap gap-2">
            {keywords.map((kw) => (
              <KeywordChip key={kw}>{kw}</KeywordChip>
            ))}
          </div>
        )}

        <div>
          <h4 className="mb-2.5 text-[13px] uppercase tracking-wide text-text-tertiary">
            Abstrak
          </h4>
          <p className="text-sm leading-relaxed text-text-secondary">
            {paper.abstrak_bersih || paper.abstrak || 'Abstrak tidak tersedia.'}
          </p>
        </div>

        {paper.link_pdf && (
          <a
            href={paper.link_pdf}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex items-center gap-2 rounded-card bg-gradient-to-r from-violet to-cyan px-5 py-3 text-[13.5px] font-semibold text-[#06080d] transition hover:opacity-90"
          >
            Baca paper lengkap (PDF)
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path
                d="M7 17L17 7M17 7H9M17 7V15"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        )}
      </aside>
    </>
  )
}
