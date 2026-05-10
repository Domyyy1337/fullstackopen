interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

function calculateExercises(dailyExerciseHours: number[], dailyTargetAmount: number): ExerciseResult {
  const average = dailyExerciseHours.reduce((total, x) => (total += x), 0) / dailyExerciseHours.length
  const success = average >= dailyTargetAmount
  const baseRating = Math.floor((average / dailyTargetAmount) * 3)
  const rating = baseRating > 3 ? 3 : baseRating

  return {
    periodLength: dailyExerciseHours.length,
    trainingDays: dailyExerciseHours.reduce((total, x) => (x > 0 ? total + 1 : total), 0),
    success,
    rating,
    ratingDescription: describeRating(rating),
    target: dailyTargetAmount,
    average,
  }
}

function describeRating(rating: number): string {
  if (rating >= 3) return 'perfect, you achieved your goals!'
  if (rating >= 2) return 'not too bad, but could be better'
  if (rating >= 1) return 'you barely even tried'
  return 'very poor. Start exercising now.'
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
