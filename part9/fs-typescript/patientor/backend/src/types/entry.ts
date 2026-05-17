import z from 'zod'
import { DiagnosisSchema } from './diagnosis.ts'

export const DischargeSchema = z.object({
  date: z.iso.date(),
  criteria: z.string(),
})
export type Discharge = z.infer<typeof DischargeSchema>

export const SickLeaveSchema = z.object({
  startDate: z.iso.date(),
  endDate: z.iso.date(),
})
export type SickLeave = z.infer<typeof SickLeaveSchema>

export const BaseEntrySchema = z.object({
  id: z.string(),
  description: z.string(),
  date: z.iso.date(),
  specialist: z.string(),
  diagnosisCodes: DiagnosisSchema.shape.code.array().optional(),
})

const HealthCheckRating = {
  Healthy: 0,
  LowRisk: 1,
  HighRisk: 2,
  CriticalRisk: 3,
} as const
export const HealthCheckRatingSchema = z.enum(HealthCheckRating)
export type HealthCheckRating = z.infer<typeof HealthCheckRatingSchema>

export const HealthCheckEntrySchema = BaseEntrySchema.extend({
  type: z.literal('HealthCheck'),
  healthCheckRating: HealthCheckRatingSchema,
})
export type HealthCheckEntry = z.infer<typeof HealthCheckEntrySchema>

export const OccupationalHealthcareEntrySchema = BaseEntrySchema.extend({
  type: z.literal('OccupationalHealthcare'),
  employerName: z.string(),
  sickLeave: SickLeaveSchema.optional(),
})
export type OccupationalHealthcareEntry = z.infer<typeof OccupationalHealthcareEntrySchema>

export const HospitalEntrySchema = BaseEntrySchema.extend({
  type: z.literal('Hospital'),
  discharge: DischargeSchema,
})
export type HospitalEntry = z.infer<typeof HospitalEntrySchema>

export const EntrySchema = z.discriminatedUnion('type', [
  HealthCheckEntrySchema,
  OccupationalHealthcareEntrySchema,
  HospitalEntrySchema,
])
export type Entry = z.infer<typeof EntrySchema>

// export const NewEntrySchema = BaseEntrySchema.omit({ id: true })
// export type NewEntry = z.infer<typeof NewEntrySchema>

export const NewOccupationalHealthcareEntrySchema = OccupationalHealthcareEntrySchema.omit({ id: true })
export type NewOccupationalHealthcareEntry = z.infer<typeof NewOccupationalHealthcareEntrySchema>

export const NewHealthCheckEntrySchema = HealthCheckEntrySchema.omit({id: true})
export type NewHealthCheckEntry = z.infer<typeof NewHealthCheckEntrySchema>

export const NewHospitalEntrySchema = HospitalEntrySchema.omit({id: true})
export type NewHospitalEntry = z.infer<typeof NewHospitalEntrySchema>

// Define special omit for unions
// type UnionOmit<T, K extends string | number | symbol> = T extends unknown ? Omit<TaskController, K> : never
// Define entry without the 'id' property
// export type EntryWithoutId = UnionOmit<Entry, 'id'>
