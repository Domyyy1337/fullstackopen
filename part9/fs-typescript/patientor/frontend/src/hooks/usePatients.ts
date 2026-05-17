import { useMutation, useQuery } from '@tanstack/react-query'
import patientService from '../services/patients'

export function usePatients() {
  const result = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
    refetchOnWindowFocus: false,
  })

  const addPatientMutation = useMutation({
    mutationFn: patientService.create,
    // onError: (error) => {

    // }
  })

  return {
    patients: result.data,
    isPending: result.isPending,
    isError: result.isError,
  }
}
