import { StyleSheet, View } from 'react-native'

const styles = StyleSheet.create({
  separator: {
    height: 15,
  },
})

export default function ItemSeparator() {
  return <View style={styles.separator} />
}
