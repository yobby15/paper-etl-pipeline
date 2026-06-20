import clsx from 'clsx'
import { TABS } from '../../constants/tabs'

export default function TabNav({ activeTab, onChange }) {
  return (
    <nav role="tablist" className="flex gap-1 rounded-xl border border-border bg-surface p-1">
      {TABS.map((tab) => (
        <button
          key={tab.id}
          role="tab"
          aria-selected={activeTab === tab.id}
          onClick={() => onChange(tab.id)}
          className={clsx(
            'whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium transition sm:px-4 sm:text-[13.5px]',
            activeTab === tab.id
              ? 'bg-violet-dim text-text-primary shadow-[inset_0_0_0_1px_var(--color-violet-border)]'
              : 'text-text-secondary hover:text-text-primary'
          )}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  )
}
