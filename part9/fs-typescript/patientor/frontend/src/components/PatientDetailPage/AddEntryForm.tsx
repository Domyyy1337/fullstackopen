import { Box, Button, Chip, Container, MenuItem, Select, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import {
  type Diagnosis,
  type Discharge,
  type EntryType,
  entryTypeOptions,
  type EntryWithoutId,
  HealthCheckRating,
  healthCheckRatingOptions,
  type Patient,
  type SickLeave,
} from '../../types'
import Notification from '../Notification'
import { usePatient } from '../../hooks/usePatient'
import { assertNever } from '../../utils'
import { useDiagnosisCodes } from '../../hooks/useDiagnosisCodes'

interface AddEntryFormProps {
  patient: Patient
}

export default function AddEntryForm({ patient }: AddEntryFormProps) {
  const today = new Date().toISOString().split('T')[0]
  const [date, setDate] = useState(today)
  const [description, setDescription] = useState('')
  const [specialist, setSpecialist] = useState('')
  const [rating, setRating] = useState<HealthCheckRating>(0)
  const [diagnosisCodes, setDiagnosisCodes] = useState<Diagnosis['code'][]>([])
  const [type, setType] = useState<EntryType>('HealthCheck')
  const [employer, setEmployer] = useState('')
  const [discharge, setDischarge] = useState<Discharge>({
    date: today,
    criteria: '',
  })
  const [sickLeave, setSickLeave] = useState<SickLeave>({
    startDate: '',
    endDate: '',
  })

  const { addEntryToPatient } = usePatient(patient.id)
  const {
    diagnosisCodes: allDiagnosisCodes,
    isError: diagnosesIsError,
    isPending: diagnosesIsPending,
  } = useDiagnosisCodes()

  if (diagnosesIsError) return <div>error fetching diagnoses codes required for form...</div>
  if (diagnosesIsPending) return <div>loading diagnoses codes required for form ...</div>

  const options = Object.keys(entryTypeOptions) as EntryType[]

  function resetFields() {
    setDate('')
    setDescription('')
    setSpecialist('')
    setRating(0)
    setDiagnosisCodes([])
    setEmployer('')
  }

  function handleCancel(e: React.SyntheticEvent) {
    e.preventDefault()
    resetFields()
  }

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault()

    let newEntry: EntryWithoutId

    switch (type) {
      case 'Hospital':
        newEntry = {
          type: 'Hospital',
          description,
          specialist,
          date,
          diagnosisCodes: diagnosisCodes ? diagnosisCodes : undefined,
          discharge,
        }
        break
      case 'OccupationalHealthcare':
        newEntry = {
          type: 'OccupationalHealthcare',
          description,
          specialist,
          date,
          diagnosisCodes,
          employerName: employer,
          ...(sickLeave.startDate && sickLeave.endDate ? { sickLeave } : {}),
        }
        break
      case 'HealthCheck':
        newEntry = {
          type: 'HealthCheck',
          description,
          specialist,
          date,
          healthCheckRating: rating as HealthCheckRating,
          diagnosisCodes,
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
        <TextField
          slotProps={{ inputLabel: { shrink: true } }}
          type='date'
          variant='outlined'
          label='Date*'
          value={date}
          onChange={e => setDate(e.target.value)}
        />
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
          <>
            <Select
              label='Health Check Rating'
              value={rating}
              onChange={e => setRating(Number(e.target.value) as HealthCheckRating)}>
              {Object.values(HealthCheckRating).map(o => (
                <MenuItem key={o} value={o}>
                  {healthCheckRatingOptions[o]}
                </MenuItem>
              ))}
            </Select>
          </>
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
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
              variant='outlined'
              label='Start of sick leave'
              value={sickLeave.startDate}
              onChange={e => setSickLeave({ ...sickLeave, startDate: e.target.value })}
            />
            <TextField
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
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
              type='date'
              slotProps={{ inputLabel: { shrink: true } }}
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
        <Select
          multiple
          value={diagnosisCodes}
          onChange={e =>
            setDiagnosisCodes(typeof e.target.value === 'string' ? e.target.value.split(',') : e.target.value)
          }
          renderValue={selected => (
            <Box sx={{ display: 'flex', gap: '0.5rem' }}>
              {selected.map(v => (
                <Chip key={v} label={v} />
              ))}
            </Box>
          )}>
          {allDiagnosisCodes &&
            allDiagnosisCodes.map(d => (
              <MenuItem key={d.code} value={d.code}>
                {d.code} - {d.name}
              </MenuItem>
            ))}
        </Select>
        {/* <TextField
          variant='outlined'
          label='Diagnosis Codes (comma-separated)'
          value={diagnosisCodes}
          onChange={e => setDiagnosisCodes(e.target.value)}
        /> */}

        <Container sx={{ display: 'flex', gap: '1.5rem' }} disableGutters>
          <Button variant='contained' type='submit' onClick={handleSubmit}>
            Add New Entry
          </Button>
          <Button variant='outlined' onClick={handleCancel}>
            cancel
          </Button>
        </Container>
      </Container>
    </form>
  )
}
