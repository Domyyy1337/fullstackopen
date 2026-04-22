import { Button, Stack } from '@mui/material'

const Form = ({ onSubmit, children, title, buttonText }) => {
  return (
    <div>
      <Stack sx={{ alignItems: 'center' }}>
        <h2>{title}</h2>
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
