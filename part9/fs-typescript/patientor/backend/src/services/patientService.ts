import patientData from '../../data/patients.ts'
import { type NonSensitivePatient, type Patient } from '../types.ts'

function getPatients(): Patient[] {
  return patientData
}

function getNonSensitivePatients(): NonSensitivePatient[] {
  return patientData.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

export default { getPatients, getNonSensitivePatients }
