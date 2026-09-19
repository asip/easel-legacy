import { computed } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { useCookie, useCookieValueObject } from '@/composables'
import type { Criteria } from '@/types'

export const useCriteriaCookie = function () {
  const { isValidDate } = useDateUtil()

  const criteriaCookie = useCookie('q', { path: '/' })
  const criteria = useCookieValueObject<Criteria>(criteriaCookie, { deep: true })

  const word = computed<string>(() => {
    return criteria.value?.word ?? ''
  })

  const date = computed<string | null>(() => {
    return isValidDate(word.value) ? word.value : null
  })

  return { criteria, date }
}
