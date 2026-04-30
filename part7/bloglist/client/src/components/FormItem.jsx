const FormItem = ({ label, type = 'text', value, onChange }) => {
  return (
    <div>
      <label>
        {label}
        <input type={type} value={value} onChange={onChange} />
      </label>
    </div>
  )
}

export default FormItem
