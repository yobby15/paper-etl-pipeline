import { GRAPH_COLORS } from '../../constants/graph'

function LegendDot({ color }) {
  return <span className="inline-block h-2.5 w-2.5 rounded-full" style={{ background: color }} />
}

export default function GraphLegend({ paperCount, authorCount }) {
  return (
    <div className="flex gap-4.5">
      <span className="flex items-center gap-1.5 text-[12.5px] text-text-secondary">
        <LegendDot color={GRAPH_COLORS.paper} />
        Paper ({paperCount})
      </span>
      <span className="flex items-center gap-1.5 text-[12.5px] text-text-secondary">
        <LegendDot color={GRAPH_COLORS.author} />
        Penulis ({authorCount})
      </span>
    </div>
  )
}
