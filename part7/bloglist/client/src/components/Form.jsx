import { Button, Stack, Typography } from '@mui/material'

const Form = ({ onSubmit, children, title, buttonText }) => {
  return (
    <div>
      <Stack sx={{ alignItems: 'center' }}>
        <Typography variant='h2' style={{ fontSize: '2rem', marginBottom: '1rem' }}>
          {title}
        </Typography>
        <form onSubmit={onSubmit} style={{ minWidth: '30vw' }}>
          <Stack spacing={4}>
            {children}
            <Button type='submit' variant='contained'>
              {buttonText}
            </Button>
          </Stack>
        </form>
      </Stack>
    </div>
  )
}

export default Form
