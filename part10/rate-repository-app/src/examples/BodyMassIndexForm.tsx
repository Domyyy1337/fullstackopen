import { useFormik } from 'formik'
import { Pressable, Text, TextInput, View } from 'react-native'

type FormValues = {
  mass: string
  height: string
}

type BodyMassIndexFormProps = {
  onSubmit: (values: FormValues) => void
}

const initialValues: FormValues = {
  mass: '',
  height: '',
}

function getBodyMassIndex(mass: number, height: number) {
  return Math.round(mass / Math.pow(height, 2))
}

function BodyMassIndexForm({ onSubmit }: BodyMassIndexFormProps) {
  const formik = useFormik({ initialValues, onSubmit })

  return (
    <View>
      <TextInput placeholder='Weight (kg)' value={formik.values.mass} onChangeText={formik.handleChange('mass')} />
      <TextInput placeholder='Height (m)' value={formik.values.height} onChangeText={formik.handleChange('height')} />
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
