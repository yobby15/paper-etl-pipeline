/**
 * Small spinning loader. Use `tone="dark"` on light/gradient buttons.
 */
export default function Spinner({ size = 'sm', tone = 'light' }) {
  const sizeClass = size === 'lg' ? 'w-7 h-7 border-[3px]' : 'w-3.5 h-3.5 border-2'
  const toneClass =
    tone === 'dark'
      ? 'border-[#06080d]/35 border-t-[#06080d]'
      : 'border-outline border-t-violet'

  return (
    <span
      className={`inline-block rounded-full animate-spin ${sizeClass} ${toneClass}`}
      aria-hidden="true"
    />
  )
}
