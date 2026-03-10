import { persistentAtom } from '@nanostores/persistent'

export const $criteria = persistentAtom<string>('q', '{}')
