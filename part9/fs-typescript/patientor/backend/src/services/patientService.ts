import patientData from '../../data/patients.ts'
import type { NewPatient, NonSensitivePatient, Patient } from '../types/patient.ts'

function getPatients(): Patient[] {
  return patientData
}

function getPatientById(id: string) {
  return patientData.find(p => p.id === id)
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
    entries: [],
    ...patient,
  }

  patientData.push(newPatient)
  return newPatient
}

export default { getPatients, getNonSensitivePatients, addPatient, getPatientById }
