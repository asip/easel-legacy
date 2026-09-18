import { computed, ref, watch } from '@vue/reactivity'
import { useDateUtil } from '@vesperjs/vue'

import { Criteria } from '@/types'
import { CookieAccessor } from '@/composables/use-cookie-store'

export const useCriteriaCookie = function (cookie: CookieAccessor<Criteria>) {
  const { isValidDate } = useDateUtil()

  const criteriaRef = ref<Criteria>()

  const criteria = computed<Criteria | undefined, Criteria | string | undefined>({
    get() {
      criteriaRef.value = cookie.get()
      return criteriaRef.value
    },
    set(value: Criteria | string | undefined) {
      if (typeof value == 'string') {
        criteriaRef.value = JSON.parse(value) as Criteria
        cookie.set(value)
      } else {
        criteriaRef.value = value
        cookie.set(value ?? {})
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
