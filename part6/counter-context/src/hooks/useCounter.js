import { useContext } from 'react'
import CounterContext from '../counterContext'

const useCounter = () => useContext(CounterContext)

export default useCounter
