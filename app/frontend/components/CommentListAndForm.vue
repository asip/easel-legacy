<script lang="ts" setup>
import CommentForm from './CommentForm.vue'
import CommentList from './CommentList.vue'

import { useAccount, useToast } from '../composables'

const { setFlash } = useToast()

const { flash, authenticate } = useAccount()

await authenticate()
setFlash(flash.value)
</script>

<template>
  <div>
    <CommentForm />
    <CommentList />
  </div>
</template>



