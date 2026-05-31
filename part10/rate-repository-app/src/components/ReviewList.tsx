import { FlatList } from 'react-native'
import ItemSeparator from './ItemSeparator'
import ReviewItem from './ReviewItem'
import type { ReviewNode } from '../types'

type ReviewListProps = {
  reviewNode: ReviewNode[]
  header: React.JSX.Element
  showUser?: boolean
}

export default function ReviewList({ reviewNode, header, showUser = true }: ReviewListProps) {
  return (
    <FlatList
      data={reviewNode}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => <ReviewItem item={item.node} showUser={showUser} />}
      keyExtractor={edge => edge.node.id}
      ListHeaderComponent={() => header}
    />
  )
}
