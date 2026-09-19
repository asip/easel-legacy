import { computed } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { useCookieValueObject } from '@/composables'
import type { Criteria, CookieRef } from '@/types'

export const useCriteriaCookie = function (cookie: CookieRef) {
  const { isValidDate } = useDateUtil()
  const criteria = useCookieValueObject<Criteria>(cookie, { deep: true })

  const word = computed<string>(() => {
    return criteria.value?.word ?? ''
  })

  const date = computed<string | null>(() => {
    return isValidDate(word.value) ? word.value : null
  })

  return { criteria, date }
}
