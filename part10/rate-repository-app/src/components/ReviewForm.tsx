import { Pressable, StyleSheet, TextInput, View } from 'react-native'
import Text from './Text'
import theme from '../theme'
import { NewReviewSchema, type ReviewFormValues, type NewReviewType } from '../types'
import { useFormik } from 'formik'
import { toFormikValidationSchema } from 'zod-formik-adapter'
import FormError from './FormError'
import { useNavigate } from 'react-router-native'

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
  ownerUsername: '',
  rating: '',
  repositoryName: '',
  review: '',
}

export default function ReviewForm() {
  const navigate = useNavigate()

  async function handleSubmit(values: ReviewFormValues) {
    void navigate('/')
  }

  return <ReviewFormContainer onSubmit={handleSubmit} />
}

type ReviewFormContainerProps = {
  onSubmit: (values: ReviewFormValues) => Promise<void>
}

export function ReviewFormContainer({ onSubmit }: ReviewFormContainerProps) {
  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema: toFormikValidationSchema(NewReviewSchema),
  })

  const isUsernameError = formik.touched.ownerUsername && formik.errors.ownerUsername
  const isRepositoryError = formik.touched.repositoryName && formik.errors.repositoryName
  const isRatingError = formik.touched.rating && formik.errors.rating
  const isReviewError = formik.touched.review && formik.errors.review

  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Repository owner name'
        value={formik.values.ownerUsername}
        onChangeText={formik.handleChange('ownerUsername')}
        onBlur={formik.handleBlur('ownerUsername')}
        style={isUsernameError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isUsernameError && <FormError message={formik.errors.ownerUsername!} />}
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
        value={formik.values.review}
        onChangeText={formik.handleChange('review')}
        onBlur={formik.handleBlur('review')}
        style={isReviewError ? [styles.formItem, styles.formItemError] : styles.formItem}
      />
      {isReviewError && <FormError message={formik.errors.review!} />}
      <Pressable style={styles.button} onPress={() => formik.handleSubmit()} accessibilityRole='button'>
        <Text fontWeight='bold' color='textContrast' alignment='center'>
          Create a review
        </Text>
      </Pressable>
    </View>
  )
}
