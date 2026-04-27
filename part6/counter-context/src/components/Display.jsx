import CounterContext from '../counterContext'
import useCounter from '../hooks/useCounter'

export default function Display() {
  const { counter } = useCounter()

  return <div>{counter}</div>
}
