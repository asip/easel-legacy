import { computed, ref, watch, type WritableComputedRef } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useCookieValue = function (cookie: CookieRef, options?: { deep: boolean }) {
  const deep = options?.deep ?? false

  let value: WritableComputedRef<string | null | undefined, string | null | undefined> | undefined

  if (deep) {
    const valueRef = ref<string | null>()

    value = computed<string | null | undefined, string | null | undefined>({
      get() {
        valueRef.value = cookie.value ? cookie.value : null
        return valueRef.value
      },
      set(value: string | null | undefined) {
        valueRef.value = value ?? ''
        cookie.value = valueRef.value
      },
    })

    watch(valueRef, () => {
      if (value) value.value = valueRef.value
    })
  } else {
    value = computed<string | null | undefined, string | null | undefined>({
      get() {
        return cookie.value ? cookie.value : null
      },
      set(value: string | null | undefined) {
        cookie.value = value ?? ''
      },
    })
  }

  return value
}
