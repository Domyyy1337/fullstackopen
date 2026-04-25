const baseUrl = 'http://localhost:3001/anecdotes'

async function getAll() {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed getting anecdotes')

  return await response.json()
}

async function create(content) {
  const anecdote = {
    content: content,
    id: crypto.randomUUID(),
    votes: 0,
  }
  const options = {
    method: 'POST',
    body: JSON.stringify(anecdote),
    headers: { 'Content-Type': 'application/json' },
  }
  const response = await fetch(baseUrl, options)

  if (!response.ok) throw new Error('Failed creating anecdote')

  return await response.json()
}

async function update(id, anecdote) {
  const options = {
    method: 'PUT',
    body: JSON.stringify(anecdote),
    headers: { 'Content-Type': 'applications/json' },
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) throw new Error('Failed updating anecdote')

  return await response.json()
}

export default { getAll, create, update }
