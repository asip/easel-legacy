import { computed, ref, watch } from '@vue/reactivity'

import { RefItems, CookieRef } from '@/types'

export const useRefCookie = function (cookie: CookieRef<RefItems>) {
  const refItemsRef = ref<RefItems>()

  const refItems = computed<RefItems, RefItems | string | undefined>({
    get() {
      refItemsRef.value = cookie.value
      return refItemsRef.value
    },
    set(value: RefItems | string | undefined) {
      if (typeof value == 'string') {
        refItemsRef.value = JSON.parse(value) as RefItems
        cookie.value = value
      } else {
        refItemsRef.value = value
        cookie.value = value ?? {}
      }
    },
  })

  watch(refItemsRef, () => {
    refItems.value = refItemsRef.value
  })

  return { refItems }
}
