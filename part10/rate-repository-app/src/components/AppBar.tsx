import { ScrollView, StyleSheet, View } from 'react-native'
import Constants from 'expo-constants'
import theme from '../theme'
import AppBarTab from './AppBarTab'
import { useApolloClient, useQuery } from '@apollo/client/react'
import { ME } from '../graphql/queries'
import useAuthStorage from '../hooks/useAuthStorage'
import { type MeQuery } from '../types'

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
  const me = useQuery<MeQuery>(ME)
  const apolloClient = useApolloClient()
  const authStorage = useAuthStorage()

  async function handleSignOut() {
    await authStorage.removeAccessToken()
    await apolloClient.resetStore()
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal contentContainerStyle={styles.contentContainer}>
        <AppBarTab name='Repositories' to='/' type='link' />
        {me.data?.me ? (
          <>
            <AppBarTab name='Create a review' type='link' to='/create-review' />
            <AppBarTab
              name='Sign-Out'
              onPress={() => {
                void handleSignOut()
              }}
              type='pressable'
            />
          </>
        ) : (
          <AppBarTab name='Sign-In' to='/signin' type='link' />
        )}
      </ScrollView>
    </View>
  )
}
