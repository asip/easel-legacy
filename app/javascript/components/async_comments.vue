<template>
  <div>
    <CommentForm />
    <br>
    <!-- eslint-disable-next-line vue/no-template-shadow -->
    <CommentList />
  </div>
</template>

<script lang="ts" setup>
import CommentForm from './comment_form.vue'
import CommentList from './comment_list.vue'
import { provide } from 'vue'

import { useViewData } from '../composables/use_view_data'
import { useToast } from '../composables/use_toast'
import { useAccount } from '../composables/use_account'
import { useComment } from '../composables/use_comment'

const view_data = useViewData()
const { setFlash } = useToast()
const accounter = useAccount()
const { logged_in, current_user, flash, getAccount } = accounter
const commenter = useComment(current_user.value)
const { comment } = commenter

// @ts-ignore
await getAccount()
setFlash(flash.value)
logged_in.value = current_user.value.token != null
// console.log(current_user.token);
// console.log(logged_in.value);
comment.value.frame_id = view_data.frame_id

provide('accounter', accounter)
provide('commenter', commenter)

</script>




