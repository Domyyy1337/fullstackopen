import { Container, Typography } from '@mui/material'
import type { Patient } from '../../types'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import patientService from '../../services/patients'
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import TransgenderIcon from '@mui/icons-material/Transgender'
import PatientEntry from './PatientEntry'
import AddEntryForm from './AddEntryForm'

export default function PatientDetail() {
  const { id } = useParams()
  const [patient, setPatient] = useState<Patient | null>(null)

  useEffect(() => {
    if (!id) return
    patientService.get(id).then(fetchedPatient => setPatient(fetchedPatient))
  }, [id])

  if (!id || !patient) return null

  return (
    <Container>
      <Container sx={{ display: 'flex', gap: '1rem' }}>
        <Typography variant='h2'>{patient.name}</Typography>
        {(() => {
          switch (patient.gender) {
            case 'male':
              return <MaleIcon />
            case 'female':
              return <FemaleIcon />
            default:
              return <TransgenderIcon />
          }
        })()}
      </Container>
      <Container>
        <Typography variant='body1'>ssn: {patient.ssn}</Typography>
        <Typography variant='body1'>occupation: {patient.occupation}</Typography>
        {patient.dateOfBirth && <Typography variant='body1'>date of birth: {patient.dateOfBirth}</Typography>}
      </Container>
      <Container>
        <AddEntryForm patient={patient} />
      </Container>
      <Container sx={{ marginTop: '2rem' }}>
        <Typography variant='h3'>entries</Typography>
        <Container sx={{ display: 'flex', flexFlow: 'column wrap', gap: '1rem' }}>
          {patient.entries.length > 0 ? (
            patient.entries.map(e => <PatientEntry key={e.id} entry={e} />)
          ) : (
            <Typography variant='body1'>There are no entries for this patient yet.</Typography>
          )}
        </Container>
      </Container>
    </Container>
  )
}
