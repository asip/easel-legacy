import { computed, ref, watch } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { Criteria, CookieRef } from '@/types'

export const useCriteriaCookie = function (cookie: CookieRef<Criteria>) {
  const { isValidDate } = useDateUtil()

  const criteriaRef = ref<Criteria>()

  const criteria = computed<Criteria | undefined, Criteria | string | undefined>({
    get() {
      criteriaRef.value = cookie.value
      return criteriaRef.value
    },
    set(value: Criteria | string | undefined) {
      if (typeof value == 'string') {
        criteriaRef.value = JSON.parse(value) as Criteria
        cookie.value = value
      } else {
        criteriaRef.value = value
        cookie.value = value ?? {}
      }
    },
  })

  watch(criteriaRef, () => {
    criteria.value = criteriaRef.value
  })

  const word = computed<string>(() => {
    return criteria.value?.word ?? ''
  })

  const date = computed<string | null>(() => {
    return isValidDate(word.value) ? word.value : null
  })

  return { criteria, date }
}
