import { Pressable, type PressableProps, StyleSheet } from 'react-native'
import Text from './Text'
import { Link } from 'react-router-native'
import assertNever from '../utils/assertNever'

const styles = StyleSheet.create({
  appBarItem: {
    minHeight: 30,
  },
})

type AppBarTabBase = {
  name: string
}

type AppBarTabLink = AppBarTabBase & {
  type: 'link'
  to: string
}

type AppBarTabPressable = AppBarTabBase & {
  type: 'pressable'
  onPress: PressableProps['onPress']
}

type AppBarTabProps = AppBarTabPressable | AppBarTabLink

export default function AppBarTab(props: AppBarTabProps) {
  const text = (
    <Text color='textContrast' fontSize='subheading' fontWeight='bold'>
      {props.name}
    </Text>
  )

  switch (props.type) {
    case 'link':
      return (
        <Link style={styles.appBarItem} to={props.to}>
          {text}
        </Link>
      )
    case 'pressable':
      return (
        <Pressable style={styles.appBarItem} onPress={props.onPress}>
          {text}
        </Pressable>
      )
    default:
      assertNever(props)
  }
}
