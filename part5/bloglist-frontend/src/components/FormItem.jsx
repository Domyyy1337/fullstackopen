const FormItem = ({ id, text, type = text, value, onChange }) => {
  return (
    <div>
      <label htmlFor={id}>{text}</label>
      <input type={type} value={value} onChange={onChange} />
    </div>
  )
}

export default FormItem
