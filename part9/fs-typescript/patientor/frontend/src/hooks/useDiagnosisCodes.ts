import { useQuery } from '@tanstack/react-query'
import diagnosisService from '../services/diagnoses'

export function useDiagnosisCodes() {
  // const queryClient = useQueryClient()
  const result = useQuery({
    queryKey: ['diagnosisCodes'],
    queryFn: diagnosisService.getAll,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  })

  return {
    diagnosisCodes: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
