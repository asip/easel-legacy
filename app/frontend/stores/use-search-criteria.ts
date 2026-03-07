import { computed } from '@vue/reactivity'

import { searchCriteria } from './nano'
import { Criteria } from '~/types'

import { useDate } from '~/composables'

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
    const { isValidDate } = useDate()

    const value = criteria.value.word ?? ''
    return isValidDate(value) ? value : null
  })

  return { criteria, date: date.value /* getCriteria, setCriteria, getDateValue */ }
}
