/*
import { ref } from '@vue/reactivity'
import { defineStore } from 'pinia'
*/

import { customRef } from '@vue/reactivity'

import type { Account } from '@/types'

import { $account } from './nano'

/* export const useAccountStore = defineStore('account', () => {
  const account = ref<Account>({
    id: null,
  })

  return { account }
})
*/

export const useAccountStore = () => {
  const account = customRef<Account>((track, trigger) => {
    return {
      get() {
        track()
        return $account.get()
      },
      set(value: Account) {
        $account.set(value)
        trigger()
      },
    }
  })

  return { account }
}
