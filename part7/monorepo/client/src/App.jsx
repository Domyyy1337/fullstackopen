import { useState } from 'react'

function App() {
  const [response, setResponse] = useState(null)

  const ping = async () => {
    const res = await fetch('/api/ping')
    const data = await res.json()
    setResponse(`${data.message} ${data.time}`)
  }

  return (
    <div>
      <h2>Front and back in same project!</h2>
      <button onClick={ping}>Ping</button>
      {response && <p>{response}</p>}
    </div>
  )
}

export default App
