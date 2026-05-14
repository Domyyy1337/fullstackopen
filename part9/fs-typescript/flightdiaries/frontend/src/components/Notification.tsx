interface NotificationProps {
  message: string | null
}

export default function Notification({ message }: NotificationProps) {
  if (!message) return <p className='notification'></p>

  return <p className='notification'>{message}</p>
}
