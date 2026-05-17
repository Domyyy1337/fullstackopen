import { Alert } from '@mui/material'

export interface NotificationType {
  type: 'success' | 'info' | 'warning' | 'error'
  message: string
}

interface NotificationProps {
  notification: NotificationType | null
}

export default function Notification({ notification }: NotificationProps) {
  if (!notification) return null

  return (
    <Alert variant='outlined' severity={notification.type}>
      {notification.message}
    </Alert>
  )
}
