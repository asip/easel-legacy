<script lang="ts" setup >
import { inject } from 'vue'

import { useToast } from '../composables'
import type { UseAccountType, UseCommentType, UseRouteType } from '../composables'
import { useI18nRegle } from '../composables'
import { useCommentRules } from '../composables'

const route = inject('route') as UseRouteType
const { id } = route.params

const { setFlash } = useToast()

const { loggedIn } = inject('account') as UseAccountType

const { comment, externalErrors, isSuccess, flash, getComments, postComment  } = inject('commenter') as UseCommentType

const { commentRules } = useCommentRules()

const { r$ } = useI18nRegle(comment, commentRules, { externalErrors })

const onPostClick = async () => {
  r$.$touch()
  r$.$reset()
  const { valid } =await r$.$validate()
  if (valid) {
    await postComment(id)
    setFlash(flash.value)
    if (isSuccess()) {
      comment.value.body = ''
      r$.$touch()
      r$.$reset()
      await getComments(id)
    }
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
        <textarea v-model="comment.body" class="block text-sm border border-gray-300 rounded w-full min-h-[50px] field-sizing-content" />
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
