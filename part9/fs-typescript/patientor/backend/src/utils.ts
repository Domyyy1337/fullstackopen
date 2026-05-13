import { type NewPatient, Gender } from './types.ts'

export function parsePatient(object: unknown): NewPatient {
  if (!object || typeof object !== 'object') throw new Error('Incorrect or missing data')

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    const newPatient: NewPatient = {
      name: parseName(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseSsn(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseOccupation(object.occupation),
    }
    return newPatient
  }

  throw new Error('Incorrect data: some fields are missing')
}

function parseName(name: unknown): string {
  if (!isString(name)) throw new Error('Incorrect name')

  return name
}

function parseDateOfBirth(dob: unknown): string {
  if (!isString(dob) || !isDate(dob)) throw new Error('Incorrect date')

  return dob
}

function parseSsn(ssn: unknown): string {
  if (!isString(ssn)) throw new Error('incorrect ssn')

  return ssn
}

function parseOccupation(occupation: unknown): string {
  if (!isString(occupation)) throw new Error('incorrect occupation')

  return occupation
}

function parseGender(gender: unknown): Gender {
  if (!isString(gender) || !isGender(gender)) throw new Error('incorrect gender')

  return gender
}

function isString(text: unknown): text is string {
  return typeof text === 'string' || text instanceof String
}

function isDate(date: string): boolean {
  return Boolean(Date.parse(date))
}

function isGender(gender: string): gender is Gender {
  return (Object.values(Gender) as string[]).includes(gender)
}
