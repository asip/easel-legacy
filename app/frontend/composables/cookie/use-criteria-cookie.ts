import { computed } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { useCookieValue } from '@/composables'
import { Criteria, CookieRef } from '@/types'

export const useCriteriaCookie = function (cookie: CookieRef<Criteria>) {
  const { isValidDate } = useDateUtil()
  const { value: criteria } = useCookieValue(cookie, { deep: true })

  const word = computed<string>(() => {
    return criteria.value?.word ?? ''
  })

  const date = computed<string | null>(() => {
    return isValidDate(word.value) ? word.value : null
  })

  return { criteria, date }
}
