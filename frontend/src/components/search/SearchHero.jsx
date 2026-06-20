import SearchBar from './SearchBar'

export default function SearchHero({ onSearch, loading, defaultValue }) {
  return (
    <div className="mx-auto max-w-[720px] px-2 pb-8 pt-12 text-center sm:pb-10 sm:pt-16">
      <p className="mb-3 font-mono text-xs uppercase tracking-wide text-cyan">
        Pencarian berbasis makna, bukan kata kunci
      </p>
      <h1 className="mb-8 text-[26px] font-semibold leading-tight tracking-tight sm:text-[38px]">
        Temukan penelitian yang relevan,
        <br />
        walau istilahnya berbeda.
      </h1>
      <SearchBar onSearch={onSearch} loading={loading} defaultValue={defaultValue} />
    </div>
  )
}
