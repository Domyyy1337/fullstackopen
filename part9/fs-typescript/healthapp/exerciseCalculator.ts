interface ExerciseResult {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}

interface ExerciseInput {
  dailyTargetAmount: number
  dailyExerciseHours: number[]
}

function parseArguments(args: string[]): ExerciseInput {
  if (args.length < 4) throw new Error('Not enough arguments')

  const dailyTargetAmount = Number(args[2])
  const dailyExerciseHours = args.slice(3).map(h => Number(h))

  if (!isNaN(dailyTargetAmount) && dailyExerciseHours.every(h => !isNaN(h))) {
    return {
      dailyTargetAmount,
      dailyExerciseHours,
    }
  }

  throw new Error('Provided values were not numbers!')
}

export function calculateExercises(dailyExerciseHours: number[], dailyTargetAmount: number): ExerciseResult {
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

try {
  const { dailyExerciseHours, dailyTargetAmount } = parseArguments(process.argv)
  console.log(calculateExercises(dailyExerciseHours, dailyTargetAmount))
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += 'Error: ' + error.message
  }
  console.log(errorMessage)
}
