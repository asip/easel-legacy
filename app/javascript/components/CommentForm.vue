<template>
  <div v-show="logged_in" class="card">
    <div class="card-header">
      <div class="d-flex justify-content-sm-center">
        <div class="clearfix">
          <div class="float-left">
            コメント
          </div>
        </div>
      </div>
    </div>
    <div class="card-block">
      <br>
      <div class="d-flex justify-content-center">
        <div class="form-group col-10">
          <textarea v-model="comment.body" class="form-control col-12" />
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="col-10">
          <div v-for="(message, idx) in error_messages" :key="idx">
            <p class="text-danger">
              {{ message }}
            </p>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center">
        <div class="form-group col-10">
          <button class="btn btn-light col-12 form-control" @click="onPostClick">
            投稿
          </button>
        </div>
      </div>
      <br>
    </div>
  </div>
</template>

<script lang="ts" setup >
import { inject } from 'vue'
import { useToast } from '../composables/use_toast'
import type { UseAccountType } from '../composables/use_account'
import type { UseCommentType } from '../composables/use_comment'

const { setFlash } = useToast()
const { logged_in } = inject('accounter') as UseAccountType
const { comment, flash, error_messages, getComments, setComment } = inject('commenter') as UseCommentType

const onPostClick = async () => {
  await setComment()
  setFlash(flash.value)
  await getComments(comment.value.frame_id?.toString(10) ?? '')
}
</script>