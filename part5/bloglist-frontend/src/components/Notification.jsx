const Notification = ({ message, error = false }) => {
  /**
   * @type {import("react").CSSProperties}
   */
  const style = {
    color: error ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: '1.2rem',
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '0.5rem',
    marginBottom: '0.5rem',
  }

  if (message === null) return null

  return <div style={style}>{message}</div>
}

export default Notification
