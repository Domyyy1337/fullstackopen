import z from 'zod'

export type Diagnosis = {
  code: string
  name: string
  latin?: string
}

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const
export type Gender = (typeof Gender)[keyof typeof Gender]

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
})

export type NewPatient = z.infer<typeof NewPatientSchema>

export interface Patient extends NewPatient {
  id: string
  entries: Entry[]
}

export type NonSensitivePatient = Omit<Patient, 'ssn' | 'entries'>

interface BaseEntry {
  id: string
  description: string
  date: string
  specialist: string
  diagnosisCodes?: Array<Diagnosis['code']>
}

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const

type HealthCheckRating = (typeof HealthCheckRating)[keyof typeof HealthCheckRating]

interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck'
  healthCheckRating: HealthCheckRating
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare'
  employerName: string
  sickLeave?: SickLeave
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital'
  discharge: Discharge
}

interface SickLeave {
  startDate: string
  endDate: string
}

interface Discharge {
  date: string
  criteria: string
}

export type Entry = HospitalEntry | OccupationalHealthcareEntry | HealthCheckEntry

// Define special omit for unions
type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<TaskController, K> : never
// Define entry without the 'id' property
export type EntryWithoutId = UnionOmit<Entry, 'id'>
