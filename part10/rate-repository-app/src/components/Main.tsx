import { StyleSheet, Text, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

export default function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Text>Rate Repository Application</Text>
      <RepositoryList />
    </View>
  )
}
