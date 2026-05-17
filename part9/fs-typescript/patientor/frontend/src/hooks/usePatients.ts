import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import patientService from '../services/patients'
import { useSetNotification } from './useNotification'
import type { NotificationType } from '../components/Notification'
import type { PatientFormValues } from '../types'

export function usePatients() {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()
  const result = useQuery({
    queryKey: ['patients'],
    queryFn: patientService.getAll,
    refetchOnWindowFocus: false,
  })

  const addPatientMutation = useMutation({
    mutationFn: patientService.create,
    onError: error => {
      const notification: NotificationType = {
        message: error.message,
        type: 'error',
      }
      setNotification(notification)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients'] })
    },
  })

  return {
    patients: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addPatient: (patient: PatientFormValues) => addPatientMutation.mutate(patient),
  }
}
