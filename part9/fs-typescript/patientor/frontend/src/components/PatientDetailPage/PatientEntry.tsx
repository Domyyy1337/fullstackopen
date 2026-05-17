import { Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import type { Entry, HealthCheckEntry } from '../../types'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import { useDiagnosisCodes } from '../../hooks/useDiagnosisCodes'
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation'
import WorkIcon from '@mui/icons-material/Work'
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { assertNever } from '../../utils'

interface PatientEntryProps {
  entry: Entry
}

export default function PatientEntry({ entry }: PatientEntryProps) {
  const { diagnosisCodes, isError, isPending } = useDiagnosisCodes()
  if (isPending) return <Typography variant='body1'>loading diagnosis information ...</Typography>

  return (
    <Container sx={{ border: '1px solid black', borderRadius: '10px', padding: '1rem' }}>
      <Container>
        <Typography variant='body1'>
          {entry.date} {entryLogo(entry.type)} {entry.type === 'OccupationalHealthcare' && <i>{entry.employerName}</i>}
        </Typography>
        <Typography variant='body1'>
          <i>{entry.description}</i>
        </Typography>
        {entry.type === 'HealthCheck' && healthLogo(entry.healthCheckRating)}
        <Typography variant='body1'>diagnose by {entry.specialist}</Typography>
      </Container>
      <List>
        {entry.diagnosisCodes?.map(d => (
          <ListItem key={d}>
            <ListItemIcon>
              <HealthAndSafetyIcon />
            </ListItemIcon>
            <ListItemText>
              {d} {isError ? 'Error loading Diagnosis detail' : `${diagnosisCodes?.find(c => c.code === d)?.name}`}
            </ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}

function entryLogo(entryType: Entry['type']) {
  switch (entryType) {
    case 'Hospital':
      return <MedicationLiquidIcon />
    case 'OccupationalHealthcare':
      return <WorkIcon />
    case 'HealthCheck':
      return <MedicalInformationIcon />
    default:
      assertNever(entryType)
  }
}

function healthLogo(rating: HealthCheckEntry['healthCheckRating']) {
  let color: 'error' | 'warning' | 'info' | 'success'

  switch (rating) {
    case 3:
      color = 'error'
      break
    case 2:
      color = 'warning'
      break
    case 1:
      color = 'warning'
      break
    case 0:
      color = 'success'
      break
    default:
      assertNever(rating)
  }

  return <FavoriteIcon color={color} />
}
