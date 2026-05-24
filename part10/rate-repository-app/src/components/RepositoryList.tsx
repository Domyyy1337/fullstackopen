import { FlatList, View, StyleSheet } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { type RepositoryResponse } from '../types'

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
})

type RepositoryListContainerProps = {
  repositories: RepositoryResponse | undefined
}

const ItemSeparator = () => <View style={styles.separator} />

function RepositoryListContainer({ repositories }: RepositoryListContainerProps) {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
}

export default function RepositoryList() {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}
