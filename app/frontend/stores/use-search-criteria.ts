import { searchCriteria } from './nano'
import { Criteria } from '~/types'

export function useSearchCriteria() {
  const getCriteria = (): Criteria => {
    return JSON.parse(searchCriteria.get()) as Criteria
  }

  const setCriteria = (criteria: string): void => {
    searchCriteria.set(criteria)
  }

  return { getCriteria, setCriteria }
}
