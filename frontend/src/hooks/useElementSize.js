import { useEffect, useRef, useState } from 'react'

/**
 * Tracks the rendered width/height of a container element, updating on resize.
 * Returns a ref to attach to the container and the latest measured dimensions.
 */
export function useElementSize(initial = { width: 800, height: 560 }) {
  const ref = useRef(null)
  const [size, setSize] = useState(initial)

  useEffect(() => {
    function measure() {
      if (ref.current) {
        const rect = ref.current.getBoundingClientRect()
        setSize({ width: rect.width, height: rect.height })
      }
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  return { ref, size }
}
