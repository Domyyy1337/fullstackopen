import patientData from '../../data/patients.ts'
import type { NewPatient, NonSensitivePatient, Patient } from '../types.ts'

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

function addPatient(patient: NewPatient): Patient {
  const newPatient: Patient = {
    id: crypto.randomUUID(),
    ...patient,
  }

  patientData.push(newPatient)
  return newPatient
}

export default { getPatients, getNonSensitivePatients, addPatient }
