<script lang="ts" setup >
import { inject } from 'vue'

import { useToast } from '../composables'
import type { UseAccountType, UseCommentType } from '../composables'

const { setFlash } = useToast()

const { loggedIn } = inject('accounter') as UseAccountType

const { comment, flash, errorMessages, getComments, setComment } = inject('commenter') as UseCommentType

const onPostClick = async () => {
  await setComment()
  setFlash(flash.value)
  await getComments(comment.value.frame_id?.toString(10) ?? '')
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
        <div v-for="(message, idx) in errorMessages" :key="idx">
          <p class="text-danger">
            {{ message }}
          </p>
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
