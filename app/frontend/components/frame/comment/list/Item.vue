<script lang="ts" setup vapor>
import sanitizeHtml from 'sanitize-html'
import { computed, onMounted, ref } from 'vue'

import type { Comment, RefItems } from '../../../../interfaces'
import {
  useAccount,
  useComment,
  useComments,
  useCommentRules,
  useI18nRegle,
  useRoute,
  useToast,
} from '../../../../composables'

// If running in Node.js or SSR, uncomment the following line:
// import { URLSearchParams } from 'url'

const { setFlash } = useToast()

const route = useRoute()
const id: string = route.params?.id ?? ''
const refStr: string = route.query?.ref ?? ''

const { loggedIn, currentUser } = useAccount()
const {
  flash,
  comment,
  externalErrors,
  backendErrorInfo,
  updateComment,
  deleteComment,
  isSuccess,
  set404Alert,
  reload,
  setComment,
} = useComment()
const { getComments } = useComments()

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const queryString = ref<string>('')

const edit = ref<boolean>(false)

const commentModel = defineModel<Comment>()

const refItems = computed<RefItems>(() => {
  const items: RefItems = refStr ? JSON.parse(refStr) : {}
  items.from = 'frame'

  return items
})

const queryMap = computed<Record<string, string>>(() => {
  const map: Record<string, string> = {
    ref: JSON.stringify(refItems.value),
  }

  return map
})

onMounted(() => {
  queryString.value = new globalThis.URLSearchParams(queryMap.value).toString()
})

const sanitizedCommentBody = computed<string>(() =>
  sanitizeHtml(commentModel.value?.body ?? '').replace(/\n/g, '<br>'),
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
  const { valid } = await r$.$validate()
  if (valid) {
    await updateComment()
    set404Alert()
    setFlash(flash.value)
    if (isSuccess()) {
      r$.$touch()
      r$.$reset()
      setComment({ to: commentModel.value })
      edit.value = false
    } else {
      await reload401404()
    }
  }
}

const onDeleteClick = async (): Promise<void> => {
  if (commentModel.value) {
    await deleteComment(commentModel.value)
  }
  set404Alert()
  setFlash(flash.value)
  if (isSuccess()) {
    await getComments(id)
  } else {
    await reload401404()
  }
}

const reload401404 = async (): Promise<void> => {
  if (
    backendErrorInfo.value.status == 401 ||
    (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Frame')
  ) {
    reload()
  } else if (backendErrorInfo.value.status == 404 && backendErrorInfo.value.source == 'Comment') {
    await getComments(id)
  }
}
</script>

<template>
  <div class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-between leading-8.75">
        <div class="flex items-center gap-1">
          <a :href="`/users/${commentModel?.user_id}?${queryString}`" class="avatar">
            <img :src="commentModel?.user_image_url" alt="" class="rounded w-5 h-5" />
          </a>
          <a
            :href="`/users/${commentModel?.user_id}?${queryString}`"
            class="badge badge-outline badge-accent hover:badge-primary rounded-full"
          >
            {{ commentModel?.user_name }}
          </a>
          <div class="badge badge-outline badge-accent rounded-full">
            {{ commentModel?.created_at }}
          </div>
        </div>
        <div
          v-if="loggedIn && commentModel?.user_id === currentUser.id"
          class="flex items-center gap-1"
        >
          <button v-if="!edit" class="link link-hover" @click="onEditClick">編集</button>
          <button v-else class="link link-hover" @click="onCancelClick">キャンセル</button>
          <button class="link link-hover" @click="onDeleteClick">削除</button>
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
          <textarea
            v-model="comment.body"
            class="block text-sm border border-gray-300 rounded w-full min-h-12.5 field-sizing-content"
          />
          <div class="flex flex-col">
            <div v-for="error of r$.$errors.body" :key="error">
              <div class="text-red-500 text-xs">{{ error }}</div>
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
