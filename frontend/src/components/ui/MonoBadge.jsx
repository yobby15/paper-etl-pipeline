/**
 * Small monospace badge for IDs, URLs, and other code-like values.
 */
export default function MonoBadge({ children }) {
  return (
    <span className="rounded-md border border-border bg-bg-elevated px-1.5 py-0.5 font-mono text-xs">
      {children}
    </span>
  )
}
