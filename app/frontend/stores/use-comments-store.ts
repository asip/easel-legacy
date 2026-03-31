import { ref } from '@vue/reactivity'
import { defineStore } from 'pinia'

import type { Comment } from '~/types'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  return { comments }
})
