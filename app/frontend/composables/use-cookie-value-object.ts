import { computed, ref, watch, type WritableComputedRef } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useCookieValueObject = function <T extends object>(
  cookie: CookieRef,
  options?: { deep: boolean },
) {
  const deep = options?.deep ?? false

  let value: WritableComputedRef<T | null | undefined, T | string | null | undefined> | undefined

  if (deep) {
    const valueRef = ref<T | null>()

    value = computed<T | null | undefined, T | string | null | undefined>({
      get() {
        valueRef.value = cookie.value ? (JSON.parse(cookie.value) as T) : null
        return valueRef.value
      },
      set(value: T | string | undefined) {
        if (typeof value == 'string') {
          valueRef.value = value ? (JSON.parse(value) as T) : null
          cookie.value = value
        } else {
          valueRef.value = value
          cookie.value = JSON.stringify(value ?? {})
        }
      },
    })

    watch(valueRef, () => {
      if (value) value.value = valueRef.value
    })
  } else {
    value = computed<T | null | undefined, T | string | null | undefined>({
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

  return value
}
