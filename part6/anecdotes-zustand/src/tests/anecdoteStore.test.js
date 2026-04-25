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
})
