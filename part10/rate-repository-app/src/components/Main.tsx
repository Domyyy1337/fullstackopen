import { StyleSheet, Text, View } from 'react-native'
import Constants from 'expo-constants'
import RepositoryList from './RepositoryList'

const styles = StyleSheet.create({
  container: {
    marginTop: Constants.statusBarHeight,
    flex: 1,
  },
})

export default function Main() {
  return (
    <View style={styles.container}>
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  )
}
