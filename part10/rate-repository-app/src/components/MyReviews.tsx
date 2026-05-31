import { View } from 'react-native'
import useUserReviews from '../hooks/useUserReviews'
import Text from './Text'
import ReviewList from './ReviewList'

export default function MyReviews() {
  const { reviews, loading } = useUserReviews()

  if (loading || !reviews) return <Text>loading reviews ...</Text>

  const header = <View></View>

  return <ReviewList reviewNode={reviews.reviews.edges} header={header} showUser={false} />
}
