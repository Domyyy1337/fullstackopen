const NoteForm = ({ onSubmit, value, onChange, show }) => {
  if (!show) return

  return (
    <div>
      <h2>Add New Note</h2>
      <form onSubmit={onSubmit}>
        <input type='text' value={value} onChange={onChange} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

export default NoteForm
