import { computed, ref, watch } from '@vue/reactivity'

import { RefItems } from '@/types'
import { CookieAccessor } from '@/composables/use-cookie-store'

export const useRefCookie = function (cookie: CookieAccessor<RefItems>) {
  const refItemsRef = ref<RefItems>()

  const refItems = computed<RefItems, RefItems | string | undefined>({
    get() {
      refItemsRef.value = cookie.get()
      return refItemsRef.value
    },
    set(value: RefItems | string | undefined) {
      if (typeof value == 'string') {
        refItemsRef.value = JSON.parse(value) as RefItems
        cookie.set(value)
      } else {
        refItemsRef.value = value
        cookie.set(value ?? {})
      }
    },
  })

  watch(refItemsRef, () => {
    refItems.value = refItemsRef.value
  })

  return { refItems }
}
