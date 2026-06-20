export default function BrandMark() {
  return (
    <div className="flex items-center gap-3">
      <span
        aria-hidden="true"
        className="grid h-9.5 w-9.5 flex-shrink-0 place-items-center rounded-lg bg-gradient-to-r from-violet to-cyan text-[22px] text-[#06080d]"
      >
        ⟡
      </span>
      <div className="flex flex-col leading-snug">
        <span className="font-display text-lg font-bold tracking-tight">Pustaka</span>
        <span className="hidden text-xs text-text-tertiary sm:inline">
          Temu Kembali Paper Cerdas · UNESA
        </span>
      </div>
    </div>
  )
}
