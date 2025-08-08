import Toastify from 'toastify-js'

import type { Flash } from '../types'

export function useToast() {
  const setFlash = (flash: Flash) => {
    for(const message of Object.values(flash)){
      if(message != ''){
        Toastify({
          text: message,
          duration: 2000
        }).showToast()
      }
    }
  }

  return { setFlash }
}