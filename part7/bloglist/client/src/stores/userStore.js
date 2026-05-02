import { create } from 'zustand'
import loginService from '../services/login'
import blogService from '../services/blogs'

const useUserStore = create(set => ({
  user: (() => {
    const savedUser = window.localStorage.getItem('savedBlogsUser')
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser)
      blogService.setToken(parsedUser.token)
      return parsedUser
    }
    return null
  })(),
  actions: {
    setUser(user) {
      set({ user })
    },
    logout() {
      window.localStorage.clear()
      set({ user: null })
      blogService.setToken(null)
    },
    async login(username, password) {
      const loginUser = await loginService.login({ username, password })
      window.localStorage.setItem('savedBlogsUser', JSON.stringify(loginUser))
      set({ user: loginUser })
      blogService.setToken(loginUser.token)
      return loginUser
    },
  },
}))

export const useUser = () => useUserStore(s => s.user)
export const useUserActions = () => useUserStore(s => s.actions)
