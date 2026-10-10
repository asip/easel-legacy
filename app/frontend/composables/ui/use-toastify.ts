// import Toastify from 'toastify-js'
import { customRef, ref } from '@vue/reactivity'

import type { Flash } from '@vesperjs/vue'

import type StartToastifyInstance from 'toastify-js'
const Toastify = (await import('toastify-js')).default

export const useToastify = function (options?: StartToastifyInstance.Options) {
  const messages = ref<Flash | Record<string, string[]>>()

  const toast = customRef<Flash | Record<string, string[]> | undefined>(() => {
    return {
      get() {
        return messages.value
      },
      set(value: Flash | Record<string, string[]>) {
        messages.value = value
        if (Object.keys(value).length === 0) return

        if ('notice' in value || 'alert' in value) {
          setFlash(value)
        } else {
          setMessages(value as Record<string, string[]>)
        }
      },
    }
  })

  const setFlash = (flash: Flash): void => {
    for (const message of Object.values(flash) as string[]) {
      if (message !== '') {
        Toastify({ ...options, text: message }).showToast()
      }
    }
  }

  const setMessages = (flashes: Record<string, string[]>) => {
    Object.keys(flashes).forEach((flashType: string) => {
      flashes[flashType].reverse().forEach((message: string) => {
        Toastify({ text: message, ...options }).showToast()
      })
    })
  }

  return { toast }
}
