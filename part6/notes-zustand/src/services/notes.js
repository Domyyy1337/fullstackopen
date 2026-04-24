const baseUrl = 'http://localhost:3001/notes'

async function getAll() {
  const response = await fetch(baseUrl)

  if (!response.ok) throw new Error('Failed to fetch notes')

  return await response.json()
}

async function createNew(content) {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'applications/json' },
    body: JSON.stringify({ content, important: false }),
  }

  const response = await fetch(baseUrl, options)

  if (!response.ok) throw new Error('Failed to create note')

  return await response.json()
}

async function update(id, note) {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'applications/json' },
    body: JSON.stringify(note),
  }

  const response = await fetch(`${baseUrl}/${id}`, options)

  if (!response.ok) throw new Error('Failed to update note')

  return await response.json()
}

export default { getAll, createNew, update }
