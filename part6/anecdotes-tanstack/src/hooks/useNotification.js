import { useContext } from 'react'
import NotificationContext from '../notificationContext'

const useNotification = () => useContext(NotificationContext)

export default useNotification
