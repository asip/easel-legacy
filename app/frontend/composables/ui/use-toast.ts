import { customRef, ref } from '@vue/reactivity'

import { useToastify } from './use-toastify'
import type { Flash } from '@vesperjs/vue'

export const useToast = () => {
  const { toast } = useToastify({
    duration: 2000,
    style: { 'border-radius': '5px' },
  })

  const messages = ref<Flash | Record<string, string[]>>()

  const toasts = customRef<Flash | Record<string, string[]> | undefined>(() => {
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
      toast.value = { text: message }
    }
  }

  const setMessages = (flashes: Record<string, string[]>) => {
    Object.keys(flashes).forEach((flashType: string) => {
      flashes[flashType].reverse().forEach((message: string) => {
        toast.value = { text: message }
      })
    })
  }

  return { toasts }
}
