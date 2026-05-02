import { Container, List, ListItem, Typography } from '@mui/material'
import React from 'react'
import { useParams } from 'react-router-dom'
import useUser from '../hooks/useUser'

export default function User() {
  const { id } = useParams()
  const { user, isPending, isError } = useUser(id)

  if (isPending) return <Typography variant='body1'>fetching user...</Typography>
  if (isError) throw new Error('failed fetching user')

  return (
    <Container>
      <Typography variant='h2'>{user.name}</Typography>
      <Container>
        {user.blogs.length === 0 ? (
          <Typography variant='body1'>this user has no blogs</Typography>
        ) : (
          <>
            <Typography variant='h3'>added blogs</Typography>
            <List>
              {user.blogs.map(blog => (
                <ListItem key={blog.id}>{blog.title}</ListItem>
              ))}
            </List>
          </>
        )}
      </Container>
    </Container>
  )
}
