import { create } from 'zustand'

const initialFeedback = { good: 0, neutral: 0, bad: 0 }

const useFeedbackStore = create(set => ({
  feedback: initialFeedback,
  actions: {
    rateGood: () => set(state => ({ feedback: { ...state.feedback, good: state.feedback.good + 1 } })),
    rateNeutral: () => set(state => ({ feedback: { ...state.feedback, neutral: state.feedback.neutral + 1 } })),
    rateBad: () => set(state => ({ feedback: { ...state.feedback, bad: state.feedback.bad + 1 } })),
  },
}))

export const useFeedbackStats = () => {
  const { good, neutral, bad } = useFeedbackStore(state => state.feedback)
  const all = good + neutral + bad
  const average = all === 0 ? 0 : (good - bad) / all
  const positive = all === 0 ? 0 : good / all

  return { good, neutral, bad, all, average, positive }
}

export const useFeedBackControls = () => useFeedbackStore(state => state.actions)
