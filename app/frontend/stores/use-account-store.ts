import { Ref, ref } from 'vue'
import { defineStore } from 'pinia'

import type { User } from '../interfaces'

export const useAccountStore = defineStore(
  'account',
  () => {
    const loggedIn: Ref<boolean> = ref<boolean>(false)
    const currentUser = ref<User>({
      id: null,
      token: null
    })

    return { loggedIn, currentUser }
  }
)