import { Alert, Pressable, Text } from 'react-native'

export default function PressableText() {
  return (
    <Pressable onPress={() => Alert.alert('You pressed the text!')}>
      <Text>You can press me</Text>
    </Pressable>
  )
}
