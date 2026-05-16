import { Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Entry } from '../../types'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'
import { useDiagnosisCodes } from '../../hooks/useDiagnosisCodes'

interface PatientEntryProps {
  entry: Entry
}

export default function PatientEntry({ entry }: PatientEntryProps) {
  const { diagnosisCodes, isError, isPending } = useDiagnosisCodes()

  if (isPending) return <Typography variant='body1'>loading diagnosis information ...</Typography>

  return (
    <Container>
      <Typography variant='body1'>
        {entry.date} <i>{entry.description}</i>
      </Typography>
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
