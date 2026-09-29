import { computed, ref } from '@vue/reactivity'

import { CookieRef } from '@/types'

interface CookieOptions {
  domain?: string | null
  expires?: DOMHighResTimeStamp | null
  partitioned?: boolean
  path?: string
  sameSite?: CookieSameSite
}

export const useCookie = function (name: string, options?: CookieOptions): CookieRef {
  const cookie: CookieRef = computed<string | null | undefined>({
    get() {
      const itemRef = ref<CookieListItem | null>()
      try {
        void (async () => {
          itemRef.value = await globalThis.cookieStore.get(name)
        })()
      } catch {
        itemRef.value = undefined
      }
      return itemRef.value?.value
    },
    set(value: string | null | undefined) {
      if (value) {
        try {
          void (async () => {
            await globalThis.cookieStore.set({ name, value, ...options })
          })()
        } catch {
          /* empty */
        }
      } else {
        try {
          void (async () => {
            await globalThis.cookieStore.delete(name)
          })()
        } catch {
          /* empty */
        }
      }
    },
  })

  return cookie
}
