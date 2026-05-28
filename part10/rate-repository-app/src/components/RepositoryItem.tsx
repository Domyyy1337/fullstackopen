import { Pressable, StyleSheet } from 'react-native'
import { type Statistic, type Repository } from '../types'
import theme from '../theme'
import StatBar from './StatBar'
import RepositoryTop from './RepositoryTop'
import { useNavigate } from 'react-router-native'
import ExternalLink from './ExternalLink'

const styles = StyleSheet.create({
  itemCard: {
    backgroundColor: theme.colors.cardBackground,
    padding: 20,
    gap: 10,
  },
})

export type RepositoryItemProps = {
  item: Repository
  isDetail?: boolean
}

export default function RepositoryItem({ item, isDetail = false }: RepositoryItemProps) {
  const navigate = useNavigate()

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

  function handlePress() {
    if (isDetail) return

    navigate(`/repositories/${item.id}`)
  }

  return (
    <Pressable style={styles.itemCard} testID='repositoryItem' onPress={handlePress}>
      <RepositoryTop repository={item} />
      <StatBar statistics={statisticArray} />
      {isDetail && <ExternalLink link={item.url} />}
    </Pressable>
  )
}
