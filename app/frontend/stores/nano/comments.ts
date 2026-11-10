import { atom } from 'nanostores'

import type { Comment } from '@/types'

export const $comments = atom<Comment[]>([])
