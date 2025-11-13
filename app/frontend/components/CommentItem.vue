<script lang="ts" setup >
import sanitizeHtml from 'sanitize-html'
import { computed, inject, onMounted, ref } from 'vue'

import type { Comment, RefQuery } from '../interfaces'
import type { UseRouteType } from '../composables'
import { useAccount, useComment, useCommentRules, useI18nRegle, useToast } from '../composables'

// If running in Node.js or SSR, uncomment the following line:
// import { URLSearchParams } from 'url'

const { setFlash } = useToast()

const route = inject('route') as UseRouteType
const { id } = route.params
const { q, page } = route.query

const { loggedIn, currentUser } = useAccount()
const { getComments } = useComment()

const { flash, comment, externalErrors, updateComment, deleteComment, isSuccess, reload401, setComment } = useComment()

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const queryString = ref<string>('')

const edit = ref<boolean>(false)

const commentModel = defineModel<Comment>()

const refItems = computed<RefQuery>( () => {
  const items: RefQuery = { from: 'frame', id: id }
  if (page) items.page = page
  return items
})

const queryMap = computed<Record<string, string>>(() => {
  const map: Record<string, string> = {
    ref: JSON.stringify(refItems.value)
  }
  if (q) map.q = q

  return map
})

onMounted(() => {
  queryString.value = new globalThis.URLSearchParams(queryMap.value).toString()
})

const sanitizedCommentBody = computed<string>(() =>
  sanitizeHtml(commentModel.value?.body ?? '').replace(/\n/g, '<br>')
)

const onEditClick = (): void => {
  edit.value = true
  setComment({ from: commentModel.value })
}

const onCancelClick = (): void => {
  edit.value = false
  setComment({ from: commentModel.value })
}

const onUpdateClick = async (): Promise<void> => {
  r$.$touch()
  r$.$reset()
  const { valid } =await r$.$validate()
  if (valid) {
    await updateComment()
    setFlash(flash.value)
    if (isSuccess()) {
      r$.$touch()
      r$.$reset()
      setComment({ to: commentModel.value })
      edit.value = false
    }
    reload401()
  }
}

const onDeleteClick = async (): Promise<void> => {
  if(commentModel.value) { await deleteComment(commentModel.value) }
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments(id)
  }
  reload401()
}
</script>

<template>
  <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-between leading-[35px]">
        <div class="flex items-center gap-1">
          <a :href="`/users/${commentModel?.user_id}?${queryString}`" class="avatar">
            <img :src="commentModel?.user_image_url" alt="" class="rounded w-5 h-5">
          </a>
          <a :href="`/users/${commentModel?.user_id}?${queryString}`" class="badge badge-outline badge-accent hover:badge-primary rounded-full">
            {{ commentModel?.user_name }}
          </a>
          <div class="badge badge-outline badge-accent rounded-full">
            {{ commentModel?.created_at }}
          </div>
        </div>
        <div v-if="loggedIn && commentModel?.user_id === currentUser.id" class="flex items-center gap-1">
          <button v-if="!edit" class="link link-hover" @click="onEditClick">
            編集
          </button>
          <button v-else class="link link-hover" @click="onCancelClick">
            キャンセル
          </button>
          <button class="link link-hover" @click="onDeleteClick">
            削除
          </button>
        </div>
      </div>
      <div class="flex justify-start">
        <table v-if="!edit" class="table table-bordered table-rounded">
          <tbody>
            <tr>
              <td class="wrap-break-word">
                <span v-html="sanitizedCommentBody" />
              </td>
            </tr>
          </tbody>
        </table>
        <form v-else class="w-full">
          <textarea v-model="comment.body" class="block text-sm border border-gray-300 rounded w-full min-h-[50px] field-sizing-content" />
          <div class="flex flex-col">
            <div
              v-for="error of r$.$errors.body"
              :key="error"
            >
              <div class="text-red-500">{{ error }}</div>
            </div>
          </div>
          <div class="flex justify-center">
            <button type="button" class="btn btn-outline btn-primary w-full" @click="onUpdateClick">
              更新
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
