<script lang="ts" setup >
import { inject } from 'vue'
import { useToast } from '../composables/use-toast'
import type { UseAccountType } from '../composables/use-account'
import type { UseCommentType } from '../composables/use-comment'

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
  <div v-show="loggedIn" class="card bg-base-100 shadow shadow-sm kadomaru-10 ml-2 mr-2 mt-2 mb-2">
    <div class="card-body">
      <div class="d-flex">
        <div class="float-left">
          コメント
        </div>
      </div>
      <div class="flex justify-center">
        <div class="">
          <textarea v-model="comment.body" class="block text-sm border rounded border-gray-300 w-full" />
        </div>
      </div>
      <div class="flex justify-center">
        <div class="">
          <div v-for="(message, idx) in errorMessages" :key="idx">
            <p class="text-danger">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
      <div class="flex justify-center">
        <div class="">
          <button class="btn btn-outline btn-primary" @click="onPostClick">
            投稿
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
