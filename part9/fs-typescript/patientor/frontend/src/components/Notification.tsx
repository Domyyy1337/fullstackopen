import { Alert } from '@mui/material'
import { useNotification } from '../hooks/useNotification'

export interface NotificationType {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
}

export default function Notification() {
  const notification = useNotification()

  if (!notification) return null

  return (
    <Alert variant='outlined' severity={notification.type}>
      {notification.message}
    </Alert>
  )
}
