import { create } from 'zustand'
import loginService from '../services/login'

const useUserStore = create(set => ({
  user: (() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    return savedUser ? savedUser : null
  })(),
  actions: {
    setUser(user) {
      set({ user })
    },
    logout() {
      window.localStorage.clear()
      set({ user: null })
    },
    async login(username, password) {
      const loginUser = await loginService.login({ username, password })
      if (!loginUser) throw new Error(`Could not login as ${username}`)
      window.localStorage.setItem('savedBlogsUser', JSON.stringify(loginUser))
      set({ user: loginUser })
    },
  },
}))

export const useUser = () => useUserStore(s => s.user)
export const useUserActions = () => useUserStore(s => s.actions)
