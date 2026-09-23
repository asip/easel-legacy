import { computed, ref, watch, type WritableComputedRef } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useCookieValueObject = function <T extends object>(
  cookie: CookieRef,
  options?: { deep: boolean },
) {
  const deep = options?.deep ?? false

  let cookieValue:
    | WritableComputedRef<T | null | undefined, T | string | null | undefined>
    | undefined

  if (deep) {
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
          cookie.value = JSON.stringify(value ?? {})
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
          cookie.value = JSON.stringify(value ?? {})
        }
      },
    })
  }

  return cookieValue
}
