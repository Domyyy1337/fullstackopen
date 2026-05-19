import React from 'react'
import Text from './Text'
import { useFormik } from 'formik'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'

type FormValues = {
  username: string
  password: string
}

const initialValues = {
  username: '',
  password: '',
}

type SignInProps = {
  onSubmit: (values: FormValues) => void
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
    gap: 20,
    backgroundColor: theme.colors.cardBackground,
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    padding: 15,
    borderRadius: 5,
  },
  formItem: {
    borderColor: theme.colors.textPrimary,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
  },
})

export default function SignIn({ onSubmit }: SignInProps) {
  const formik = useFormik({ initialValues, onSubmit })

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        style={styles.formItem}
      />
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        style={styles.formItem}
      />
      <Pressable style={styles.buttonStyle} onPress={() => formik.handleSubmit()}>
        <Text color='textContrast' fontWeight='bold' style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}
