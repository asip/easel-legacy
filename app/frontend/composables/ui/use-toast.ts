// import Toastify from 'toastify-js'
import { computed, ref } from '@vue/reactivity'

import type { Flash } from '@vesperjs/vue'

const Toastify = (await import('toastify-js')).default

export const useToast = function () {
  const messages = ref<Flash | Record<string, string[]>>()

  const toast = computed<Flash | Record<string, string[]> | undefined>({
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
  })

  const setFlash = (flash: Flash): void => {
    for (const message of Object.values(flash) as string[]) {
      if (message !== '') {
        Toastify({
          text: message,
          duration: 2000,
          style: { 'border-radius': '5px' },
        }).showToast()
      }
    }
  }

  const setMessages = (flashes: Record<string, string[]>) => {
    Object.keys(flashes).forEach((flashType: string) => {
      flashes[flashType].reverse().forEach((message: string) => {
        Toastify({
          text: message,
          duration: 2000,
          style: { 'border-radius': '5px' },
        }).showToast()
      })
    })
  }

  return { toast }
}
