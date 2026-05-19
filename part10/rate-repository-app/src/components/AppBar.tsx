import { ScrollView, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: theme.colors.barBackground,
    minHeight: 90,
  },
  contentContainer: {
    flexDirection: 'row',
    gap: 15,
    paddingLeft: 10,
    alignItems: 'center',
    flexGrow: 1,
  },
})

export default function AppBar() {
  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <AppBarTab name='Repositories' to='/' />
        <AppBarTab name='Sign-In' to='/signin' />
      </ScrollView>
    </View>
  )
}
