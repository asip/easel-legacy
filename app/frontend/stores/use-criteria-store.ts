import { computed } from '@vue/reactivity'

import { $criteria } from './nano'
import { Criteria } from '~/types'

import { useDate } from '~/composables'

export function useCriteriaStore() {
  const criteria = computed<Criteria, string>({
    get() {
      return JSON.parse($criteria.get()) as Criteria
    },
    set(value: string) {
      $criteria.set(value)
    },
  })

  const date = computed<string | null>(() => {
    const { isValidDate } = useDate()

    const value = criteria.value.word ?? ''
    return isValidDate(value) ? value : null
  })

  return { criteria, date: date.value /* getCriteria, setCriteria, getDateValue */ }
}
