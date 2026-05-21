import React from 'react'
import Text from './Text'
import { useFormik } from 'formik'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import FormError from './FormError'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import useSignIn from '../hooks/useSignIn'
import { SignInSchema, type SignInType } from '../types'
import { useNavigate } from 'react-router-native'

const initialValues = {
  username: '',
  password: '',
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
  formItemError: {
    borderColor: theme.colors.error,
  },
  buttonText: {
    textAlign: 'center',
  },
})

export default function SignIn() {
  const [signIn] = useSignIn()
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(SignInSchema),
  })
  const navigate = useNavigate()

  async function onSubmit(values: SignInType) {
    const { username, password } = values

    try {
      const data = await signIn({ username, password })
      console.log(data)
      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  const isUsernameError = formik.touched.username && formik.errors.username
  const isPasswordError = formik.touched.password && formik.errors.password

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Username'
        value={formik.values.username}
        onChangeText={formik.handleChange('username')}
        onBlur={formik.handleBlur('username')}
        style={isUsernameError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isUsernameError && <FormError message={formik.errors.username!} />}
      <TextInput
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        style={isPasswordError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isPasswordError && <FormError message={formik.errors.password!} />}
      <Pressable style={styles.buttonStyle} onPress={() => formik.handleSubmit()}>
        <Text color='textContrast' fontWeight='bold' style={styles.buttonText}>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}
