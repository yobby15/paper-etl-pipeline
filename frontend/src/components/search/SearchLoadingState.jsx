import SkeletonCard from '../ui/SkeletonCard'

export default function SearchLoadingState() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}
