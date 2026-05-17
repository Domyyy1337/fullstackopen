import { create } from 'zustand'
import type { NotificationType } from '../components/Notification'

interface NotificationState {
  notification: NotificationType | null
  setNotification: (notification: NotificationType) => void
}

export const useNotificationStore = create<NotificationState>(set => ({
  notification: null,
  setNotification(notification: NotificationType) {
    set(() => ({ notification }))
    setTimeout(() => set(() => ({ notification: null })), 5000)
  },
}))

export const useNotification = () => useNotificationStore(s => s.notification)
export const useSetNotification = () => useNotificationStore(s => s.setNotification)
