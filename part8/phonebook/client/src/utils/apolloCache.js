import { ALL_PERSONS } from '../queries'

export function addPersonToCache(cache, personToAdd) {
  cache.updateQuery({ query: ALL_PERSONS }, ({ allPersons }) => {
    const personExists = allPersons.some(p => p.id === personToAdd.id)

    if (personExists) return { allPersons }

    return { allPersons: allPersons.concat(personToAdd) }
  })
}
