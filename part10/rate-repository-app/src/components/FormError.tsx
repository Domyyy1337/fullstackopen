import React from 'react'
import { StyleSheet, Text } from 'react-native'
import theme from '../theme'

type FormErrorProps = {
  message: string
}

const styles = StyleSheet.create({
  errorText: {
    color: theme.colors.error,
  },
})

export default function FormError({ message }: FormErrorProps) {
  return <Text style={styles.errorText}>{message}</Text>
}
