import AsyncStorage from '@react-native-async-storage/async-storage'
import { type AuthenticateData } from '../types'

export default class AuthStorage {
  namespace: string

  constructor(namespace = 'auth') {
    this.namespace = namespace
  }

  async getAccessToken(): Promise<string | undefined> {
    const token = await AsyncStorage.getItem(`${this.namespace}:accessToken`)
    if (!token) return undefined

    const parsedToken = JSON.parse(token) as string

    if (typeof parsedToken !== 'string') throw new Error('Invalid token in local storage')

    return parsedToken
  }

  async setAccessToken(accessToken: AuthenticateData['authenticate']['accessToken']) {
    await AsyncStorage.setItem(`${this.namespace}:accessToken`, JSON.stringify(accessToken))
  }

  async removeAccessToken() {
    await AsyncStorage.removeItem(`${this.namespace}:accessToken`)
  }
}
