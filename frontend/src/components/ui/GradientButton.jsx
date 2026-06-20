import clsx from 'clsx'
import Spinner from './Spinner'

/**
 * The signature violet→cyan gradient button used for primary actions
 * (search submit, PDF link, etc).
 */
export default function GradientButton({
  children,
  loading = false,
  disabled = false,
  type = 'button',
  className,
  ...rest
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={clsx(
        'inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3',
        'bg-gradient-to-r from-violet to-cyan font-semibold text-sm text-[#06080d]',
        'transition-opacity active:scale-[0.97]',
        'hover:opacity-90 disabled:opacity-45 disabled:cursor-not-allowed',
        className
      )}
      {...rest}
    >
      {loading ? <Spinner tone="dark" /> : children}
    </button>
  )
}
