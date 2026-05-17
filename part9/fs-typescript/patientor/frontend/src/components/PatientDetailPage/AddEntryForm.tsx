import { Button, Container, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import patientService from '../../services/patients'
import { type EntryWithoutId, HealthCheckRating, type Patient } from '../../types'
import { useSetNotification } from '../../hooks/useNotification'
import Notification from '../Notification'

interface AddEntryFormProps {
  patient: Patient
}

export default function AddEntryForm({ patient }: AddEntryFormProps) {
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [rating, setRating] = useState(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState('')
  const notify = useSetNotification()

  function resetFields() {
    setDate('')
    setDescription('')
    setSpecialist('')
    setRating(0)
    setDiagnosisCodes('')
  }

  function cancel(e: React.SyntheticEvent) {
    e.preventDefault()
    resetFields()
  }

  async function submit(e: React.SyntheticEvent) {
    e.preventDefault()

    const validRatings = Object.values(HealthCheckRating)
    if (!validRatings.includes(rating as HealthCheckRating)) {
      notify({ message: 'Invalid rating', type: 'error' })
      return
    }

    const diagnosisArray = diagnosisCodes.split(', ')
    const newEntry: EntryWithoutId = {
      type: 'HealthCheck',
      description,
      specialist,
      date,
      healthCheckRating: rating as HealthCheckRating,
      diagnosisCodes: diagnosisArray,
    }
    try {
      await patientService.createEntryForPatient(patient.id, newEntry)
    } catch (error: unknown) {
      if (error instanceof Error) {
        return notify({ message: error.message, type: 'error' })
      }
    }
  }

  return (
    <form
      style={{
        border: '2px dotted black',
        padding: '1rem',
        borderRadius: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
      <Typography variant='h2'>New HealthCheck Entry</Typography>
      <Notification />
      <Container sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <TextField variant='outlined' label='Date*' value={date} onChange={e => setDate(e.target.value)} />
        <TextField
          variant='outlined'
          label='Description*'
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Specialist*'
          value={specialist}
          onChange={e => setSpecialist(e.target.value)}
        />
        <TextField
          variant='outlined'
          label='Health Check Rating (0-3)*'
          value={rating}
          onChange={e => setRating(Number(e.target.value))}
        />
        <TextField
          variant='outlined'
          label='Diagnosis Codes (comma-separated)'
          value={diagnosisCodes}
          onChange={e => setDiagnosisCodes(e.target.value)}
        />
        <Container sx={{ display: 'flex', gap: '1.5rem' }} disableGutters>
          <Button variant='contained' type='submit' onClick={submit}>
            add
          </Button>
          <Button variant='outlined' onClick={cancel}>
            cancel
          </Button>
        </Container>
      </Container>
    </form>
  )
}
