import { useEffect, useState } from 'react'
import { type RepositoryResponse } from '../types'

export default function useRepositories() {
  const [repositories, setRepositories] = useState<RepositoryResponse>()
  const [loading, setLoading] = useState(false)

  async function fetchRepositories() {
    setLoading(true)

    const response = await fetch('http://192.168.178.21:5000/api/repositories')
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const json = await response.json()

    setLoading(false)
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setRepositories(json)
  }

  useEffect(() => {
    //eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchRepositories()
  }, [])

  return { repositories, loading, refetch: fetchRepositories }
}
