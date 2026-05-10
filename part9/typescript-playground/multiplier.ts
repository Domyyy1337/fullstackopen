interface MultiplyValues {
  value1: number
  value2: number
}

function parseArguments(args: string[]): MultiplyValues {
  if (args.length < 4) throw new Error('Not enough arguments')
  if (args.length > 4) throw new Error('Too many arguments')

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      value1: Number(args[2]),
      value2: Number(args[3]),
    }
  }

  throw new Error('Provided values were not numbers!')
}

export function multiplicator(a: number, b: number, printText: string) {
  console.log(printText, a * b)
}

// command line arguments start from process.argv[2]
const a: number = Number(process.argv[2])
const b: number = Number(process.argv[3])

if (process.argv[1] === import.meta.filename) {
  try {
    const { value1, value2 } = parseArguments(process.argv)
    multiplicator(value1, value2, `Multiplied ${a} and ${b}, the result is:`)
  } catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message
    }
    console.log(errorMessage)
  }
}
