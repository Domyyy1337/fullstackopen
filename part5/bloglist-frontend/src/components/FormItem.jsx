import { useId } from 'react'

const FormItem = ({ label, type = 'text', value, onChange }) => {
  const id = useId()

  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input id={id} type={type} value={value} onChange={onChange} />
    </div>
  )
}

export default FormItem
