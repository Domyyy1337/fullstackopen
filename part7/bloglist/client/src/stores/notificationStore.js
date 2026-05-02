import { create } from 'zustand'

const useNotificationStore = create(set => ({
  notification: null,
  actions: {
    setNotification(notification) {
      set(() => ({ notification }))
      setTimeout(() => set({ notification: null }), 5000)
    },
  },
}))

export const useNotification = () => useNotificationStore(s => s.notification)
export const useNotificationActions = () => useNotificationStore(s => s.actions)
