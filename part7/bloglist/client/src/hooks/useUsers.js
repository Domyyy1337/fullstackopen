import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

export default function useUsers() {
  const result = useQuery({
    queryKey: ['uses'],
    queryFn: userService.getAll,
  })

  return {
    users: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
