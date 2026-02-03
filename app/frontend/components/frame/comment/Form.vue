<script lang="ts" setup vapor>
import { useAccount, useComment, useComments, useCommentRules, useI18nRegle, useRoute, useToast } from '../../../composables'

const route = useRoute()
const id: string = route.params?.id ?? ''

const { setFlash } = useToast()

// console.log('loggedIn:', loggedIn.value)

const { loggedIn } = useAccount()
const { comment, externalErrors, isSuccess, flash, createComment, set404Alert, reload } = useComment()
const { getComments } = useComments()

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const onPostClick = async (): Promise<void> => {
  r$.$touch()
  r$.$reset()
  const { valid } =await r$.$validate()
  if (valid) {
    await createComment(id)
    set404Alert()
    setFlash(flash.value)
    if (isSuccess()) {
      comment.value.body = ''
      r$.$touch()
      r$.$reset()
      await getComments(id)
    } else {
      reload()
    }
  }
}
</script>

<template>
  <div v-if="loggedIn" class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-start">
        <div class="card-title text-[16px] font-bold">コメント</div>
      </div>
      <form>
        <div class="flex justify-center wrap-break-word">
          <textarea v-model="comment.body" class="block text-sm border border-gray-300 rounded w-full min-h-12.5 field-sizing-content" />
        </div>
        <div class="flex flex-col">
          <div
            v-for="error of r$.$errors.body"
            :key="error"
          >
            <div class="text-red-500 text-xs">{{ error }}</div>
          </div>
        </div>
        <div class="flex justify-center">
          <button type="button" class="btn btn-outline btn-primary w-full" @click="onPostClick">
            投稿
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
