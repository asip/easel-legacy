import { computed, ref, watch, type WritableComputedRef } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useCookieValue = function (cookie: CookieRef, options?: { deep: boolean }) {
  const deep = options?.deep ?? false

  let cookieValue:
    | WritableComputedRef<string | null | undefined, string | null | undefined>
    | undefined

  if (deep) {
    const cookieValueRef = ref<string | null>()

    cookieValue = computed<string | null | undefined, string | null | undefined>({
      get() {
        cookieValueRef.value = cookie.value ? cookie.value : null
        return cookieValueRef.value
      },
      set(value: string | null | undefined) {
        cookieValueRef.value = value ?? ''
        cookie.value = cookieValueRef.value
      },
    })

    watch(cookieValueRef, () => {
      if (cookieValue) cookieValue.value = cookieValueRef.value
    })
  } else {
    cookieValue = computed<string | null | undefined, string | null | undefined>({
      get() {
        return cookie.value ? cookie.value : null
      },
      set(value: string | null | undefined) {
        cookie.value = value ?? ''
      },
    })
  }

  return cookieValue
}
