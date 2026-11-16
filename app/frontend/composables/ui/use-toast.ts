import { customRef, ref } from '@vue/reactivity'

import { useToastify } from './toastify'

import type { Flash } from '@vesperjs/vue'

export const useToast = () => {
  const { toast } = useToastify({
    duration: 2000,
    style: { 'border-radius': '5px' },
  })

  const errors = ref<Flash | Record<string, string[]>>()

  const toasts = customRef<Flash | Record<string, string[]> | undefined>(() => {
    return {
      get() {
        return errors.value
      },
      set(value: Flash | Record<string, string[]>) {
        errors.value = value
        if (Object.keys(value).length === 0) return

        if ('notice' in value || 'alert' in value) {
          setFlash(value)
        } else {
          setErrors(value as Record<string, string[]>)
        }
      },
    }
  })

  const setFlash = (flash: Flash): void => {
    for (const message of Object.values(flash) as string[]) {
      toast.value = { text: message }
    }
  }

  const setErrors = (errors: Record<string, string[]>) => {
    Object.keys(errors).forEach((name: string) => {
      errors[name].reverse().forEach((message: string) => {
        toast.value = { text: message }
      })
    })
  }

  return { toasts }
}
