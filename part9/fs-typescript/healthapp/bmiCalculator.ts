interface BmiInputs {
  height: number
  weight: number
}

function parseArguments(args: string[]): BmiInputs {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    }
  }

  throw new Error('Provided values were not numbers!')
}

export function calculateBmi(height: number, weight: number): string {
  const bmi = weight / (height / 100) ** 2

  if (bmi < 16) return 'Underweight (Severe thinness)'
  if (bmi < 17) return 'Underweight (Moderate thinness)'
  if (bmi < 18.5) return 'Underweight (Mild thinness)'
  if (bmi < 25) return 'Normal range'
  if (bmi < 30) return 'Overweight (Pre-obese)'
  if (bmi < 35) return 'Obese (Class I)'
  if (bmi < 40) return 'Obese (Class II)'
  if (bmi >= 40) return 'Obese (Class III)'

  throw new Error('invalid BMI')
}

if (process.argv[1] === import.meta.filename) {
  try {
    const { height, weight } = parseArguments(process.argv)
    console.log(calculateBmi(height, weight))
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened'
    if (error instanceof Error) {
      errorMessage += 'Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
