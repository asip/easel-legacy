import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Comment } from '~/interfaces'

export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  return { comments }
})
