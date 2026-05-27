import { StyleSheet, View } from 'react-native'
import { type Statistic, type Repository } from '../types'
import theme from '../theme'
import StatBar from './StatBar'
import RepositoryTop from './RepositoryTop'

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: 20,
    flex: 1,
    gap: 10,
  },
})

export type RepositoryItemProps = {
  item: Repository
}

export default function RepositoryItem({ item }: RepositoryItemProps) {
  const statisticArray: Statistic[] = [
    {
      name: item.stargazersCount === 1 ? 'Star' : 'Stars',
      amount: item.stargazersCount,
    },
    {
      name: item.forksCount === 1 ? 'Fork' : 'Forks',
      amount: item.forksCount,
    },
    {
      name: item.ratingAverage === 1 ? 'Review' : 'Reviews',
      amount: item.reviewCount,
    },
    {
      name: 'Rating',
      amount: item.ratingAverage,
    },
  ]

  return (
    <View style={styles.itemCard} testID='repositoryItem'>
      <RepositoryTop repository={item} />
      <StatBar statistics={statisticArray} />
    </View>
  )
}
