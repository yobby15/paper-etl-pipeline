import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const client = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
})

/**
 * Mencari paper berdasarkan kemiripan makna (semantic search).
 * @param {string} query - kueri pencarian dalam bahasa natural
 * @param {number} limit - jumlah maksimum hasil
 */
export async function searchPapers(query, limit = 10) {
  const { data } = await client.get('/search/semantic', {
    params: { query, limit },
  })
  return data
}

/**
 * Mengambil data graph relasi penulis-paper.
 * @param {number} limit - jumlah paper yang dimuat ke dalam graph
 */
export async function getGraphData(limit = 50) {
  const { data } = await client.get('/papers/graph', {
    params: { limit },
  })
  return data
}

export { API_BASE_URL }
