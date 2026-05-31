import { FlatList, View } from 'react-native'
import RepositoryItem from './RepositoryItem'
import useRepositories from '../hooks/useRepositories'
import type { SortingOptions, RepositoriesResponse } from '../types'
import ItemSeparator from './ItemSeparator'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
import { Searchbar } from 'react-native-paper'
import { useDebounce } from 'use-debounce'

type RepositoryListContainerProps = {
  repositories: RepositoriesResponse | undefined
  selectedSorting: SortingOptions
  setSelectedSorting: React.Dispatch<React.SetStateAction<SortingOptions>>
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export function RepositoryListContainer({
  repositories,
  selectedSorting,
  setSelectedSorting,
  searchQuery,
  setSearchQuery,
}: RepositoryListContainerProps) {
  const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : []

  return (
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      ListHeaderComponent={
        <View>
          <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <SortingSelector selectedSorting={selectedSorting} setSelectedSorting={setSelectedSorting} />
        </View>
      }
      keyExtractor={item => item.id}
      renderItem={({ item }) => <RepositoryItem item={item} />}
    />
  )
}

export default function RepositoryList() {
  const [selectedSorting, setSelectedSorting] = useState<SortingOptions>('latest')
  const [searchQuery, setSearchQuery] = useState('')
  const [debouncedSearchQuery] = useDebounce(searchQuery, 500)
  const { repositories } = useRepositories({ sorting: selectedSorting, searchQuery: debouncedSearchQuery })

  return (
    <RepositoryListContainer
      repositories={repositories}
      selectedSorting={selectedSorting}
      setSelectedSorting={setSelectedSorting}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
    />
  )
}

type SortingSelectorProps = {
  selectedSorting: SortingOptions
  setSelectedSorting: React.Dispatch<React.SetStateAction<SortingOptions>>
}

export function SortingSelector({ selectedSorting, setSelectedSorting }: SortingSelectorProps) {
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

type SearchBarProps = {
  searchQuery: string
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>
}

export function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
  return (
    <View>
      <Searchbar placeholder='Search' onChangeText={setSearchQuery} value={searchQuery} />
    </View>
  )
}
