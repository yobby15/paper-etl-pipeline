function SkeletonLine({ className }) {
  return (
    <div
      className={`mb-2.5 h-3 rounded-md bg-gradient-to-r from-border via-outline to-border animate-shimmer ${className}`}
    />
  )
}

/**
 * Placeholder card mimicking the PaperCard layout while results are loading.
 */
export default function SkeletonCard() {
  return (
    <div className="rounded-card border border-border bg-surface p-5">
      <SkeletonLine className="h-4 w-[65%]" />
      <SkeletonLine className="w-[35%]" />
      <SkeletonLine className="w-full" />
      <SkeletonLine className="mb-0 w-[80%]" />
    </div>
  )
}
