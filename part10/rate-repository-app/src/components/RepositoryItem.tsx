import { Text, View } from 'react-native'
import { type Repository } from '../types'

export type RepositoryItemProps = {
  item: Repository
}

export default function RepositoryItem({ item }: RepositoryItemProps) {
  return (
    <View>
      <Text>Full name: {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Stars: {item.stargazersCount}</Text>
      <Text>Forks: {item.reviewCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
}
