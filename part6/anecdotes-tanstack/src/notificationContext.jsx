import { createContext, useState } from 'react'

const NotificationContext = createContext()

export default NotificationContext

export function NotificationContextProvider(props) {
  const [notification, setNotification] = useState(null)

  function setTimedNotification(message) {
    setNotification(message)
    setTimeout(() => setNotification(null), 5000)
  }

  return (
    <NotificationContext.Provider value={{ notification, setNotification: setTimedNotification }}>
      {props.children}
    </NotificationContext.Provider>
  )
}
