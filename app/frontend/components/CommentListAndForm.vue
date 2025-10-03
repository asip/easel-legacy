<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

import { provide, inject } from 'vue'

import type { ViewDataType } from '../composables'
import { useAccount, useComments, useToast } from '../composables'

const { setFlash } = useToast()

const viewData = inject('viewData') as ViewDataType

const account = useAccount(viewData)
const { flash, authenticate } = account

const commentList = useComments(viewData)

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



