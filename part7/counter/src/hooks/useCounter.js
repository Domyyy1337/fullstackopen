import { useState } from 'react'

export default function useCounter() {
  const [value, setValue] = useState(0)

  const increase = () => setValue(value + 1)
  const decrease = () => setValue(value - 1)
  const zero = () => setValue(0)

  return { value, increase, decrease, zero }
}
