import { Alert, Pressable, StyleSheet, View } from 'react-native'
import { type Review } from '../types'
import Text from './Text'
import theme from '../theme'
import { format } from 'date-fns'
import { useNavigate } from 'react-router-native'
import useDeleteReview from '../hooks/useDeleteReview'
import { useApolloClient } from '@apollo/client/react'
import { GET_USER_REVIEWS } from '../graphql/queries'

const styles = StyleSheet.create({
  item: {
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
  viewButton: {
    ...theme.components.formButton,
    flexGrow: 1,
  },
  deleteButton: {
    ...theme.components.formButton,
    backgroundColor: theme.colors.error,
    flexGrow: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    gap: 15,
    justifyContent: 'space-between',
  },
  mainContainer: {
    padding: 10,
    backgroundColor: theme.colors.cardBackground,
    gap: 15,
  },
})

export type ReviewItemProps = {
  item: Review
  showUser?: boolean
}

export default function ReviewItem({ item, showUser = true }: ReviewItemProps) {
  const date = new Date(item.createdAt)
  const formattedDate = format(date, 'd LLL yyyy')
  const navigate = useNavigate()
  const [deleteReview] = useDeleteReview()
  const client = useApolloClient()

  function handleViewPress() {
    navigate(`/repositories/${item.repository.id}`)
  }

  function handleDeletePress() {
    async function deleteAndRefetch() {
      await deleteReview(item.id)
      await client.refetchQueries({ include: [GET_USER_REVIEWS] })
    }

    Alert.alert('Delete review', 'Are you sure you want to delete this review?', [
      { text: 'Cancel' },
      {
        text: 'Delete',
        onPress: () => void deleteAndRefetch(),
      },
    ])
  }

  return (
    <View style={styles.mainContainer}>
      <View style={styles.item}>
        <View style={styles.ratingContainer}>
          <Text style={styles.rating} fontSize='subheading' fontWeight='bold'>
            {item.rating}
          </Text>
        </View>
        <View style={styles.mainPart}>
          <View>
            <Text fontWeight='bold'>{showUser ? item.user.username : item.repository.fullName}</Text>
            <Text>{formattedDate}</Text>
          </View>
          <View>
            <Text style={styles.bodyText}>{item.text}</Text>
          </View>
        </View>
      </View>
      {!showUser && (
        <View style={styles.buttonContainer}>
          <Pressable style={styles.viewButton} onPress={handleViewPress}>
            <Text color='textContrast' fontWeight='bold' alignment='center'>
              View repository
            </Text>
          </Pressable>
          <Pressable style={styles.deleteButton} onPress={() => void handleDeletePress()}>
            <Text color='textContrast' fontWeight='bold' alignment='center'>
              Delete review
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  )
}
