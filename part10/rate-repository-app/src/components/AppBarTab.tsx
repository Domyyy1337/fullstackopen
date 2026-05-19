import { Alert, Pressable, StyleSheet } from 'react-native'
import Text from './Text'

const styles = StyleSheet.create({
  appBarItem: {
    padding: 10,
  },
})

type AppBarTabProps = {
  name: string
}

export default function AppBarTab({ name }: AppBarTabProps) {
  return (
    <Pressable onPress={() => Alert.alert('You clicked Repositories')} style={styles.appBarItem}>
      <Text color='textContrast' fontSize='subheading' fontWeight='bold'>
        {name}
      </Text>
    </Pressable>
  )
}
