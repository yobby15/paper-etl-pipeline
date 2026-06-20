import BrandMark from './BrandMark'
import TabNav from './TabNav'

export default function Topbar({ activeTab, onTabChange }) {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-6 border-b border-border bg-bg/85 px-4 py-5 backdrop-blur-md sm:px-8">
      <BrandMark />
      <TabNav activeTab={activeTab} onChange={onTabChange} />
    </header>
  )
}
