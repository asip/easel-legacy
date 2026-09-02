import { computed, ref } from '@vue/reactivity'
import { useCookies } from '@vueuse/integrations/useCookies'

import { useDate as useDateUtil } from '@vesperjs/vue'

import { Criteria, RefItems } from '@/types'
import { watch } from 'vue'

export const useCookieStore = function () {
  const { isValidDate } = useDateUtil()

  const cookies = useCookies(['access_token', 'q', 'ref', 'page', 'time_zone'])

  const accessToken = computed<string>(() => cookies.get<string>('access_token'))

  const criteriaRef = ref<Criteria>()

  const criteria = computed<Criteria | undefined, Criteria | string | undefined>({
    get() {
      criteriaRef.value = cookies.get<Criteria>('q')
      return criteriaRef.value
    },
    set(value: Criteria | string | undefined) {
      if (typeof value == 'string') {
        criteriaRef.value = JSON.parse(value) as Criteria
        cookies.set('q', value, { path: '/' })
      } else {
        criteriaRef.value = value
        cookies.set('q', JSON.stringify(value), { path: '/' })
      }
    },
  })

  watch(criteriaRef, () => {
    criteria.value = criteriaRef.value
  })

  const date = computed<string | null>(() => {
    const value = criteria.value?.word ?? ''
    return isValidDate(value) ? value : null
  })

  const refItemsRef = ref<RefItems>()

  const refItems = computed<RefItems, RefItems | string | undefined>({
    get() {
      refItemsRef.value = cookies.get<RefItems>('ref')
      return refItemsRef.value
    },
    set(value: RefItems | string | undefined) {
      if (typeof value == 'string') {
        refItemsRef.value = JSON.parse(value) as RefItems
        cookies.set('ref', value, { path: '/' })
      } else {
        refItemsRef.value = value
        cookies.set('ref', value ? value : '{}', { path: '/' })
      }
    },
  })

  watch(refItemsRef, () => {
    refItems.value = refItemsRef.value
  })

  const page = computed<string, string>({
    get() {
      return cookies.get<string>('page')
    },
    set(value: string | undefined) {
      cookies.set('page', value ?? '', { path: '/' })
    },
  })

  const timeZone = computed<string, string>({
    get() {
      return cookies.get<string>('time_zone')
    },
    set(value: string | undefined) {
      cookies.set('time_zone', value ?? '', { path: '/' })
    },
  })

  return { accessToken, criteria, date: date.value, refItems, page, timeZone }
}
