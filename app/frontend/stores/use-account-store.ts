import { ref } from '@vue/reactivity'
import { defineStore } from 'pinia'

import type { Account } from '@/types'

export const useAccountStore = defineStore('account', () => {
  const account = ref<Account>({
    id: null,
  })

  return { account }
})
