import { Pressable, StyleSheet } from 'react-native'
import Text from './Text'
import * as Linking from 'expo-linking'
import theme from '../theme'
import { type Repository } from '../types'

const styles = StyleSheet.create({
  visitButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.measurements.pressableRadius,
    textAlign: 'center',
    padding: 15,
  },
})

type ExternalLinkProps = {
  link: Repository['url']
}

export default function ExternalLink({link}: ExternalLinkProps) {
  function handlePress() {
    void Linking.openURL(link)
  }

  return (
    <Pressable onPress={handlePress} style={styles.visitButton}>
      <Text alignment='center' color='textContrast'>
        Open in GitHub
      </Text>
    </Pressable>
  )
}
