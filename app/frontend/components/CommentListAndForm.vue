<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

import { provide } from 'vue'

import { useAccount, useComment, useToast } from '../composables'

const { setFlash } = useToast()
const account = useAccount()
const { currentUser, flash, authenticate } = account
const commenter = useComment(currentUser.value)

await authenticate()
setFlash(flash.value)
// console.log(currentUser.value.token)
// console.log(loggedIn.value);

provide('account', account)
provide('commenter', commenter)
</script>

<template>
  <div>
    <CommentForm />
    <CommentList />
  </div>
</template>



