import { searchCriteria } from './nano'
import { Criteria } from '~/types'

import { useDateUtil } from '~/composables'

export function useSearchCriteria() {
  const getCriteria = (): Criteria => {
    return JSON.parse(searchCriteria.get()) as Criteria
  }

  const setCriteria = (criteria: string): void => {
    searchCriteria.set(criteria)
  }

  const getDateValue = (): string | null => {
    const { isValidDate } = useDateUtil()

    const criteria: Criteria = getCriteria()
    return isValidDate(criteria.word) ? criteria.word : null
  }

  return { getCriteria, setCriteria, getDateValue }
}
