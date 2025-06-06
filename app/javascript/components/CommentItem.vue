<script lang="ts" setup >
import sanitizeHtml from 'sanitize-html'
import { computed, inject } from 'vue'
import { useToast } from '../composables/use-toast'
import type { Comment } from '../interfaces/comment'
import type { UseCommentType } from '../composables/use-comment'
import type { UseAccountType } from '../composables/use-account'

const comment = defineModel<Comment>()

const { setFlash } = useToast()

const { loggedIn, currentUser } = inject('accounter') as UseAccountType
const { flash, getComments, deleteComment } = inject('commenter') as UseCommentType

const sanitizedCommentBody = computed(() => {
  return sanitizeHtml(comment.value?.body ?? '').replace(/\n/g, '<br>')
})

const onDeleteClick = async () => {
  if(comment.value) { await deleteComment(comment.value) }
  setFlash(flash.value)
  if(comment.value) { await getComments(comment.value?.frame_id?.toString() ?? '') }
}
</script>

<template>
  <div class="card bg-base-100 shadow shadow-sm rounded-[20px] ml-2 mr-2 mt-2 mb-2">
    <div class="card-body">
      <div class="flex justify-between leading-[35px]">
        <div class="flex items-center">
          <img :src="comment?.user_image_url" alt="" class="rounded" width="20" height="20">
          <div class="badge badge-outline badge-accent rounded-full">
            {{ comment?.user_name }}
          </div>
          <div class="badge badge-outline badge-accent rounded-full">
            {{ comment?.updated_at }}
          </div>
        </div>
        <div v-show="loggedIn && comment?.user_id === currentUser.id" class="flex items-center">
          <button class="btn btn-link btn-sm" @click="onDeleteClick">
            削除
          </button>
        </div>
      </div>
      <div class="flex justify-start">
        <span v-html="sanitizedCommentBody" />
      </div>
    </div>
  </div>
</template>
