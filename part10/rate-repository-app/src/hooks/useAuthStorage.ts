import { useContext } from 'react'
import AuthStorageContext from '../contexts/AuthStorageContext'

export default function useAuthStorage() {
  const context = useContext(AuthStorageContext)
  if (context === undefined) throw new Error('useAuthStorage must be used within a AuthStorageProvider')
  return context
}
