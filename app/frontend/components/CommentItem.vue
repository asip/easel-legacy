<script lang="ts" setup >
import sanitizeHtml from 'sanitize-html'
import { computed, inject, onMounted, ref } from 'vue'

import { useToast } from '../composables'
import type { Comment, RefQuery } from '../interfaces'
import type { UseAccountType, UseCommentType, UseRouteType } from '../composables'

// If running in Node.js or SSR, uncomment the following line:
// import { URLSearchParams } from 'url'

const { setFlash } = useToast()


const route = inject('route') as UseRouteType
const { id } = route.params
const { q, page } = route.query

const { loggedIn, currentUser } = inject('account') as UseAccountType
const { flash, getComments, deleteComment } = inject('commenter') as UseCommentType

const comment = defineModel<Comment>()

const queryString = ref('')

const refItems = computed( () => {
  const items: RefQuery = { from: 'frame', id: id }
  if (page) items.page = page
  return items
})

const queryMap = computed(() => {
  const map: Record<string, string> = {
    ref: JSON.stringify(refItems.value)
  }
  if (q) map.q = q

  return map
})

onMounted(() => {
  queryString.value = new globalThis.URLSearchParams(queryMap.value).toString()
})

const sanitizedCommentBody = computed(() =>
  sanitizeHtml(comment.value?.body ?? '').replace(/\n/g, '<br>')
)

const onDeleteClick = async () => {
  if(comment.value) { await deleteComment(comment.value) }
  setFlash(flash.value)
  await getComments(id)
}
</script>

<template>
  <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-between leading-[35px]">
        <div class="flex items-center gap-1">
          <a :href="`/users/${comment?.user_id}?${queryString}`" class="avatar">
            <img :src="comment?.user_image_url" alt="" class="rounded" style="width:20px;height:20px;">
          </a>
          <a :href="`/users/${comment?.user_id}?${queryString}`" class="badge badge-outline badge-accent hover:badge-primary rounded-full">
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
        <table class="table table-bordered table-rounded">
          <tbody>
            <tr>
              <td style="word-break: break-all;">
                <span v-html="sanitizedCommentBody" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
