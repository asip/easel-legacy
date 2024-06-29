<template>
  <div>
    <CommentForm />
    <br>
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <CommentList />
  </div>
</template>

<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'
import { inject, provide } from 'vue'

import type { UseViewDataType } from '../composables/use_view_data'
import { useToast } from '../composables/use_toast'
import { useAccount } from '../composables/use_account'
import { useComment } from '../composables/use_comment'

const { setFlash } = useToast()
const accounter = useAccount()
const { logged_in, current_user, flash, getAccount } = accounter
const commenter = useComment(current_user.value)
const { comment } = commenter

const view_data = inject('viewData') as UseViewDataType
// @ts-ignore
await getAccount()
setFlash(flash.value)
logged_in.value = current_user.value.token != null
// console.log(current_user.token);
// console.log(logged_in.value);
comment.value.frame_id = parseInt(view_data.frame_id, 10) || null

provide('accounter', accounter)
provide('commenter', commenter)

</script>




