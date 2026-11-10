/*
import { ref } from '@vue/reactivity'
import { defineStore } from 'pinia'
*/

import { customRef } from '@vue/reactivity'

import type { Comment } from '@/types'

import { $comments } from './nano'

/*
export const useCommentsStore = defineStore('comments', () => {
  const comments = ref<Comment[]>([])

  return { comments }
})
*/

export const useCommentsStore = () => {
  const comments = customRef<Comment[]>((track, trigger) => {
    return {
      get() {
        track()
        return $comments.get()
      },
      set(value: Comment[]) {
        $comments.set(value)
        trigger()
      },
    }
  })

  return { comments }
}
