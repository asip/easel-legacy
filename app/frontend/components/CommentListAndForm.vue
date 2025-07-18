<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'
import { inject, provide } from 'vue'

import type { UseViewDataType } from '../composables/use-view-data'
import { useToast } from '../composables/use-toast'
import { useAccount } from '../composables/use-account'
import { useComment } from '../composables/use-comment'

const { setFlash } = useToast()
const accounter = useAccount()
const { loggedIn, currentUser, flash, getAccount } = accounter
const commenter = useComment(currentUser.value)
const { comment } = commenter

const viewData = inject('viewData') as UseViewDataType
// @ts-ignore
await getAccount()
setFlash(flash.value)
loggedIn.value = currentUser.value.token != null
// console.log(currentUser.value.token)
// console.log(loggedIn.value);
comment.value.frame_id = parseInt(viewData.frameId, 10) || null

provide('accounter', accounter)
provide('commenter', commenter)

</script>

<template>
  <div>
    <CommentForm />
    <CommentList />
  </div>
</template>



