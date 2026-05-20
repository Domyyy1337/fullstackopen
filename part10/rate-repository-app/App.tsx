import { StatusBar } from 'expo-status-bar'
import Main from './src/components/Main'
import { NativeRouter } from 'react-router-native'
import createApolloClient from './src/utils/apolloClient'
import { ApolloProvider } from '@apollo/client/react'

const apolloClient = createApolloClient()

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <NativeRouter>
        <ApolloProvider client={apolloClient}>
          <Main />
        </ApolloProvider>
      </NativeRouter>
    </>
  )
}
