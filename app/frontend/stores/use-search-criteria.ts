import { computed } from 'vue'

import { searchCriteria } from './nano'
import { Criteria } from '~/types'

import { useDateUtil } from '~/composables'

export function useSearchCriteria() {
  const criteria = computed<Criteria, string>({
    get() {
      return JSON.parse(searchCriteria.get()) as Criteria
    },
    set(value: string) {
      searchCriteria.set(value)
    },
  })

  const date = computed<string | null>(() => {
    const { isValidDate } = useDateUtil()

    return isValidDate(criteria.value.word) ? criteria.value.word : null
  })

  /*
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
  */

  return { criteria, date /* getCriteria, setCriteria, getDateValue */ }
}
