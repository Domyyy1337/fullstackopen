import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import Text from './Text'
import theme from '../theme'

const styles = StyleSheet.create({
  formItem: theme.components.formItem,
  formItemError: theme.components.formItemError,
  container: {
    backgroundColor: theme.colors.cardBackground,
    gap: 15,
    padding: 15,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.measurements.pressableRadius,
    padding: 15,
  },
})

export default function ReviewForm() {
  return (
    <View style={styles.container}>
      <TextInput placeholder='Repository owner name' style={styles.formItem} />
      <TextInput placeholder='Repository name' style={styles.formItem} />
      <TextInput placeholder='Rating between 0 and 100' style={styles.formItem} />
      <TextInput placeholder='Review' style={styles.formItem} multiline numberOfLines={10}/>
      <Pressable style={styles.button}>
        <Text fontWeight='bold' color='textContrast' alignment='center'>
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}
