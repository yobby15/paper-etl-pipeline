import ForceGraph2D from 'react-force-graph-2d'
import { GRAPH_COLORS } from '../../constants/graph'

function drawNodeLabel(node, ctx, globalScale) {
  if (globalScale < 1.6) return
  const label = node.label?.length > 22 ? node.label.slice(0, 22) + '…' : node.label
  ctx.font = '3px Inter, sans-serif'
  ctx.fillStyle = 'rgba(232, 234, 237, 0.85)'
  ctx.textAlign = 'center'
  ctx.fillText(label, node.x, node.y + 7)
}

export default function GraphCanvas({ graphData, width, height, onNodeClick, fgRef }) {
  return (
    <ForceGraph2D
      ref={fgRef}
      graphData={graphData}
      width={width}
      height={height}
      backgroundColor="transparent"
      nodeLabel={(n) => n.label}
      nodeColor={(n) => GRAPH_COLORS[n.group] || '#586173'}
      nodeRelSize={4}
      linkColor={() => 'rgba(139, 147, 163, 0.25)'}
      linkWidth={1}
      onNodeClick={onNodeClick}
      nodeCanvasObjectMode={() => 'after'}
      nodeCanvasObject={drawNodeLabel}
      cooldownTicks={100}
    />
  )
}
