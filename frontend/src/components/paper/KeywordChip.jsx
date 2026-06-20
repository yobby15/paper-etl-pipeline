/**
 * Small pill used to display a single extracted keyword/topic tag.
 */
export default function KeywordChip({ children }) {
  return (
    <span className="rounded-full border border-cyan/30 bg-cyan-dim px-2.5 py-1 text-xs text-cyan">
      {children}
    </span>
  )
}
