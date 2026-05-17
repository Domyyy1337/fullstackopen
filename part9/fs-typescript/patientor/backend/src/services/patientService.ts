import patientData from '../../data/patients.ts'
import type { Entry, NewEntry } from '../types/entry.ts'
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

function addEntryToPatient(patientId: Patient['id'], newEntry: NewEntry) {
  const entry: Entry = {
    id: crypto.randomUUID(),
    ...newEntry,
  }
  const patient = getPatientById(patientId)

  if (!patient) throw new Error('No patient with this ID found in database')

  patient.entries.push(entry)
  return entry
}

export default { getPatients, getNonSensitivePatients, addPatient, getPatientById, addEntryToPatient }
