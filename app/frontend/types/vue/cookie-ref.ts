import { WritableComputedRef } from '@vue/reactivity'

export type CookieRef<T = string> = WritableComputedRef<T, T | string>
