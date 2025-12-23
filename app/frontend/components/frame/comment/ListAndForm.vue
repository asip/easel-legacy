<script lang="ts" setup>
import CommentForm from './Form.vue'
import CommentList from './List.vue'

import { useAccount, useToast } from '../../../composables'

const { setFlash } = useToast()

const { flash, authenticate } = useAccount()

await authenticate()
setFlash(flash.value)
</script>

<template>
  <div class="pb-5">
    <CommentList />
    <CommentForm />
  </div>
</template>
