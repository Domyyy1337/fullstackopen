import { useParams } from 'react-router-native'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import { View } from 'react-native'
import ItemSeparator from './ItemSeparator'
import ReviewList from './ReviewList'

export default function RepositoryDetail() {
  const { repositoryId } = useParams()
  const { repository, loading } = useRepository(repositoryId)

  if (loading) return <Text>loading repository...</Text>
  if (!repository) return

  const header = (
    <View>
      <RepositoryItem item={repository} isDetail />
      <ItemSeparator />
    </View>
  )

  return <ReviewList reviewNode={repository.reviews.edges} header={header} />
}
