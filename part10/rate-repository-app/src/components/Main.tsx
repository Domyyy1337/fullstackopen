import { StyleSheet, View } from 'react-native'
import RepositoryList from './RepositoryList'
import AppBar from './AppBar'
import theme from '../theme'
import { Navigate, Route, Routes } from 'react-router-native'
import SignIn from './SignIn'
import RepositoryDetail from './RepositoryDetail'
import ReviewForm from './ReviewForm'
import SignUp from './SignUp'
import MyReviews from './MyReviews'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.mainBackground,
  },
})

export default function Main() {
  return (
    <View style={styles.container}>
      <AppBar />
      <Routes>
        <Route path='/' element={<RepositoryList />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/repositories/:repositoryId' element={<RepositoryDetail />} />
        <Route path='/create-review' element={<ReviewForm />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/my-reviews' element={<MyReviews />} />
        <Route path='*' element={<Navigate to='/' replace />} />
      </Routes>
    </View>
  )
}
