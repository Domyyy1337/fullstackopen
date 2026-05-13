import { type Diagnosis } from '../types.ts'
import diagnosisData from '../../data/diagnoses.ts'

function getDiagnoses(): Diagnosis[] {
  return diagnosisData
}

export default { getDiagnoses }
