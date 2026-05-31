import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import type { SortingOptions, RepositoriesResponse } from '../types'
import ItemSeparator from './ItemSeparator'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'

type RepositoryListContainerProps = {
  repositories: RepositoriesResponse | undefined
  selectedSorting: SortingOptions
  setSelectedSorting: React.Dispatch<React.SetStateAction<SortingOptions>>
}

export function RepositoryListContainer({
  repositories,
  selectedSorting,
  setSelectedSorting,
}: RepositoryListContainerProps) {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <RepositoryListHeader selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} />
      }
      keyExtractor={item => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
}

export default function RepositoryList() {
  const [selectedSorting, setSelectedSorting] = useState<SortingOptions>('latest')
  const { repositories } = useRepositories({ sorting: selectedSorting })

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
    />
  )
}

type RepositoryListHeaderProps = Omit<RepositoryListContainerProps, 'repositories'>

export function RepositoryListHeader({ selectedSorting, setSelectedSorting }: RepositoryListHeaderProps) {
  return (
    <View>
      <Picker selectedValue={selectedSorting} onValueChange={itemValue => setSelectedSorting(itemValue)}>
        <Picker.Item label='Latest repositories' value='latest' />
        <Picker.Item label='Highest rated repositories' value='highest' />
        <Picker.Item label='Lowest rated repositories' value='lowest' />
      </Picker>
    </View>
  )
}
