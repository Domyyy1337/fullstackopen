const baseUrl = 'http://localhost:3001/anecdotes'

export async function getAnecdotes() {
  const response = await fetch(baseUrl)
  if (!response.ok) throw new Error('Failed to fetch anecdotes')

  return await response.json()
}

export async function addAnecdote(anecdote) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(anecdote),
  }

  const response = await fetch(baseUrl, options)

  return await response.json()
}
