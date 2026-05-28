import { useParams } from 'react-router-native'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'

export default function RepositoryDetail() {
  const { repositoryId } = useParams()
  const { repository, loading } = useRepository(repositoryId)

  if (loading) return <Text>loading repository...</Text>
  if (!repository) return

  return <RepositoryItem item={repository} isDetail />
}
