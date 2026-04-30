import React from 'react'
import { Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <Container sx={{ display: 'flex', alignItems: 'center', flexFlow: 'column nowrap', gap: '2rem' }}>
      <Typography variant='h2'>404 - not found</Typography>
      <Button variant='contained' component={Link} to='/'>Main Page</Button>
    </Container>
  )
}
