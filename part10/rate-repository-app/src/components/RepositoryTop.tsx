import { Image, StyleSheet, View } from 'react-native'
import { type Repository } from '../types'
import theme from '../theme'
import Text from './Text'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    flexDirection: 'row',
  },
  repoLogo: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  repoInfoContainer: {
    flex: 1,
    gap: 5,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  language: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.textContrast,
    borderRadius: 5,
    padding: 5,
  },
})

type RepositoryTopProps = {
  repository: Repository
}

export default function RepositoryTop({ repository }: RepositoryTopProps) {
  return (
    <View style={styles.container}>
      <View>
        <Image style={styles.repoLogo} source={{ uri: repository.ownerAvatarUrl }}></Image>
      </View>
      <View style={styles.repoInfoContainer}>
        <Text fontSize='subheading' fontWeight='bold'>
          {repository.fullName}
        </Text>
        <Text>{repository.description}</Text>
        <Text style={styles.language}>{repository.language}</Text>
      </View>
    </View>
  )
}
