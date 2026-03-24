import { Ref, ref } from '@vue/reactivity'
import { defineStore } from 'pinia'

import type { User } from '~/interfaces'

export const useAccountStore = defineStore('account', () => {
  const loggedIn = ref(false)
  const account = ref<User>({
    id: null,
  })

  const clearAccount = () => {
    account.value.id = null
    loggedIn.value = false
  }

  return { loggedIn, account, clearAccount }
})
