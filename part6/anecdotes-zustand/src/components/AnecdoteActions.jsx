import React from 'react'
import { useAnecdoteActions } from '../store/anecdoteStore'
import { useNotificationActions } from '../store/notificationStore'

export default function AnecdoteActions() {
  const { removeUnpopular } = useAnecdoteActions()
  const { setNotification } = useNotificationActions()

  async function handleRemove() {
    const amount = await removeUnpopular()
    const message = amount > 0 ? `Unpopular anecdotes removed (${amount} total)` : 'No unpopular anecdotes exist'
    setNotification(message)
  }

  return (
    <div>
      <h2>actions</h2>
      <div>
        <button onClick={handleRemove}>remove unpopular</button>
      </div>
    </div>
  )
}
