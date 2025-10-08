<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

import { provide } from 'vue'

import { useAccount, useComments, useToast } from '../composables'

const { setFlash } = useToast()

const account = useAccount()
const { flash, authenticate } = account

const commentList = useComments()

await authenticate()
setFlash(flash.value)
// console.log(currentUser.value.token)
// console.log(loggedIn.value);

provide('account', account)
provide('commentList', commentList)
</script>

<template>
  <div>
    <CommentForm />
    <CommentList />
  </div>
</template>



