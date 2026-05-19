import { useFormik } from 'formik'
import { Pressable, Text, TextInput, View } from 'react-native'
import * as z from 'zod'

type FormValues = {
  mass: string
  height: string
}

type BodyMassIndexFormProps = {
  onSubmit: (values: FormValues) => void
}

const validationSchema = z.object({
  mass: z
    .number({ error: issue => (issue.input === undefined ? 'Weight is required' : 'Type must be a number') })
    .min(1, { error: 'Weight must be greater or equal to 1' }),
  height: z
    .number({ error: issue => (issue.input === undefined ? 'Height is required' : 'Type must be a number') })
    .min(0.5, { error: 'Height must bre greater or equal to 0.5' }),
})

const initialValues: FormValues = {
  mass: '',
  height: '',
}

function getBodyMassIndex(mass: number, height: number) {
  return Math.round(mass / Math.pow(height, 2))
}

function BodyMassIndexForm({ onSubmit }: BodyMassIndexFormProps) {
  const formik = useFormik({ initialValues, onSubmit, validationSchema })

  return (
    <View>
      <TextInput
        placeholder='Weight (kg)'
        value={formik.values.mass}
        onChangeText={formik.handleChange('mass')}
        onBlur={formik.handleBlur('mass')}
      />
      {formik.touched.mass && formik.errors.mass && <Text style={{ color: 'red' }}>{formik.errors.mass}</Text>}
      <TextInput
        placeholder='Height (m)'
        value={formik.values.height}
        onChangeText={formik.handleChange('height')}
        onBlur={formik.handleBlur('height')}
      />
      {formik.touched.height && formik.errors.height && <Text style={{ color: 'red' }}>{formik.errors.height}</Text>}
      <Pressable onPress={() => formik.handleSubmit()}>
        <Text>Calculate</Text>
      </Pressable>
    </View>
  )
}

export default function BodyMassIndexCalculator() {
  function onSubmit(values: FormValues) {
    const mass = parseFloat(values.mass)
    const height = parseFloat(values.height)

    if (!isNaN(mass) && !isNaN(height) && height !== 0) {
      console.log(`Your body mass index is: ${getBodyMassIndex(mass, height)}`)
    }
  }
  return <BodyMassIndexForm onSubmit={onSubmit} />
}
