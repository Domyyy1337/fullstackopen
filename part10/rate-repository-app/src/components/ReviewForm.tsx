import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { NewReviewSchema, type NewReviewType, type ReviewFormValues } from '../types'
import { ErrorMessage, useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import FormError from './FormError'
import { useNavigate } from 'react-router-native'
import useReview from '../hooks/useReview'
import React, { useState } from 'react'

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

const initialValues: ReviewFormValues = {
  ownerName: '',
  rating: '',
  repositoryName: '',
  text: '',
}

export default function ReviewForm() {
  const navigate = useNavigate()
  const [createReview] = useReview()
  const [errorMessage, setErrorMessage] = useState('')

  async function handleSubmit(values: ReviewFormValues) {
    const formattedReview: NewReviewType = { ...values, rating: Number(values.rating) }

    try {
      const data = await createReview({ review: formattedReview })
      void navigate(`/repositories/${data.createReview.repositoryId}`)
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.log(error.message)
        setErrorMessage(error.message)
      }
    }
  }

  return (
    <View>
      <ReviewFormContainer onSubmit={handleSubmit}>
        {errorMessage !== '' && <FormError message={errorMessage} />}
      </ReviewFormContainer>
    </View>
  )
}

type ReviewFormContainerProps = React.PropsWithChildren & {
  onSubmit: (values: ReviewFormValues) => Promise<void>
}

export function ReviewFormContainer({ onSubmit, children }: ReviewFormContainerProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(NewReviewSchema),
  })

  const isUsernameError = formik.touched.ownerName && formik.errors.ownerName
  const isRepositoryError = formik.touched.repositoryName && formik.errors.repositoryName
  const isRatingError = formik.touched.rating && formik.errors.rating
  const isReviewError = formik.touched.text && formik.errors.text

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.ownerName}
        onChangeText={formik.handleChange('ownerName')}
        onBlur={formik.handleBlur('ownerName')}
        style={isUsernameError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isUsernameError && <FormError message={formik.errors.ownerName!} />}
      <TextInput
        placeholder='Repository name'
        value={formik.values.repositoryName}
        onChangeText={formik.handleChange('repositoryName')}
        onBlur={formik.handleBlur('repositoryName')}
        style={isRepositoryError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isRepositoryError && <FormError message={formik.errors.repositoryName!} />}
      <TextInput
        placeholder='Rating between 0 and 100'
        value={formik.values.rating}
        onChangeText={formik.handleChange('rating')}
        onBlur={formik.handleBlur('rating')}
        style={isRatingError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isRatingError && <FormError message={formik.errors.rating!} />}
      <TextInput
        placeholder='Review'
        multiline
        numberOfLines={10}
        value={formik.values.text}
        onChangeText={formik.handleChange('text')}
        onBlur={formik.handleBlur('text')}
        style={isReviewError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isReviewError && <FormError message={formik.errors.text!} />}
      <Pressable style={styles.button} onPress={() => formik.handleSubmit()} accessibilityRole='button'>
        <Text fontWeight='bold' color='textContrast' alignment='center'>
          Create a review
        </Text>
      </Pressable>
      {children}
    </View>
  )
}
