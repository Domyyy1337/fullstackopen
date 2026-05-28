import { FlatList } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import { type RepositoriesResponse } from '../types'
import ItemSeparator from './ItemSeparator'

type RepositoryListContainerProps = {
  repositories: RepositoriesResponse | undefined
}

export function RepositoryListContainer({ repositories }: RepositoryListContainerProps) {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      keyExtractor={item => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
}

export default function RepositoryList() {
  const { repositories } = useRepositories()

  return <RepositoryListContainer repositories={repositories} />
}
