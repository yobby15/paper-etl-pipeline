import clsx from 'clsx'

function similarityColorClass(score) {
  if (score >= 0.75) return 'bg-cyan text-cyan'
  if (score >= 0.45) return 'bg-violet text-violet'
  return 'bg-text-tertiary text-text-tertiary'
}

/**
 * Signature visual: a horizontal relevance bar paired with a percentage,
 * used everywhere a paper's match strength needs to be communicated at a glance.
 * Pass `layout="row"` to lay the bar and percentage side-by-side (e.g. on mobile cards).
 */
export default function SimilarityBar({ score = 0, layout = 'column', className = '' }) {
  const pct = Math.max(0, Math.min(1, score)) * 100
  const [bgClass, textClass] = similarityColorClass(score).split(' ')

  return (
    <div
      className={clsx(
        'flex items-center gap-2',
        layout === 'column' ? 'w-[76px] flex-col items-end gap-1.5' : 'w-full flex-row justify-end',
        className
      )}
      title={`Skor kemiripan: ${pct.toFixed(1)}%`}
    >
      <div
        className={clsx(
          'h-1 overflow-hidden rounded-full bg-border',
          layout === 'column' ? 'w-full' : 'max-w-[120px] flex-1'
        )}
      >
        <div
          className={clsx('h-full rounded-full transition-[width] duration-400', bgClass)}
          style={{ width: `${pct}%` }}
        />
      </div>
      <span className={clsx('font-mono text-xs font-medium', textClass)}>{pct.toFixed(0)}%</span>
    </div>
  )
}
