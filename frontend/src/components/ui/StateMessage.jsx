import clsx from 'clsx'

/**
 * Centered title + subtext block used for empty, error, and no-results states
 * across the app. Pass `icon` for a decorative SVG above the title.
 */
export default function StateMessage({ icon, title, subtitle, tone = 'default' }) {
  return (
    <div className="text-center px-6 py-14 text-text-secondary">
      {icon && <div className="mb-4 flex justify-center text-text-tertiary">{icon}</div>}
      <p
        className={clsx(
          'mb-1.5 text-[15px] font-semibold',
          tone === 'error' ? 'text-rose' : 'text-text-primary'
        )}
      >
        {title}
      </p>
      {subtitle && (
        <p className="mx-auto max-w-[420px] text-[13.5px] leading-relaxed text-text-tertiary">
          {subtitle}
        </p>
      )}
    </div>
  )
}
