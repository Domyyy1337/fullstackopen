const Form = ({ onSubmit, children, title, buttonText }) => {
  return (
    <div>
      <h2>{title}</h2>
      <form onSubmit={onSubmit}>
        {children}
        <button type='submit'>{buttonText}</button>
      </form>
    </div>
  )
}

export default Form
