import { vi, beforeEach, describe, it, expect } from 'vitest'
import { renderHook, act } from '@testing-library/react'

vi.mock('../services/anecdotes', () => ({
  default: {
    getAll: vi.fn(),
    create: vi.fn(),
    update: vi.fn(),
    remove: vi.fn(),
  },
}))

import anecdoteService from '../services/anecdotes'
import useAnecdoteStore, { useAnecdoteActions, useAnecdotes } from '../store/anecdoteStore'

beforeEach(() => {
  useAnecdoteStore.setState({ anecdotes: [], filter: '' })
})

describe('useAnecdoteActions', () => {
  it('state is initialized with anecdotes returned by backend', async () => {
    const mockAnecdotes = [{ id: 1, votes: 0, content: 'Test' }]
    anecdoteService.getAll.mockResolvedValue(mockAnecdotes)

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => await result.current.initialize())

    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    expect(anecdotesResult.current).toEqual(mockAnecdotes)
  })

  it('increases votes after being voted', async () => {
    const mockAnecdote = { id: 1, votes: 0, content: 'Test' }
    useAnecdoteStore.setState({ anecdotes: [mockAnecdote] })
    anecdoteService.update.mockResolvedValue({ ...mockAnecdote, votes: 1 })

    const { result } = renderHook(() => useAnecdoteActions())

    await act(async () => await result.current.vote(1))

    const {result: anecdoteResult} = renderHook(() => useAnecdotes())

    expect(anecdoteResult.current[0].votes).toEqual(1)
    
  })
})

describe('useAnecdotes', () => {
  it('sorts anecdotes by votes', () => {
    const mockAnecdotes = [
      { id: 1, votes: 2, content: 'A' },
      { id: 2, votes: 3, content: 'B' },
      { id: 3, votes: 1, content: 'C' },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toStrictEqual(mockAnecdotes.toSorted((a, b) => b.votes - a.votes))
  })

  it('properly filters list of anecdotes', () => {
    const mockAnecdotes = [
      { id: 1, votes: 2, content: 'Hello' },
      { id: 2, votes: 3, content: 'Maddening' },
      { id: 3, votes: 1, content: 'My Guy' },
    ]
    useAnecdoteStore.setState({ anecdotes: mockAnecdotes, filter: 'e' })

    const { result } = renderHook(() => useAnecdotes())

    expect(result.current).toContainEqual(mockAnecdotes[0])
    expect(result.current).toContainEqual(mockAnecdotes[1])
    expect(result.current).not.toContainEqual(mockAnecdotes[2])
  })
})
