<script lang="ts" setup >
import sanitizeHtml from 'sanitize-html'
import { computed, inject, onMounted, ref } from 'vue'

import { useToast } from '../composables'
import type { Comment, RefQuery } from '../interfaces'
import type { UseAccountType, UseCommentType, ViewDataType } from '../composables'

// If running in Node.js or SSR, uncomment the following line:
// import { URLSearchParams } from 'url'

const { setFlash } = useToast()

const { frameId, q, page } = inject('viewData') as ViewDataType
const { loggedIn, currentUser } = inject('account') as UseAccountType
const { flash, getComments, deleteComment } = inject('commenter') as UseCommentType

const comment = defineModel<Comment>()

const querys = ref('')

onMounted(() => {
  const refItems: RefQuery = { from: 'frame', id: frameId.value }
  if(q.value) refItems.q = q.value
  if(page.value) refItems.page = page.value

  const params: Record<string, string> = {
    ref: JSON.stringify(refItems)
  }

  querys.value = new globalThis.URLSearchParams(params).toString()
})

const sanitizedCommentBody = computed(() =>
  sanitizeHtml(comment.value?.body ?? '').replace(/\n/g, '<br>')
)

const onDeleteClick = async () => {
  if(comment.value) { await deleteComment(comment.value) }
  setFlash(flash.value)
  await getComments(frameId.value)
}
</script>

<template>
  <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-between leading-[35px]">
        <div class="flex items-center gap-1">
          <a :href="`/users/${comment?.user_id}?${querys}`" class="avatar">
            <img :src="comment?.user_image_url" alt="" class="rounded" style="width:20px;height:20px;">
          </a>
          <a :href="`/users/${comment?.user_id}?${querys}`" class="badge badge-outline badge-accent hover:badge-primary rounded-full">
            {{ comment?.user_name }}
          </a>
          <div class="badge badge-outline badge-accent rounded-full">
            {{ comment?.created_at }}
          </div>
        </div>
        <div v-if="loggedIn && comment?.user_id === currentUser.id" class="flex items-center">
          <button class="link link-hover" @click="onDeleteClick">
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
