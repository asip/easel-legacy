// import Toastify from 'toastify-js'

import type { Flash } from '../types'

const Toastify = (await import('toastify-js')).default

export function useToast() {
  const setFlash = (flash: Flash) => {
    for(const message of Object.values(flash)){
      if(message != ''){
        Toastify({
          text: message,
          duration: 2000,
          style: { 'border-radius': '5px' }
        }).showToast()
      }
    }
  }

  return { setFlash }
}