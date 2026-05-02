import { Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import useUsers from '../hooks/useUsers'
import { Link, useNavigate } from 'react-router-dom'

export default function Users() {
  const { users, isPending, isError } = useUsers()
  const navigate = useNavigate()

  if (isPending) return <Typography variant='body1'>fetching users...</Typography>
  if (isError) throw new Error('Failed fetching users')

  return (
    <Container>
      <Typography variant='h3'>Users</Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Username</TableCell>
            <TableCell>Blogs created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map(user => (
            <TableRow key={user.id} onClick={() => navigate(`/users/${user.id}`)}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.username}</TableCell>
              <TableCell>{user.blogs ? user.blogs.length : 0}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Container>
  )
}
