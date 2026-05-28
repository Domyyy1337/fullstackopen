import { useParams } from 'react-router-native'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import { FlatList } from 'react-native'
import ItemSeparator from './ItemSeparator'
import ReviewItem from './ReviewItem'


export default function RepositoryDetail() {
  const { repositoryId } = useParams()
  const { repository, loading } = useRepository(repositoryId)

  if (loading) return <Text>loading repository...</Text>
  if (!repository) return
  
  return (
    <FlatList
      data={repository.reviews.edges}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item.node} />}
      keyExtractor={edge => edge.node.id}
      ListHeaderComponent={() => (
        <>
          <RepositoryItem item={repository} isDetail />
          <ItemSeparator />
        </>
      )}
    />
  )
}
