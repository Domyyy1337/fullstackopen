import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom'
import { Button, Divider, Container, Typography } from '@mui/material'
import PatientListPage from './components/PatientListPage'
import PatientDetail from './components/PatientDetailPage/index'

const App = () => {

  return (
    <div className='App'>
      <Router>
        <Container>
          <Typography variant='h3' sx={{ marginBottom: '0.5em' }}>
            Patientor
          </Typography>
          <Button component={Link} to='/' variant='contained' color='primary'>
            Home
          </Button>
          <Divider sx={{ marginY: 2 }} />
          <Routes>
            <Route path='/' element={<PatientListPage />} />
            <Route path='/patients/:id' element={<PatientDetail />} />
          </Routes>
        </Container>
      </Router>
    </div>
  )
}

export default App
