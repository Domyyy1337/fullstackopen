import { Button, Container, Typography } from '@mui/material'
import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, info) {
    console.error('ErrorBoundary cought an error', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Container sx={{ display: 'flex', flexFlow: 'column nowrap', gap: '2rem', alignItems: 'center' }}>
          <Typography variant='h2'>Something went wrong.</Typography>
          <Typography variant='body1'>{this.state.error.message}</Typography>
          <Button onClick={() => this.setState({ hasError: false, error: null })} variant='contained'>
            try again
          </Button>
        </Container>
      )
    }

    return this.props.children
  }
}
