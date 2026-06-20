import { useCallback, useMemo, useRef, useState } from 'react'
import GraphToolbar from './GraphToolbar'
import GraphCanvas from './GraphCanvas'
import GraphCanvasState from './GraphCanvasState'
import { useGraphData } from '../../hooks/useGraphData'
import { useElementSize } from '../../hooks/useElementSize'
import { API_BASE_URL } from '../../lib/api'

export default function GraphView({ onSelectPaper }) {
  const [limit, setLimit] = useState(50)
  const { data, status, markLoading } = useGraphData(limit)
  const { ref: containerRef, size } = useElementSize()
  const fgRef = useRef(null)

  function handleLimitChange(e) {
    markLoading()
    setLimit(Number(e.target.value))
  }

  const graphData = useMemo(() => {
    if (!data) return { nodes: [], links: [] }
    return {
      nodes: data.nodes.map((n) => ({ ...n })),
      links: data.edges.map((e) => ({ source: e.source, target: e.target })),
    }
  }, [data])

  const handleNodeClick = useCallback(
    (node) => {
      if (node.group === 'paper' && onSelectPaper) onSelectPaper(node.id)
    },
    [onSelectPaper]
  )

  const paperCount = data?.nodes.filter((n) => n.group === 'paper').length ?? 0
  const authorCount = data?.nodes.filter((n) => n.group === 'author').length ?? 0
  const isEmpty = status === 'ready' && graphData.nodes.length === 0

  return (
    <div className="overflow-hidden rounded-panel border border-border bg-bg-elevated">
      <GraphToolbar
        paperCount={paperCount}
        authorCount={authorCount}
        limit={limit}
        onLimitChange={handleLimitChange}
      />

      <div ref={containerRef} className="relative h-[440px] w-full sm:h-[560px]">
        {status === 'loading' && <GraphCanvasState kind="loading" />}
        {status === 'error' && <GraphCanvasState kind="error" apiUrl={API_BASE_URL} />}
        {isEmpty && <GraphCanvasState kind="empty" />}

        {status === 'ready' && graphData.nodes.length > 0 && (
          <GraphCanvas
            graphData={graphData}
            width={size.width}
            height={size.height}
            onNodeClick={handleNodeClick}
            fgRef={fgRef}
          />
        )}
      </div>
    </div>
  )
}
