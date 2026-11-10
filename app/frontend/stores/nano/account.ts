import { map } from 'nanostores'

import type { Account } from '@/types'

export const $account = map<Account>({ id: null })
