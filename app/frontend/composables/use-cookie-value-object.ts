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
    const coieValueRef = ref<T | null>()

    cookieValue = computed<T | null | undefined, T | string | null | undefined>({
      get() {
        coieValueRef.value = cookie.value ? (JSON.parse(cookie.value) as T) : null
        return coieValueRef.value
      },
      set(value: T | string | null | undefined) {
        if (typeof value == 'string') {
          coieValueRef.value = value ? (JSON.parse(value) as T) : null
          cookie.value = value
        } else {
          coieValueRef.value = value
          cookie.value = JSON.stringify(value ?? {})
        }
      },
    })

    watch(coieValueRef, () => {
      if (cookieValue) cookieValue.value = coieValueRef.value
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
