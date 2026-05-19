import { StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    paddingLeft: 10,
    backgroundColor: theme.colors.barBackground,
    maxHeight: 100,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  }
})

export default function AppBar() {
  return (
    <View style={styles.container}>
      <AppBarTab name='Repositories' to='/' />
      <AppBarTab name='Sign-In' to='/signin' />
    </View>
  )
}
