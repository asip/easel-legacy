// import Toastify from 'toastify-js'

import type { Flash } from '@vesperjs/vue'

const Toastify = (await import('toastify-js')).default

export const useToast = function () {
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

  return { setFlash, setMessages }
}
