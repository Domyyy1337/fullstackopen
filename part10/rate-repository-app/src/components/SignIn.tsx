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

const initialValues: SignInType = {
  username: '',
  password: '',
}

const styles = StyleSheet.create({
  container: theme.components.formContainer,
  buttonStyle: theme.components.formButton,
  formItem: theme.components.formItem,
  formItemError: theme.components.formItemError,
})

type SignInContainerProps = {
  onSubmit: (values: SignInType) => Promise<void>
}

export function SignInContainer({ onSubmit }: SignInContainerProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(SignInSchema),
  })

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
      <Pressable style={styles.buttonStyle} onPress={() => formik.handleSubmit()} accessibilityRole='button'>
        <Text color='textContrast' fontWeight='bold' alignment='center'>
          Sign in
        </Text>
      </Pressable>
    </View>
  )
}

export default function SignIn() {
  const [signIn] = useSignIn()
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

  return <SignInContainer onSubmit={onSubmit} />
}
