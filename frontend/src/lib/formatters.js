/**
 * Truncate text to a max length, adding an ellipsis if cut off.
 */
export function truncate(text, max = 220) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max).trim() + '…' : text
}

/**
 * Return a readable author string, falling back when missing.
 */
export function formatAuthors(penulis) {
  if (!penulis || penulis === '-') return 'Penulis tidak diketahui'
  return penulis
}

/**
 * Format an ISO-ish date string into Indonesian locale text.
 * @param {string} tanggal
 * @param {'short'|'long'} style
 */
export function formatDate(tanggal, style = 'short') {
  if (!tanggal) return null
  try {
    return new Date(tanggal).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: style,
      day: 'numeric',
    })
  } catch {
    return tanggal
  }
}

/**
 * Split a comma-separated keyword string into a clean array.
 */
export function parseKeywords(keywords) {
  if (!keywords) return []
  return keywords
    .split(',')
    .map((k) => k.trim())
    .filter(Boolean)
}

/**
 * Pull a similarity/score value off a paper record, whichever field is present.
 */
export function getSimilarityScore(paper) {
  return paper?.similarity ?? paper?.score ?? null
}
