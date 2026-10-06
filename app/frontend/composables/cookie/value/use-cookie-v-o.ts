import { computed, ref, watch, type WritableComputedRef } from '@vue/reactivity'

import type { CookieRef } from '@vesperjs/vue'

export const useCookieVO = function <T extends object>(
  cookie: CookieRef,
  options?: { watch: boolean },
) {
  const watchOption = options?.watch ?? false

  let cookieValue:
    | WritableComputedRef<T | null | undefined, T | string | null | undefined>
    | undefined

  if (watchOption) {
    const cookieValueRef = ref<T | null>()

    cookieValue = computed<T | null | undefined, T | string | null | undefined>({
      get() {
        cookieValueRef.value = cookie.value ? (JSON.parse(cookie.value) as T) : null
        return cookieValueRef.value
      },
      set(value: T | string | null | undefined) {
        if (typeof value == 'string') {
          cookieValueRef.value = value ? (JSON.parse(value) as T) : null
          cookie.value = value
        } else {
          cookieValueRef.value = value
          cookie.value = value ? JSON.stringify(value) : null
        }
      },
    })

    watch(cookieValueRef, () => {
      if (cookieValue) cookieValue.value = cookieValueRef.value
    })
  } else {
    cookieValue = computed<T | null | undefined, T | string | null | undefined>({
      get() {
        return cookie.value ? (JSON.parse(cookie.value) as T) : null
      },
      set(value: T | string | null | undefined) {
        if (typeof value == 'string') {
          cookie.value = value
        } else {
          cookie.value = value ? JSON.stringify(value) : null
        }
      },
    })
  }

  return cookieValue
}
