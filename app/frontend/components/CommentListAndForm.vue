<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

import { provide } from 'vue'

import { useAccount, useComment, useToast } from '../composables'

const { setFlash } = useToast()
const accounter = useAccount()
const { currentUser, flash, authenticate } = accounter
const commenter = useComment(currentUser.value)

await authenticate()
setFlash(flash.value)
// console.log(currentUser.value.token)
// console.log(loggedIn.value);

provide('accounter', accounter)
provide('commenter', commenter)
</script>

<template>
  <div>
    <CommentForm />
    <CommentList />
  </div>
</template>



