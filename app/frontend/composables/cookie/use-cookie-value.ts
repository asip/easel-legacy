import { computed, ref, watch } from '@vue/reactivity'

import { CookieRef } from '@/types'

export const useCookieValue = function <T = string>(
  cookie: CookieRef<T>,
  options?: { deep: boolean },
) {
  const deep = options?.deep ?? false

  let value = ref<T>()

  if (deep) {
    const valueRef = ref<T>()

    value = computed<T | undefined, T | string | undefined>({
      get() {
        valueRef.value = cookie.value ? cookie.value : undefined
        return valueRef.value
      },
      set(value: T | string | undefined) {
        value = value ?? ''

        if (typeof value == 'string') {
          valueRef.value = JSON.parse(value) as T
          cookie.value = value
        } else {
          valueRef.value = value
          cookie.value = value
        }
      },
    })

    watch(valueRef, () => {
      value.value = valueRef.value
    })
  } else {
    value = computed<T | undefined, T | string | undefined>({
      get() {
        return cookie.value ? cookie.value : undefined
      },
      set(value: T | string | undefined) {
        value = value ?? ''

        if (typeof value == 'string') {
          cookie.value = value
        } else {
          cookie.value = value
        }
      },
    })
  }

  return { value }
}
