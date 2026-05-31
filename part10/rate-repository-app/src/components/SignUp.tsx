import { useFormik } from 'formik'
import React, { useState } from 'react'
import { SignUpSchema, type SignUpType } from '../types'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import theme from '../theme'
import Text from './Text'
import FormError from './FormError'
import useSignUp from '../hooks/useSignUp'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: theme.components.formContainer,
  formItem: theme.components.formItem,
  formItemError: theme.components.formItemError,
  button: theme.components.formButton,
})

const initialValues: SignUpType = {
  username: '',
  password: '',
  confirmPassword: '',
}

export default function SignUp() {
  const [signUp] = useSignUp()
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(values: SignUpType) {
    try {
      await signUp(values)
      navigate('/')
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <SignUpContainer onSubmit={handleSubmit}>
      {errorMessage !== '' && <FormError message={errorMessage} />}
    </SignUpContainer>
  )
}

type SignUpContainerProps = React.PropsWithChildren & {
  onSubmit: (values: SignUpType) => Promise<void>
}

export function SignUpContainer({ onSubmit, children }: SignUpContainerProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(SignUpSchema),
  })

  const isUsernameError = formik.touched.username && formik.errors.username
  const isPasswordError = formik.touched.password && formik.errors.password
  const isConfirmPasswordError = formik.touched.confirmPassword && formik.errors.confirmPassword

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
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        style={isPasswordError ? [styles.formItem, styles.formItemError] : styles.formItem}
        secureTextEntry
      />
      {isPasswordError && <FormError message={formik.errors.password!} />}
      <TextInput
        placeholder='Confirm Password'
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur('confirmPassword')}
        style={isConfirmPasswordError ? [styles.formItem, styles.formItemError] : styles.formItem}
        secureTextEntry
      />
      {isConfirmPasswordError && <FormError message={formik.errors.confirmPassword!} />}
      <Pressable style={styles.button} onPress={() => formik.handleSubmit()}>
        <Text color='textContrast' fontWeight='bold' alignment='center'>
          Sign Up
        </Text>
      </Pressable>
      {children}
    </View>
  )
}
