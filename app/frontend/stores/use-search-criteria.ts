import { computed } from '@vue/reactivity'

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

    const value = criteria.value.word ?? ''
    return isValidDate(value) ? value : null
  })

  return { criteria, date: date.value /* getCriteria, setCriteria, getDateValue */ }
}
