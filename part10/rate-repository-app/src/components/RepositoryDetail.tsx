import { useParams } from 'react-router-native'
import Text from './Text'
import useRepository from '../hooks/useRepository'
import RepositoryItem from './RepositoryItem'
import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  detail: {
    // flex: 1,
  },
})

export default function RepositoryDetail() {
  const { repositoryId } = useParams()
  const { repository, loading } = useRepository(repositoryId)

  if (loading) return <Text>loading repository...</Text>
  if (!repository) return

  return (
    <View style={styles.detail}>
      <RepositoryItem item={repository} isDetail />
    </View>
  )
}
