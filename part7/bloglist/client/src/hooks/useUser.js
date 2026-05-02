import { useQuery } from '@tanstack/react-query'
import userService from '../services/users'

export default function useUser(id) {
  const result = useQuery({
    queryKey: ['users', id],
    queryFn: async () => await userService.get(id),
  })

  return {
    user: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
