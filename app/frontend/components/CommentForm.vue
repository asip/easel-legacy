<script lang="ts" setup >
import { inject } from 'vue'

import { useToast } from '../composables'
import type { UseAccountType, UseCommentType, UseViewDataType } from '../composables'
import { useI18nRegle } from '../utils'
import { useCommentRules } from '../composables'

const { frameId } = inject('viewData') as UseViewDataType
const { setFlash } = useToast()

const { loggedIn } = inject('account') as UseAccountType

const { comment, flash, getComments, postComment } = inject('commenter') as UseCommentType

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules)

const onPostClick = async () => {
  r$.$touch()
  r$.$reset()
  const { valid } =await r$.$validate()
  if (valid) {
    await postComment(frameId)
    setFlash(flash.value)
    comment.value.body = ''
    r$.$touch()
    r$.$reset()
    await getComments(frameId)
  }
}
</script>

<template>
  <div v-if="loggedIn" class="card bg-base-100 shadow rounded-[20px] ml-2 mr-2 mt-2">
    <div class="card-body">
      <div class="flex justify-start">
        <h2 class="card-title">コメント</h2>
      </div>
      <div class="flex justify-center">
        <textarea v-model="comment.body" class="block text-sm border rounded border-gray-300 w-full" />
      </div>
      <div class="flex flex-col">
        <div
          v-for="error of r$.$errors.body"
          :key="error"
        >
          <div class="text-red-500">{{ error }}</div>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="btn btn-outline btn-primary w-full" @click="onPostClick">
          投稿
        </button>
      </div>
    </div>
  </div>
</template>
