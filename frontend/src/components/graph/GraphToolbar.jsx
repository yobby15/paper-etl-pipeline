import GraphLegend from './GraphLegend'
import { GRAPH_LIMIT_OPTIONS } from '../../constants/graph'

export default function GraphToolbar({ paperCount, authorCount, limit, onLimitChange }) {
  return (
    <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
      <GraphLegend paperCount={paperCount} authorCount={authorCount} />
      <label className="flex items-center gap-2 text-[12.5px] text-text-tertiary">
        Muat
        <select
          value={limit}
          onChange={onLimitChange}
          className="rounded-lg border border-border bg-surface px-2.5 py-1.5 text-[12.5px] text-text-primary"
        >
          {GRAPH_LIMIT_OPTIONS.map((opt) => (
            <option key={opt} value={opt}>
              {opt} paper
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
