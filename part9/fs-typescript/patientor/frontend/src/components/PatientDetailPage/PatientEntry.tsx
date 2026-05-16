import { Container, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material'
import { Entry } from '../../types'
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety'

interface PatientEntryProps {
  entry: Entry
}

export default function PatientEntry({ entry }: PatientEntryProps) {
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
            <ListItemText>{d}</ListItemText>
          </ListItem>
        ))}
      </List>
    </Container>
  )
}
