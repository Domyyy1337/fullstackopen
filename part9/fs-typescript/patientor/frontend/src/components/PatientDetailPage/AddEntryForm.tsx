import { Button, Container, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import {
  type Discharge,
  type EntryType,
  entryTypeOptions,
  type EntryWithoutId,
  HealthCheckRating,
  type Patient,
  type SickLeave,
} from '../../types'
import { useSetNotification } from '../../hooks/useNotification'
import Notification from '../Notification'
import { usePatient } from '../../hooks/usePatient'
import { assertNever } from '../../utils'

interface AddEntryFormProps {
  patient: Patient
}

export default function AddEntryForm({ patient }: AddEntryFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [rating, setRating] = useState(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState('')
  const [type, setType] = useState<EntryType>('Hospital')
  const [employer, setEmployer] = useState('')
  const [discharge, setDischarge] = useState<Discharge>({
    date: today,
    criteria: '',
  })
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  })
  const notify = useSetNotification()
  const { addEntryToPatient } = usePatient(patient.id)

  const options = Object.keys(entryTypeOptions) as EntryType[]

  function resetFields() {
    setDate('')
    setDescription('')
    setSpecialist('')
    setRating(0)
    setDiagnosisCodes('')
    setEmployer('')
  }

  function handleCancel(e: React.SyntheticEvent) {
    e.preventDefault()
    resetFields()
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    const validRatings = Object.values(HealthCheckRating)
    if (!validRatings.includes(rating as HealthCheckRating)) {
      notify({ message: 'Invalid rating', type: 'error' })
      return
    }

    const diagnosisArray = diagnosisCodes.split(', ')

    let newEntry: EntryWithoutId

    switch (type) {
      case 'Hospital':
        newEntry = {
          type: 'Hospital',
          description,
          specialist,
          date,
          diagnosisCodes: diagnosisArray,
          discharge,
        }
        break
      case 'OccupationalHealthcare':
        newEntry = {
          type: 'OccupationalHealthcare',
          description,
          specialist,
          date,
          diagnosisCodes: diagnosisArray,
          employerName: employer,
          sickLeave,
        }
        break
      case 'HealthCheck':
        newEntry = {
          type: 'HealthCheck',
          description,
          specialist,
          date,
          healthCheckRating: rating as HealthCheckRating,
          diagnosisCodes: diagnosisArray,
        }
        break
      default:
        assertNever(type)
    }

    addEntryToPatient(newEntry)
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
      <Typography variant='h2'>New Entry</Typography>
      <Select label='Entry Type' value={type} onChange={e => setType(e.target.value)}>
        {options.map(o => (
          <MenuItem key={o} value={o}>
            {entryTypeOptions[o]}
          </MenuItem>
        ))}
      </Select>
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

        {type === 'HealthCheck' && (
          <TextField
            variant='outlined'
            label='Health Check Rating (0-3)*'
            value={rating}
            onChange={e => setRating(Number(e.target.value))}
          />
        )}
        {type === 'OccupationalHealthcare' && (
          <>
            <TextField
              variant='outlined'
              label='Employer name*'
              value={employer}
              onChange={e => setEmployer(e.target.value)}
            />
            <TextField
              variant='outlined'
              label='Start of sick leave'
              value={sickLeave.startDate}
              onChange={e => setSickLeave({ ...sickLeave, startDate: e.target.value })}
            />
            <TextField
              variant='outlined'
              label='End of sick leave'
              value={sickLeave.endDate}
              onChange={e => setSickLeave({ ...sickLeave, endDate: e.target.value })}
            />
          </>
        )}
        {type === 'Hospital' && (
          <>
            <TextField
              value={discharge.date}
              label='Date of discharge'
              onChange={e => setDischarge({ ...discharge, date: e.target.value })}
            />
            <TextField
              value={discharge.criteria}
              label='Criteria of discharge'
              onChange={e => setDischarge({ ...discharge, criteria: e.target.value })}
            />
          </>
        )}
        <TextField
          variant='outlined'
          label='Diagnosis Codes (comma-separated)'
          value={diagnosisCodes}
          onChange={e => setDiagnosisCodes(e.target.value)}
        />

        <Container sx={{ display: 'flex', gap: '1.5rem' }} disableGutters>
          <Button variant='contained' type='submit' onClick={handleSubmit}>
            add
          </Button>
          <Button variant='outlined' onClick={handleCancel}>
            cancel
          </Button>
        </Container>
      </Container>
    </form>
  )
}
