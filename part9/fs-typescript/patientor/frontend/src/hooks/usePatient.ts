import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { type EntryWithoutId, type Patient } from '../types'
import patientService from '../services/patients'
import { type NotificationType } from '../components/Notification'
import { useSetNotification } from './useNotification'

export function usePatient(id: Patient['id'] | undefined) {
  const queryClient = useQueryClient()
  const setNotification = useSetNotification()
  const result = useQuery({
    queryKey: ['patients', id],
    queryFn: () => (id ? patientService.get(id) : Promise.reject('No ID provided')),
    enabled: !!id,
    refetchOnWindowFocus: false,
  })

  const addEntryToPatientMutation = useMutation({
    mutationFn: (entry: EntryWithoutId) =>
      id ? patientService.createEntryForPatient(id, entry) : Promise.reject('No ID provided'),
    onError: error => {
      const notification: NotificationType = {
        message: error.message,
        type: 'error',
      }
      setNotification(notification)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['patients', id] })
    },
  })

  return {
    patient: result.data,
    isPending: result.isPending,
    isError: result.isError,
    addEntryToPatient: (entry: EntryWithoutId) => addEntryToPatientMutation.mutate(entry),
  }
}
