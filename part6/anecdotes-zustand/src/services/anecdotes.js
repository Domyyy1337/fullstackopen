const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed getting anecdotes')

  return await response.json()
}



export default { getAll }
