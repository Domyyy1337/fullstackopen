import { createRoot } from 'react-dom/client'

interface WelcomeProps {
  name: string
}

function Welcome(props: WelcomeProps) {
  return <h1>Hello, {props.name}</h1>
}

createRoot(document.getElementById('root')!).render(
  <Welcome name='Sarah' />
)
