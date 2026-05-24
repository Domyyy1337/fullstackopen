import { Text, View } from 'react-native'
import { render, screen } from '@testing-library/react-native'

type GreetingProps = {
  name: string
}

export default function Greeting({ name }: GreetingProps) {
  return (
    <View>
      <Text>Hello {name}!</Text>
    </View>
  )
}

describe('Greeting', () => {
  it('renders a greeting message based on the name prop', () => {
    render(<Greeting name='Kalle' />)

    screen.debug()

    expect(screen.getByText('Hello Kalle!')).toBeDefined()
  })
})
