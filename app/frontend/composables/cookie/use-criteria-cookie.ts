import { computed } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { useCookie } from '@vesperjs/vue'
import type { Criteria } from '@/types'

export const useCriteriaCookie = function () {
  const { isDate } = useDateUtil()

  const criteria = useCookie<Criteria>('c', { path: '/', watch: true })

  const word = computed<string>(() => {
    return criteria.value?.word ?? ''
  })

  const date = computed<string | null>(() => {
    return isDate(word.value) ? word.value : null
  })

  return { criteria, date }
}
