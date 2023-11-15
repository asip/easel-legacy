<template>
  <div>
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
              <p style="color: red;">
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
    <br>
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <div v-for="comment in comments" :key="comment.id">
      <div class="card">
        <div class="card-block">
          <div class="row d-flex">
            <div class="col-12" style="line-height: 35px;">
              <div class="float-start align-middle" style="padding-left:5px;">
                <img :src="comment.user_image_url" alt="" class="rounded" width="20" height="20">
              </div>
              <div class="float-start small align-middle" style="padding-left:5px;">
                <div class="badge rounded-pill bg-light text-info">
                  {{ comment.user_name }}
                </div>
              </div>
              <div class="float-start small align-middle" style="padding-left:5px;">
                <div class="badge rounded-pill bg-light text-info">
                  {{ comment.updated_at }}
                </div>
              </div>
              <div v-show="logged_in && comment.user_id === current_user.id" class="float-end">
                <button class="btn btn-link btn-sm" @click="onDeleteClick(comment)">
                  削除
                </button>&nbsp;
              </div>
            </div>
          </div>
        </div>
        <div class="card-footer" style="background-color: white; border-color: white;">
          <div class="d-flex">
            <div class="col-12 align-middle">
              <div class="float-start">
                <span v-html="getSanitizedCommentBody(comment)" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Toastify from 'toastify-js'

import { onMounted } from 'vue'
import sanitizeHtml from 'sanitize-html'

import type { Flash } from '../interfaces/flash'

import { useViewData } from '../composables/use_view_data'
import { useCookieData } from '../composables/use_cookie_data'
import { useAccount } from '../composables/use_account'
import { useComment } from '../composables/use_comment'

const { constants } = useViewData()
const { access_token } = useCookieData()
const { logged_in, current_user, getAccount } = useAccount()
const { comment, comments, flash, error_messages, getComments, setComment, deleteComment } = useComment(current_user)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getSanitizedCommentBody = (row: any): string => {
  return sanitizeHtml(row.body).replace(/\n/g, '<br>')
}

onMounted(async () => {
  current_user.token = access_token
  //console.log(access_token)
  logged_in.value = current_user.token != null
  //console.log(current_user.token);
  //console.log(logged_in.value);
  if (current_user.token != null && current_user.token != '') {
    await getAccount()
  }
  comment.frame_id = constants.frame_id
  //console.log(comment.frame_id);
  await getComments(comment.frame_id)
  //this.$forceUpdate();
})

const onPostClick = async () => {
  await setComment()
  setToast(flash.value)
  await getComments(comment.frame_id)
}

const onDeleteClick = async (comment: any) => {
  await deleteComment(comment)
  setToast(flash.value)
  await getComments(comment.frame_id)
}

const setToast = (flash: Flash) => {
  for(const message of Object.values(flash)){
    if(message != ''){
      Toastify({
        text: message,
        duration: 2000
      }).showToast()
    }
  }
}

</script>




