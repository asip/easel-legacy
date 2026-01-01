<script lang="ts" setup>
import CommentList from './comment/List.vue'
import CommentForm from './comment/Form.vue'

import { useAccount, useToast } from '../../composables'

import { useLocale } from '../../composables'

/*
const { viewData } = defineProps<{ viewData?: any }>()
globalThis.console.log(JSON.stringify(viewData))
*/

const { autoDetect } = useLocale()
const { setFlash } = useToast()
const { flash, authenticate } = useAccount()

autoDetect()

await authenticate()
setFlash(flash.value)

</script>

<template>
  <Suspense>
    <div class="pb-5">
      <CommentList />
      <CommentForm />
    </div>
    <template #fallback>
      <div>Loading...</div>
    </template>
  </Suspense>
</template>
