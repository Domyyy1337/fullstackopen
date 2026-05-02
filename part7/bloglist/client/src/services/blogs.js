import axios from 'axios'
const baseUrl = '/api/blogs'
let token = null

const setToken = newToken => (token = `Bearer ${newToken}`)

const getAll = async () => {
  const request = axios.get(baseUrl)
  const response = await request
  return response.data
}

const create = async newBlog => {
  const config = { headers: { Authorization: token } }
  const request = axios.post(baseUrl, newBlog, config)
  const response = await request
  return response.data
}

const update = async (id, newBlog) => {
  const request = axios.put(`${baseUrl}/${id}`, { ...newBlog, user: newBlog.user.id })
  const response = await request
  return response.data
}

const get = async id => {
  console.log(id)
  const request = axios.get(`${baseUrl}/${id}`)
  const response = await request
  return response.data
}

const remove = async id => {
  const config = { headers: { Authorization: token } }
  const request = axios.delete(`${baseUrl}/${id}`, config)
  const response = await request
  return response.data
}

const addComment = async (id, text) => {
  const request = axios.post(`${baseUrl}/${id}/comments`, { text })
  const response = await request
  return response.data
}

export default { getAll, setToken, create, update, get, remove, addComment }
