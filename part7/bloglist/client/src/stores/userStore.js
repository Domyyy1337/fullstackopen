import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { getUser, saveUser, removeUser } from '../services/persistentUser'

const useUserStore = create(set => ({
  user: (() => {
    const savedUser = getUser()
    if (savedUser) {
      blogService.setToken(savedUser.token)
      return savedUser
    }
    return null
  })(),
  actions: {
    setUser(user) {
      set({ user })
    },
    logout() {
      removeUser()
      set({ user: null })
      blogService.setToken(null)
    },
    async login(username, password) {
      const loginUser = await loginService.login({ username, password })
      saveUser(loginUser)
      set({ user: loginUser })
      blogService.setToken(loginUser.token)
      return loginUser
    },
  },
}))

export const useUser = () => useUserStore(s => s.user)
export const useUserActions = () => useUserStore(s => s.actions)
