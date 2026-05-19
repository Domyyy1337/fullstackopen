import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    color: 'blue',
    fontSize: 24,
    fontWeight: '700',
  },
})

export default function BigBlueText() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Big blue text</Text>
    </View>
  )
}
