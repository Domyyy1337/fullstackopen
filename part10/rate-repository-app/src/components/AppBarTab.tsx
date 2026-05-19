import { StyleSheet } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'

const styles = StyleSheet.create({
  appBarItem: {
    minHeight: 30,
  },
})

type AppBarTabProps = {
  name: string
  to: string
}

export default function AppBarTab({ name, to }: AppBarTabProps) {
  return (
    <Link style={styles.appBarItem} to={to}>
      <Text color='textContrast' fontSize='subheading' fontWeight='bold'>
        {name}
      </Text>
    </Link>
  )
}
