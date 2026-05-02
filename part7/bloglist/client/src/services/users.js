import axios from 'axios'

const baseUrl = '/api/users'

async function getAll() {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

async function get(id) {
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

export default { getAll, get }
