import { StyleSheet, View } from 'react-native'
import { type Review } from '../types'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'

const styles = StyleSheet.create({
  item: {
    padding: 10,
    backgroundColor: theme.colors.cardBackground,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  mainPart: {
    flex: 1,
    minWidth: 0,
    gap: 10,
  },
  bodyText: {
    flexShrink: 1,
  },
  rating: {
    color: theme.colors.primary,
  },
  ratingContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderWidth: 3,
    borderColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
})

export type ReviewItemProps = {
  item: Review
}

export default function ReviewItem({ item }: ReviewItemProps) {
  const date = new Date(item.createdAt)
  const formattedDate = format(date, 'd LLL yyyy')

  return (
    <View style={styles.item}>
      <View style={styles.ratingContainer}>
        <Text style={styles.rating} fontSize='subheading' fontWeight='bold'>
          {item.rating}
        </Text>
      </View>
      <View style={styles.mainPart}>
        <View>
          <Text fontWeight='bold'>{item.user.username}</Text>
          <Text>{formattedDate}</Text>
        </View>
        <View>
          <Text style={styles.bodyText}>{item.text}</Text>
        </View>
      </View>
    </View>
  )
}
