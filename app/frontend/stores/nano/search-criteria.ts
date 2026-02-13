import { persistentAtom } from '@nanostores/persistent'

export const searchCriteria = persistentAtom<string>('q', '{}')
