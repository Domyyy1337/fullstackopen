import { StyleSheet, Text, View } from 'react-native'

const styles = StyleSheet.create({
  flexContainer: {
    flexDirection: 'row',
  },
  flexItemA: {
    flexGrow: 0,
    backgroundColor: 'green',
  },
  flexItemB: {
    flexGrow: 1,
    backgroundColor: 'blue',
  },
})

//eslint-disable-next-line @typescript-eslint/no-unused-vars
function FlexboxExample() {
  return (
    <View style={styles.flexContainer}>
      <View style={styles.flexItemA}>
        <Text>Flex item A</Text>
      </View>
      <View style={styles.flexItemB}>
        <Text>Flex item B</Text>
      </View>
    </View>
  )
}
