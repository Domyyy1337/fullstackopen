import { Platform, StyleSheet, Text } from 'react-native'

const styles = StyleSheet.create({
  text: {
    color: Platform.select({
      android: 'green',
      ios: 'blue',
      default: 'black',
    }),
  },
})

export default function WhatIsMyPlatform() {
  return <Text style={styles.text}>Your platform is: {Platform.OS}</Text>
}
