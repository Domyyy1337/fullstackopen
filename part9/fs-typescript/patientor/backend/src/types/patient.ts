import z from "zod"
import { type Entry } from "./entry.ts"

export const Gender = {
  Male: 'male',
  Female: 'female',
  Other: 'other',
} as const
export const GenderSchema = z.enum(Gender)
export type Gender = z.infer<typeof GenderSchema>

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