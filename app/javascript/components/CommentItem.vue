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
  <div class="card">
    <div class="card-block">
      <div class="row d-flex">
        <div class="col-12" style="line-height: 35px;">
          <div class="float-start align-middle" style="padding-left:5px;">
            <img :src="comment?.user_image_url" alt="" class="rounded" width="20" height="20">
          </div>
          <div class="float-start small align-middle" style="padding-left:5px;">
            <div class="badge rounded-pill bg-light text-info">
              {{ comment?.user_name }}
            </div>
          </div>
          <div class="float-start small align-middle" style="padding-left:5px;">
            <div class="badge rounded-pill bg-light text-info">
              {{ comment?.updated_at }}
            </div>
          </div>
          <div v-show="loggedIn && comment?.user_id === currentUser.id" class="float-end">
            <button class="btn btn-link btn-sm" @click="onDeleteClick">
              削除
            </button>&nbsp;
          </div>
        </div>
      </div>
    </div>
    <div class="card-footer" style="background-color: white; border-color: white;">
      <div class="d-flex">
        <div class="col-12 align-middle">
          <div class="float-start">
            <span v-html="sanitizedCommentBody" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
