import { WritableComputedRef } from '@vue/reactivity'

export type CookieRef = WritableComputedRef<string, string | null | undefined>
