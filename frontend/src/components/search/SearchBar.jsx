import { useState } from 'react'
import GradientButton from '../ui/GradientButton'

export default function SearchBar({ onSearch, loading, defaultValue = '' }) {
  const [value, setValue] = useState(defaultValue)

  function handleSubmit(e) {
    e.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSearch(trimmed)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-[620px] flex-wrap items-center gap-2.5 rounded-panel border border-outline bg-surface p-1.5 pl-5 transition focus-within:border-violet-border focus-within:shadow-glow sm:flex-nowrap sm:rounded-[20px] sm:p-1.5 sm:pl-5"
    >
      <svg
        className="flex-shrink-0 text-text-tertiary"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
      >
        <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
        <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Cari topik, metode, atau gagasan penelitian…"
        aria-label="Cari paper"
        className="order-1 w-full flex-1 bg-transparent py-3 text-[15px] text-text-primary outline-none placeholder:text-text-tertiary sm:order-none sm:w-auto"
      />
      <GradientButton
        type="submit"
        loading={loading}
        disabled={!value.trim()}
        className="order-2 w-full min-w-[84px] sm:order-none sm:w-auto"
      >
        Cari
      </GradientButton>
    </form>
  )
}
